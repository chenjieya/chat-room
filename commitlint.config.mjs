export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // 影响构建系统或外部依赖的变更（如 npm、gulp、webpack、rollup 等配置）。
        'build',
        // 日常杂务，不修改业务代码也不影响测试的变更（如更新依赖、修改 .gitignore、配置 CI 等）。
        'chore',
        // 持续集成相关的变更（如 GitHub Actions、Travis CI 配置）。
        'ci',
        // 仅文档相关的变更（如 README、注释、API 文档）。
        'docs',
        // 新功能（feature）。
        'feat',
        // 修复 bug。
        'fix',
        // 性能优化相关的变更（通常不改变功能，只提升性能）。
        'perf',
        // 代码重构，不修复 bug 也不添加新功能（如重命名变量、拆分函数）。
        'refactor',
        // 回退之前的某次提交。
        'revert',
        // 代码格式、样式变更，不影响代码逻辑（如空格、缩进、分号、CSS 样式）。
        'style',
        // 添加或修改测试代码（单元测试、集成测试等）。
        'test',
        // 示例代码或 demo 相关的变更（非正式业务代码，通常用于演示）。
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
