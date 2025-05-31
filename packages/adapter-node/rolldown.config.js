import { defineConfig } from 'rolldown';
import { builtinModules } from 'node:module';

function prefixBuiltinModules() {
	return {
		resolveId(source) {
			if (builtinModules.includes(source)) {
				return { id: 'node:' + source, external: true };
			}
		}
	};
}

export default defineConfig([
	{
		input: 'src/index.js',
		output: {
			file: 'files/index.js',
			format: 'esm'
		},
		platform: 'node',
		plugins: [prefixBuiltinModules()],
		external: ['ENV', 'HANDLER']
	},
	{
		input: 'src/env.js',
		output: {
			file: 'files/env.js',
			format: 'esm'
		},
		platform: 'node',
		plugins: [prefixBuiltinModules()],
		external: ['HANDLER']
	},
	{
		input: 'src/handler.js',
		output: {
			file: 'files/handler.js',
			format: 'esm',
			inlineDynamicImports: true
		},
		platform: 'node',
		plugins: [prefixBuiltinModules()],
		external: ['ENV', 'MANIFEST', 'SERVER', 'SHIMS']
	},
	{
		input: 'src/shims.js',
		output: {
			file: 'files/shims.js',
			format: 'esm'
		},
		platform: 'node',
		plugins: [prefixBuiltinModules()]
	}
]);
