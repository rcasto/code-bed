import babel from '@rollup/plugin-babel';

export const bundleName = 'codepen';

const config = {
	input: `src/${bundleName}.js`,
	plugins: [babel({
		babelHelpers: 'bundled'
	})],
};

export default config;