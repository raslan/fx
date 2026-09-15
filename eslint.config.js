import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'site/**', 'node_modules/**', '.superpowers/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['src/react/**/*.ts', 'src/react/**/*.tsx'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
);
