/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// This script checks if migration files are present in the migration directory.

import { existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const migrationDir = join(__dirname, '..', 'migration');

console.log('Checking migration files...');

if (!existsSync(migrationDir)) {
	console.error('Error: migration directory not found at:', migrationDir);
	process.exit(1);
}

const migrationFiles = readdirSync(migrationDir).filter(file => file.endsWith('.js'));

if (migrationFiles.length === 0) {
	console.error('Error: no migration files found in:', migrationDir);
	process.exit(1);
}

console.log(`Found ${migrationFiles.length} migration files`);

// List all migration files for verification
migrationFiles.sort().forEach(file => {
	console.log(`  - ${file}`);
});

console.log('Migration files check passed successfully');
process.exit(0);
