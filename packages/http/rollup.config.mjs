import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
export default {
  input: 'src/index.ts', // 指定打包入口
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'alvisHttp', // umd 必须指定全局变量名
      globals: {
        axios: 'axios'
      }
    }
  ],
  external: ['axios'],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: './dist/types' // 类型文件输出目录
    }),
    babel({
      babelHelpers: 'bundled', // 或 'runtime', 'inline', 'external'
      exclude: 'node_modules/**', // 排除 node_modules
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // 要处理的文件扩展名
    })
  ]
}
