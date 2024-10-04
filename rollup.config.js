import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import svg from 'rollup-plugin-svg';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.tsx',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            commonjs(),
            resolve(),
            json(),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
            }),
            svg(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss(),
            terser(),
        ],
    },
    {
        input: 'dist/esm/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
        external: ['react', 'react-dom', 'axios', /\.css$/, /\.scss$/],
    },
];
