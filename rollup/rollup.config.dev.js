import commonConfig from './rollup.config';

const config = {
    ...commonConfig,
    output: [
		{
			name: 'Readability',
			file: 'dist/readability.js',
			format: 'iife'
		},
		{
			file: 'dist/readability.es.js',
			format: 'es'
		},
		{
			file: 'dist/readability.cjs.js',
			format: 'cjs'
		}
	]
};

export default config;