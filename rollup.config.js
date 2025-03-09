import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import json from "@rollup/plugin-json";
import polyfills from "rollup-plugin-node-polyfills";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/jhml.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/jhtml.umd.js",
      format: "umd",
      name: "JHTML",
    },
  ],
  plugins: [
    typescript(),
    serve(),
    livereload(),
    nodeResolve({
      browser: true, 
      preferBuiltins: false,
    }),
    // commonjs(),
    // json(),
    // polyfills(),
  ],
//   external: ["axios"],
};
