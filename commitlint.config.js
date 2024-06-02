module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'feat',
        'fix',
        'update',
        'remove',
        'move',
        'rename',
        'docs',
        'comment',
        'refactor',
        'test',
        'chore',
      ],
    ],
  },
};
