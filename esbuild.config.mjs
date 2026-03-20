import esbuild from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { createRequire } from 'node:module'

// 模拟require函数
const require = createRequire(import.meta.url)

// 模拟node中得__dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 所有包得 父文件夹路径
const targetDir = path.resolve(__dirname, 'packages')


// 解析命令
const {
  positionals,
  values: { watch }
} = parseArgs({
  allowPositionals: true,
  options: {
    watch: {
      type: 'boolean',
      short: 'w',
      default: false
    }
  }
})

// 获取所有 packages
function getAllPackages() {
  return fs
    .readdirSync(targetDir)
    .filter(name => fs.statSync(path.join(targetDir, name)).isDirectory())
}

// 脚本要打包的文件夹名称(默认打包下面的所有文件夹)
const target = positionals.length ? positionals : getAllPackages()


// 打包
async function createBuildPackage(packageDirName) { 
	// 1. 整理esbuild需要的参数

	const packageDir = path.join(targetDir, packageDirName)

	// 读取package.json文件
	const pkg = require(path.join(packageDir, 'package.json'))

	// 打包入口文件
	const entry = path.join(packageDir, 'src/index.ts')
	// 出口目录
	const outDir = path.join(packageDir, 'dist')

	if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
  }

	// 不打包的内容
	const external = [
		// 生产依赖不需要打包，因为在使用的时候，开发依赖都会被下载下来
		...Object.keys(pkg.dependencies || {}),
		// peerDependencies不需要打包，因为使用该包的项目中必须包含这些依赖
		...Object.keys(pkg.peerDependencies || {}),
	]

	// 2. 双打包esm+cjs
	async function buildAll() { 
	 await Promise.all([
      esbuild.build({
        entryPoints: [entry],
        bundle: true,
        format: 'esm',
        sourcemap: false,
        outfile: path.join(outDir, 'index.esm.js'),
        platform: 'neutral',
        external
      }),

      esbuild.build({
        entryPoints: [entry],
        bundle: true,
        format: 'cjs',
        sourcemap: false,
        outfile: path.join(outDir, 'index.cjs.js'),
        platform: 'node',
        external
      })
    ])

    console.log(`✔ 构建完成: ${target}`)
	}

	if (!watch) { 
		await buildAll()
		return 
	}

	// 3. esbuild打包，监听
	const ctx = await esbuild.context({
		entryPoints: [entry],
		bundle: true,
		write: false,
		outdir: outDir,
		format: 'esm',
		platform: 'node',
		external,
		plugins: [
			{
				name: 'esbuild-rebuild-plugin',
				setup(build) { 
					build.onEnd(async () => { 
						await buildAll()
					})
				}
			}
		]
	})
	ctx.watch()
	console.log(`👀 正在监听：${packageDirName}模块`)
}


await Promise.all(target.map(createBuildPackage))