import commonConfig, { bundleName, bundleNameGlobal } from './rollup.config';

const config = {
    ...commonConfig,
    output: [
		{
			name: bundleNameGlobal,
			file: `dist/${bundleName}.js`,
			format: 'iife'
		},
		{
			file: `dist/${bundleName}.es.js`,
			format: 'es'
		},
		{
			file: `dist/${bundleName}.cjs.js`,
			format: 'cjs'
		}
	]
};

export default config;