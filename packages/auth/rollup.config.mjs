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
    '@nestjs/jwt',
    '@nestjs/passport',
    'passport',
    'passport-jwt',
    'passport-local',
    'reflect-metadata',
    'rxjs'
  ],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: './dist',
      module: 'NodeNext',
      outputToFilesystem: false
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ]
}
