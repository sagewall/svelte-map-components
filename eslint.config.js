import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				HTMLArcgisMapElement: 'readonly',
				HTMLArcgisOrientedImageryViewerElement: 'readonly',
				HTMLArcgisScaleRangeSliderElement: 'readonly',
				HTMLArcgisTimeSliderElement: 'readonly',
				HTMLCalciteDropdownElement: 'readonly',
				HTMLCalciteDropdownItemElement: 'readonly'
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', '.netlify/']
	}
);
