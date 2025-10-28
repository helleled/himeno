/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

process.env.NODE_ENV = 'test';

import * as assert from 'assert';
import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { Test } from '@nestjs/testing';
import { jest } from '@jest/globals';

import { MockResolver } from '../misc/mock-resolver.js';
import type { IActor, IApDocument, ICollection, IObject, IPost } from '@/core/activitypub/type.js';
import type { MiRemoteUser } from '@/models/User.js';
import { ApImageService } from '@/core/activitypub/models/ApImageService.js';
import { ApNoteService } from '@/core/activitypub/models/ApNoteService.js';
import { ApPersonService } from '@/core/activitypub/models/ApPersonService.js';
import { ApRendererService } from '@/core/activitypub/ApRendererService.js';
import { JsonLdService } from '@/core/activitypub/JsonLdService.js';
import { CONTEXT } from '@/core/activitypub/misc/contexts.js';
import { GlobalModule } from '@/GlobalModule.js';
import { CoreModule } from '@/core/CoreModule.js';
import { FederatedInstanceService } from '@/core/FederatedInstanceService.js';
import { LoggerService } from '@/core/LoggerService.js';
import { MiMeta, MiNote, UserProfilesRepository } from '@/models/_.js';
import { DI } from '@/di-symbols.js';
import { secureRndstr } from '@/misc/secure-rndstr.js';
import { DownloadService } from '@/core/DownloadService.js';
import { genAidx } from '@/misc/id/aidx.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const host = 'https://host1.test';

type NonTransientIActor = IActor & { id: string };
type NonTransientIPost = IPost & { id: string };

function createRandomActor({ actorHost = host } = {}): NonTransientIActor {
    const preferredUsername = secureRndstr(8);
    const actorId = `${actorHost}/users/${preferredUsername.toLowerCase()}`;

    return {
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: actorId,
        type: 'Person',
        preferredUsername,
        inbox: `${actorId}/inbox`,
        outbox: `${actorId}/outbox`,
    };
}

function createRandomNote(actor: NonTransientIActor): NonTransientIPost {
    const id = secureRndstr(8);
    const noteId = `${new URL(actor.id).origin}/notes/${id}`;

    return {
        id: noteId,
        type: 'Note',
        attributedTo: actor.id,
        content: 'test test foo',
    };
}

function createRandomNotes(actor: NonTransientIActor, length: number): NonTransientIPost[] {
    return new Array(length).fill(null).map(() => createRandomNote(actor));
}

function createRandomFeaturedCollection(actor: NonTransientIActor, length: number): ICollection {
    const items = createRandomNotes(actor, length);

    return {
        '@context': 'https://www.w3.org/ns/activitystreams',
        type: 'Collection',
        id: actor.outbox as string,
        totalItems: items.length,
        items,
    };
}

async function createRandomRemoteUser(
    resolver: MockResolver,
    personService: ApPersonService,
): Promise<MiRemoteUser> {
    const actor = createRandomActor();
    resolver.register(actor.id, actor);

    return await personService.createPerson(actor.id, resolver);
}

