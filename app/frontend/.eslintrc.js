module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: ['import'],
  // add your custom rules here
  rules: {
    '@typescript-eslint/camelcase': 'off',
  },
};
