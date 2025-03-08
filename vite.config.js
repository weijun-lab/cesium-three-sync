import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  root: "./examples",
  base: "./", // 确保 base 是相对路径，以保持正确的资源加载
  build: {
    minify: "esbuild",
    target: "es2015",// 指定输出的兼容目标//https://cn.vitejs.dev/config/build-options.html#build-target
    outDir: "../dist", // 指定构建输出目录为根目录下的 dist 文件夹
    lib: {
      entry: resolve(__dirname, "./src/ThreeToCesium.js"),
      name: "ThreeToCesium", //全局变量名称
      fileName: "ThreeToCesium",
    },
    rollupOptions: {
      external: ['three'],//指定外部依赖，不会将其打包到bundle中
      output: {
        chunkFileNames: "src/[name].js", // 按需加载模块的命名规则
        assetFileNames: "ThreeToCesium[extname]", // 静态资源（包括CSS）的命名规则
        globals: {
          leaflet: 'THREE', // 定义THREE的全局变量名，确保umd.js能正确访问到THREE
        },
      },
    },
  },

  server: {
    open: true,
    host: "0.0.0.0",
  },
});
