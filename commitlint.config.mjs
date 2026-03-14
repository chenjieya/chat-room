export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'sample'
      ]
    ],
    'type-case': [2, 'always', ['lower-case']],
    'scope-case': [2, 'always', ['lower-case']],
    'scope-enum': [
      2,
      'always',
      [
        'database',
        'auth',
        'utils',
        'api-contracts',
        'config',
        'types',
        'web',
        'nest',
        'http'
      ]
    ]
  }
}
