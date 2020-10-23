//import path from "path" 와 같은 뜻 old한 js 코드를 써야 되기 때문
const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniExtractCss = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  devtool: "cheap-module-source-map",
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        //1. scss파일 찾기
        //2. scss 를 css로 바꾸기
        //3. css해당하는 text 취하기
        //4. 추출해 css파일로 저장
        test: /\.scss$/,
        use: [
          {
            loader: MiniExtractCss.loader,
            options: {
              hmr: process.env.WEBPACK_ENV === "development",
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins() {
                  return [
                    autoprefixer({
                      overrideBrowserslist: "cover 99.5%",
                    }),
                  ];
                },
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniExtractCss({
      filename: "styles.css",
    }),
  ],
};

module.exports = config;
