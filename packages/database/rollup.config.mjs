import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    }
  ],
  external: [
    '@nestjs/common',
    '@nestjs/core',
    '@nestjs/typeorm',
    'redis',
    'typeorm',
    'rxjs'
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      compilerOptions: {
        module: 'NodeNext',
        moduleResolution: 'NodeNext'
      }
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ]
}
