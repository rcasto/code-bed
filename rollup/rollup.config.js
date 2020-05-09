import babel from '@rollup/plugin-babel';

export const bundleName = 'codebed';
export const bundleNameGlobal = 'CodeBed';

const config = {
	input: `src/${bundleName}.js`,
	plugins: [
		babel({
			babelHelpers: 'bundled'
		})
	],
};

export default config;