import commonConfig from './rollup.config';
import { terser } from 'rollup-plugin-terser';

const config = {
    ...commonConfig,
    output: [
		{
			name: 'Readability',
			file: 'dist/readability.min.js',
			format: 'iife'
		},
		{
			file: 'dist/readability.es.min.js',
			format: 'es'
		},
		{
			file: 'dist/readability.cjs.min.js',
			format: 'cjs'
		}
	]
};
config.plugins.push(terser());

export default config;