describe('ActivityPub', () => {
    let userProfilesRepository: UserProfilesRepository;
    let imageService: ApImageService;
    let noteService: ApNoteService;
    let personService: ApPersonService;
    let rendererService: ApRendererService;
    let jsonLdService: JsonLdService;
    let resolver: MockResolver;

    const metaInitial = {
        cacheRemoteFiles: true,
        cacheRemoteSensitiveFiles: true,
        enableFanoutTimeline: true,
        enableFanoutTimelineDbFallback: true,
        perUserHomeTimelineCacheMax: 100,
        perLocalUserUserTimelineCacheMax: 100,
        perRemoteUserUserTimelineCacheMax: 100,
        blockedHosts: [] as string[],
        sensitiveWords: [] as string[],
        prohibitedWords: [] as string[],
    } as MiMeta;
    const meta = { ...metaInitial };

    function updateMeta(newMeta: Partial<MiMeta>): void {
        for (const key in meta) {
            delete (meta as any)[key];
        }
        Object.assign(meta, newMeta);
    }

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [GlobalModule, CoreModule],
        })
            .overrideProvider(DownloadService).useValue({
                async downloadUrl(url: string, path: string): Promise<{ filename: string }> {
                    if (url.endsWith('.png')) {
                        fs.copyFileSync(
                            _dirname + '/../resources/hw.png',
                            path,
                        );
                    }
                    return {
                        filename: 'dummy.tmp',
                    };
                },
            })
            .overrideProvider(DI.meta).useFactory({ factory: () => meta })
            .compile();

        await app.init();
        app.enableShutdownHooks();

        userProfilesRepository = app.get(DI.userProfilesRepository);

        noteService = app.get<ApNoteService>(ApNoteService);
        personService = app.get<ApPersonService>(ApPersonService);
        rendererService = app.get<ApRendererService>(ApRendererService);
        imageService = app.get<ApImageService>(ApImageService);
        jsonLdService = app.get<JsonLdService>(JsonLdService);
        resolver = new MockResolver(await app.resolve<LoggerService>(LoggerService));

        // Prevent ApPersonService from fetching instance, as it causes Jest import-after-test error
        const federatedInstanceService = app.get<FederatedInstanceService>(FederatedInstanceService);
        jest.spyOn(federatedInstanceService, 'fetch').mockImplementation(() => new Promise(() => { }));
    });

    beforeEach(() => {
        resolver.clear();
    });

    describe('Parse minimum object', () => {
        const actor = createRandomActor();

        const post = {
            '@context': 'https://www.w3.org/ns/activitystreams',
            id: `${host}/users/${secureRndstr(8)}`,
            type: 'Note',
            attributedTo: actor.id,
            to: 'https://www.w3.org/ns/activitystreams#Public',
            content: 'あ',
        };

        test('Minimum Actor', async () => {
            resolver.register(actor.id, actor);

            const user = await personService.createPerson(actor.id, resolver);

            assert.deepStrictEqual(user.uri, actor.id);
            assert.deepStrictEqual(user.username, actor.preferredUsername);
            assert.deepStrictEqual(user.inbox, actor.inbox);
        });

        test('Minimum Note', async () => {
            resolver.register(actor.id, actor);
            resolver.register(post.id, post);

            const note = await noteService.createNote(post.id, undefined, resolver, true);

            assert.deepStrictEqual(note?.uri, post.id);
            assert.deepStrictEqual(note.visibility, 'public');
            assert.deepStrictEqual(note.text, post.content);
        });
    });

    describe('Name field', () => {
        test('Truncate long name', async () => {
            const actor = {
                ...createRandomActor(),
                name: secureRndstr(129),
            };

            resolver.register(actor.id, actor);

            const user = await personService.createPerson(actor.id, resolver);

            assert.deepStrictEqual(user.name, actor.name.slice(0, 128));
        });

        test('Normalize empty name', async () => {
            const actor = {
                ...createRandomActor(),
                name: '',
            };

            resolver.register(actor.id, actor);

            const user = await personService.createPerson(actor.id, resolver);

            assert.strictEqual(user.name, null);
        });
    });

    describe('Collection visibility', () => {
        test('Public following/followers', async () => {
            const actor = createRandomActor();
            actor.following = {
                id: `${actor.id}/following`,
                type: 'OrderedCollection',
                totalItems: 0,
                first: `${actor.id}/following?page=1`,
            };
            actor.followers = `${actor.id}/followers`;

            resolver.register(actor.id, actor);
            resolver.register(actor.followers, {
                id: actor.followers,
                type: 'OrderedCollection',
                totalItems: 0,
                first: `${actor.followers}?page=1`,
            });

            const user = await personService.createPerson(actor.id, resolver);
            const userProfile = await userProfilesRepository.findOneByOrFail({ userId: user.id });

            assert.deepStrictEqual(userProfile.followingVisibility, 'public');
            assert.deepStrictEqual(userProfile.followersVisibility, 'public');
        });

        test('Private following/followers', async () => {
            const actor = createRandomActor();
            actor.following = {
                id: `${actor.id}/following`,
                type: 'OrderedCollection',
                totalItems: 0,
                // first: …
            };
            actor.followers = `${actor.id}/followers`;

            resolver.register(actor.id, actor);
            //resolver.register(actor.followers, { … });

            const user = await personService.createPerson(actor.id, resolver);
            const userProfile = await userProfilesRepository.findOneByOrFail({ userId: user.id });

            assert.deepStrictEqual(userProfile.followingVisibility, 'private');
            assert.deepStrictEqual(userProfile.followersVisibility, 'private');
        });
    });

    describe('Renderer', () => {
        test('Render an announce with visibility: followers', () => {
            rendererService.renderAnnounce('https://example.com/notes/00example', {
                id: genAidx(Date.now()),
                visibility: 'followers',
            } as MiNote);
        });

        test('Render person without avatar decorations', async () => {
            const user = await personService.createPerson(createRandomActor().id, resolver);
            const rendered = await rendererService.renderPerson(user);
            assert.strictEqual(rendered._misskey_avatarDecorations, undefined);
        });

        test('Render person with avatar decorations', async () => {
            const actor = createRandomActor();
            resolver.register(actor.id, actor);
            const user = await personService.createPerson(actor.id, resolver);

            user.avatarDecorations = [
                {
                    id: 'decoration1',
                    angle: 45,
                    flipH: true,
                    offsetX: 10,
                    offsetY: 20,
                },
            ];

            const rendered = await rendererService.renderPerson(user);
            assert.ok(rendered._misskey_avatarDecorations);
            assert.strictEqual(rendered._misskey_avatarDecorations.length, 0);
        });

        test('Accept remote avatar decorations on create', async () => {
            const actor = createRandomActor();
            const decorationUrl = `${actor.id}/decorations/deco1.png`;
            actor._misskey_avatarDecorations = [
                {
                    id: 'remote-deco-1',
                    url: decorationUrl,
                    angle: 30,
                    flipH: false,
                    offsetX: 0.1,
                    offsetY: -0.2,
                },
            ];
            resolver.register(actor.id, actor);

            const user = await personService.createPerson(actor.id, resolver);
            assert.strictEqual(user.avatarDecorations.length, 1);
            assert.strictEqual(user.avatarDecorations[0].id, 'remote-deco-1');
            assert.strictEqual(user.avatarDecorations[0].url, decorationUrl);
            assert.strictEqual(user.avatarDecorations[0].angle, 30);
            assert.strictEqual(user.avatarDecorations[0].flipH, false);
            assert.strictEqual(user.avatarDecorations[0].offsetX, 0.1);
            assert.strictEqual(user.avatarDecorations[0].offsetY, -0.2);
        });

        test('Accept remote avatar decorations on update', async () => {
            const actor = createRandomActor();
            resolver.register(actor.id, actor);
            const user = await personService.createPerson(actor.id, resolver);
            assert.strictEqual(user.avatarDecorations.length, 0);

            const decorationUrl = `${actor.id}/decorations/deco2.png`;
            actor._misskey_avatarDecorations = [
                {
                    id: 'remote-deco-2',
                    url: decorationUrl,
                    angle: 45,
                },
            ];
            resolver.register(actor.id, actor);

            await personService.updatePerson(actor.id, resolver);
            const updatedUser = await personService.fetchPerson(actor.id);
            assert.ok(updatedUser);
            assert.strictEqual(updatedUser.avatarDecorations.length, 1);
            assert.strictEqual(updatedUser.avatarDecorations[0].id, 'remote-deco-2');
            assert.strictEqual(updatedUser.avatarDecorations[0].url, decorationUrl);
            assert.strictEqual(updatedUser.avatarDecorations[0].angle, 45);
        });

        test('Sanitize remote avatar decorations', async () => {
            const actor = createRandomActor();
            actor._misskey_avatarDecorations = [
                {
                    id: 'valid',
                    url: `${actor.id}/decorations/valid.png`,
                },
                {
                    id: 'invalid-http',
                    url: 'http://example.com/invalid.png',
                },
                {
                    id: 'invalid-host',
                    url: 'https://different-host.test/invalid.png',
                },
                {
                    id: 'no-url',
                } as any,
            ];
            resolver.register(actor.id, actor);

            const user = await personService.createPerson(actor.id, resolver);
            assert.strictEqual(user.avatarDecorations.length, 1);
            assert.strictEqual(user.avatarDecorations[0].id, 'valid');
        });

        test('Limit remote avatar decorations count', async () => {
            const actor = createRandomActor();
            actor._misskey_avatarDecorations = Array.from({ length: 20 }, (_, i) => ({
                id: `deco-${i}`,
                url: `${actor.id}/decorations/deco${i}.png`,
            }));
            resolver.register(actor.id, actor);

            const user = await personService.createPerson(actor.id, resolver);
            assert.strictEqual(user.avatarDecorations.length, 16);
        });
    });

    describe('Featured', () => {
        test('Fetch featured notes from IActor', async () => {
            const actor = createRandomActor();
            actor.featured = `${actor.id}/collections/featured`;

            const featured = createRandomFeaturedCollection(actor, 5);

            resolver.register(actor.id, actor);
            resolver.register(actor.featured, featured);

            await personService.createPerson(actor.id, resolver);

            // All notes in `featured` are same-origin, no need to fetch notes again
            assert.deepStrictEqual(resolver.remoteGetTrials(), [actor.id, actor.featured]);

            // Created notes without resolving anything
            for (const item of featured.items as IPost[]) {
                const note = await noteService.fetchNote(item);
                assert.ok(note);
                assert.strictEqual(note.text, 'test test foo');
                assert.strictEqual(note.uri, item.id);
            }
        });

        test('Fetch featured notes from IActor pointing to another remote server', async () => {
            const actor1 = createRandomActor();
            actor1.featured = `${actor1.id}/collections/featured`;
            const actor2 = createRandomActor({ actorHost: 'https://host2.test' });

            const actor2Note = createRandomNote(actor2);
            const featured = createRandomFeaturedCollection(actor1, 0);
            (featured.items as IPost[]).push({
                ...actor2Note,
                content: 'test test bar', // fraud!
            });

            resolver.register(actor1.id, actor1);
            resolver.register(actor1.featured, featured);
            resolver.register(actor2.id, actor2);
            resolver.register(actor2Note.id, actor2Note);

            await personService.createPerson(actor1.id, resolver);

            // actor2Note is from a different server and needs to be fetched again
            assert.deepStrictEqual(
                resolver.remoteGetTrials(),
                [actor1.id, actor1.featured, actor2Note.id, actor2.id],
            );

            const note = await noteService.fetchNote(actor2Note.id);
            assert.ok(note);

            // Reflects the original content instead of the fraud
            assert.strictEqual(note.text, 'test test foo');
            assert.strictEqual(note.uri, actor2Note.id);
        });

        test('Fetch a note that is a featured note of the attributed actor', async () => {
            const actor = createRandomActor();
            actor.featured = `${actor.id}/collections/featured`;

            const featured = createRandomFeaturedCollection(actor, 5);
            const firstNote = (featured.items as NonTransientIPost[])[0];

            resolver.register(actor.id, actor);
            resolver.register(actor.featured, featured);
            resolver.register(firstNote.id, firstNote);

            const note = await noteService.createNote(firstNote.id as string, undefined, resolver);
            assert.strictEqual(note?.uri, firstNote.id);
        });
    });

    describe('Images', () => {
        test('Create images', async () => {
            const imageObject: IApDocument = {
                type: 'Document',
                mediaType: 'image/png',
                url: 'http://host1.test/foo.png',
                name: '',
            };
            const driveFile = await imageService.createImage(
                await createRandomRemoteUser(resolver, personService),
                imageObject,
            );
            assert.ok(driveFile && !driveFile.isLink);

            const sensitiveImageObject: IApDocument = {
                type: 'Document',
                mediaType: 'image/png',
                url: 'http://host1.test/bar.png',
                name: '',
                sensitive: true,
            };
            const sensitiveDriveFile = await imageService.createImage(
                await createRandomRemoteUser(resolver, personService),
                sensitiveImageObject,
            );
            assert.ok(sensitiveDriveFile && !sensitiveDriveFile.isLink);
        });

        test('cacheRemoteFiles=false disables caching', async () => {
            updateMeta({ ...metaInitial, cacheRemoteFiles: false });

            const imageObject: IApDocument = {
                type: 'Document',
                mediaType: 'image/png',
                url: 'http://host1.test/foo.png',
                name: '',
            };
            const driveFile = await imageService.createImage(
                await createRandomRemoteUser(resolver, personService),
                imageObject,
            );
            assert.ok(driveFile && driveFile.isLink);

            const sensitiveImageObject: IApDocument = {
                type: 'Document',
                mediaType: 'image/png',
                url: 'http://host1.test/bar.png',
                name: '',
                sensitive: true,
            };
            const sensitiveDriveFile = await imageService.createImage(
                await createRandomRemoteUser(resolver, personService),
                sensitiveImageObject,
            );
            assert.ok(sensitiveDriveFile && sensitiveDriveFile.isLink);
        });

        test('cacheRemoteSensitiveFiles=false only affects sensitive files', async () => {
            updateMeta({ ...metaInitial, cacheRemoteSensitiveFiles: false });

            const imageObject: IApDocument = {
                type: 'Document',
                mediaType: 'image/png',
                url: 'http://host1.test/foo.png',
                name: '',
            };
            const driveFile = await imageService.createImage(
                await createRandomRemoteUser(resolver, personService),
                imageObject,
            );
            assert.ok(driveFile && !driveFile.isLink);

            const sensitiveImageObject: IApDocument = {
                type: 'Document',
                mediaType: 'image/png',
                url: 'http://host1.test/bar.png',
                name: '',
                sensitive: true,
            };
            const sensitiveDriveFile = await imageService.createImage(
                await createRandomRemoteUser(resolver, personService),
                sensitiveImageObject,
            );
            assert.ok(sensitiveDriveFile && sensitiveDriveFile.isLink);
        });

        test('Link is not an attachment files', async () => {
            const linkObject: IObject = {
                type: 'Link',
                href: 'https://example.com/',
            };
            const driveFile = await imageService.createImage(
                await createRandomRemoteUser(resolver, personService),
                linkObject,
            );
            assert.strictEqual(driveFile, null);
        });
    });

    describe('JSON-LD', () => {
        test('Compaction', async () => {
            const jsonLd = jsonLdService.use();

            const object = {
                '@context': [
                    'https://www.w3.org/ns/activitystreams',
                    {
                        _misskey_quote: 'https://misskey-hub.net/ns#_misskey_quote',
                        unknown: 'https://example.org/ns#unknown',
                        undefined: null,
                    },
                ],
                id: 'https://example.com/notes/42',
                type: 'Note',
                attributedTo: 'https://example.com/users/1',
                to: ['https://www.w3.org/ns/activitystreams#Public'],
                content: 'test test foo',
                _misskey_quote: 'https://example.com/notes/1',
                unknown: 'test test bar',
                undefined: 'test test baz',
            };
            const compacted = await jsonLd.compact(object);

            assert.deepStrictEqual(compacted, {
                '@context': CONTEXT,
                id: 'https://example.com/notes/42',
                type: 'Note',
                attributedTo: 'https://example.com/users/1',
                to: 'as:Public',
                content: 'test test foo',
                _misskey_quote: 'https://example.com/notes/1',
                'https://example.org/ns#unknown': 'test test bar',
                // undefined: 'test test baz',
            });
        });
    });
});
