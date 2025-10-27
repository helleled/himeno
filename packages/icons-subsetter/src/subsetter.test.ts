/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { promises as fsp } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSubsettedFont } from './subsetter.js';

async function smokeTest() {
	console.log('Running subsetter smoke test...');

	const currentDir = path.dirname(fileURLToPath(import.meta.url));
	const fontPath = path.resolve(currentDir, '../node_modules/@tabler/icons-webfont/dist/fonts/tabler-icons.ttf');

	// Check if font file exists
	try {
		await fsp.access(fontPath);
	} catch {
		console.error('Font file not found at:', fontPath);
		console.error('Please run: pnpm install');
		process.exit(1);
	}

	// Test with a narrow unicode range (just a few icons)
	const unicodeRangeValues = new Map<string, number[]>();
	unicodeRangeValues.set('test', [0xea50, 0xea51, 0xea52]); // Just 3 unicode points

	try {
		const result = await generateSubsettedFont(fontPath, unicodeRangeValues);
		
		// Verify result
		if (!result.has('test')) {
			throw new Error('Expected result to have "test" key');
		}

		const buffer = result.get('test');
		if (!buffer || buffer.length === 0) {
			throw new Error('Expected non-empty buffer');
		}

		console.log('✓ Smoke test passed!');
		console.log(`  Generated subset: ${buffer.length} bytes`);
		process.exit(0);
	} catch (error) {
		console.error('✗ Smoke test failed:');
		console.error(error);
		process.exit(1);
	}
}

smokeTest();
