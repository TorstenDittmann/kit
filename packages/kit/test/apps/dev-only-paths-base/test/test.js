import { expect } from '@playwright/test';
import { test } from '../../../utils.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../svelte.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @typedef {import('@playwright/test').Response} Response */

const BASE_PATH = config.kit.paths.base;

test('service worker import proxy', async ({ baseURL }) => {
	const service_worker = await fetch(baseURL + BASE_PATH + '/service-worker.js').then((r) =>
		r.text()
	);
	expect(service_worker).toEqual(
		`import '${path.join(BASE_PATH, '/@fs', __dirname, '../src/service-worker.js')}';`
	);
});
