我们非常欢迎您为 chat-room 做出贡献，帮助我们把它做得比现在更好！作为贡献者，请遵循以下准则：

<!--* [Code of Conduct](#coc)-->

- [问题和漏洞](#issue)
- [功能请求](#feature)
- [提交指南](#submit)
- [提交信息指南](#commit)
  <!-- - [Signing the CLA](#cla) -->

## <a name="issue"></a> 问题和漏洞?

如果您在源代码中发现错误，可以通过以下方式帮助我们： 向我们的 [GitHub][github] 仓库[提交issue](#submit-issue) 。更棒的是，您还可以…… 提交一个包含修复程序的 [Pull Request](#submit-pr) 。

## <a name="feature"></a> 功能请求？

您可以通过向我们的 GitHub 代码库[提交issue](#submit-issue) 来请求新功能。如果您想实现新功能，请先提交一个包含您工作方案的 issue，以确保我们能够采纳。请考虑一下您要进行的更改类型：

- 对于重大功能 ，请先创建一个 issue 并概述您的提案，以便进行讨论。这将有助于我们更好地协调工作，避免重复劳动，并帮助您完善变更，使其顺利被项目采纳。请在 issue 名称前加上 `[discussion]` 前缀，例如“[discussion]：​​您的功能想法”。
- 小型功能可以创建并直接作为 [Pull Request](#submit-pr) 提交 。

## <a name="submit"></a> 提交指南

### <a name="submit-issue"></a> 提交Issue

在提交问题之前，请先搜索问题跟踪器，也许已经存在与您的问题相关的问题，讨论中可能会提供现成的解决方法。

### <a name="submit-pr"></a> 提交拉取请求（PR）

在提交 Pull Request (PR) 之前，请考虑以下准则：

1. 在 [GitHub Pull Requests][gh_prs] 中搜索与你的提交相关的已打开或已关闭的 PR。避免重复劳动。
2. fork 此仓库。
3. 请在新创建的 Git 分支中进行更改：

   ```shell
   git checkout -b my-fix-branch main
   ```

4. 创建补丁，**并包含适当的测试用例**。
5. 请使用符合我们规范的描述性提交消息提交您的更改。 [提交信息规范](#commit)。遵守这些规范是必要的。

6. 将您的分支推送到 GitHub：

   ```shell
   git push origin my-fix-branch
   ```

7. 在 GitHub 上，向 `chat-room:main` 发送合并请求。

就这样！感谢您的贡献！

## <a name="commit"></a> 提交信息指南

我们对 Git 提交信息的格式有非常严格的规定。这使得**提交信息更易读** ，便于查看**项目历史记录**。

### 提交消息格式

每条提交信息都包含**头部**、**主体**和**尾部**。头部格式特殊，包含**类型**、**作用域**和**主题**：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**头部信息**是必需的，头部信息的**作用域**是可选的。

提交信息的任何一行都不能超过 100 个字符！这样可以使信息在 GitHub 以及各种 Git 工具中更容易阅读。

示例：

```
docs(changelog): 增加v5版本的日志内容
fix(utils): 修改生成唯一ID函数的bug
```

### Revert

如果提交回滚的是之前的提交，则应以 `revert:` 开头，后跟被回滚提交的头部信息。正文应写成： `This reverts commit <hash>`. ，其中hash是被回滚提交的 SHA 值。

### Type

必须是以下条件之一：

- **build**: 影响构建系统或外部依赖项的更改（例如：gulp、broccoli、npm）
- **chore**: 更新任务等；不涉及生产代码更改
- **ci**: 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs）
- **docs**: 仅文档更改
- **feat**: 一项新功能
- **fix**: 一个错误修复
- **perf**: 一项能够提升性能的代码更改
- **refactor**: 既不修复错误也不添加新功能的代码更改。
- **style**: 不影响代码含义的更改（空格、格式、缺失的分号等）
- **test**: 添加缺失的测试或更正现有测试
- **sample**: 用例的变化

### Scope

作用域应包含受影响的 npm 包的名称（由阅读提交消息生成的变更日志的人所理解）。

以下是支持的作用域列表：

- **database**: 用于在 `packages/database` 目录中所做的更改
- **auth**: 用于在 `packages/auth` 目录中所做的更改
- **utils**: 用于在 `packages/utils` 目录中所做的更改
- **api-contracts**: 用于在 `packages/api-contracts` 目录中所做的更改
- **config**: 用于在 `packages/config` 目录中所做的更改
- **types**: 用于在 `packages/types` 目录中所做的更改
- **web**: 用于在 `apps/chat-room-web` 目录中所做的更改
- **nest**: 用于在 `apps/chat-rom-serve` 目录中所做的更改

如果您的更改影响多个软件包，请用逗号分隔各个范围（例如 `web, nest`）。

### Subject

该主题包含对变化的简明描述：

- 结尾没有句号（.）。

[github]: https://github.com/chenjieya/chat-room
[gh_prs]: https://github.com/chenjieya/chat-room/pulls
