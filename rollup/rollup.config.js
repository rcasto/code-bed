import babel from '@rollup/plugin-babel';

export const bundleName = 'codebed';

const config = {
	input: `src/${bundleName}.js`,
	plugins: [babel({
		babelHelpers: 'bundled'
	})],
};

export default config;