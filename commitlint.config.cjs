module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        'setup',
        'dashboard',
        'profile',
        'login',
        'editor',
        'api',
        'store',
        'landing',
      ],
    ],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'style', 'test', 'refactor'],
    ],
  },
};
