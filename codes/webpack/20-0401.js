/* eslint-disable import/no-unresolved */
const path = require("path");

const fs = require("fs-extra");
// 终端输出进度条
const WebpackBar = require("webpackbar");
// 显示编译时间
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const chalk = require("chalk");

let logs = [];
const echo = (type, data) => {
  const logPath = path.resolve(__dirname, "./t1.json");
  if (type === "clear") {
    logs = [];
    fs.writeJson(logPath, {}, err => {
      if (err) return console.error(err);
      console.log("success,clear");
    });
  }
  if (type === "write") {
    fs.writeJson(logPath, data, err => {
      if (err) return console.error(err);
      console.log("success,write");
    });
  }
  if (type === "log") {
    logs.push({
      ...data
      // details: JSON.stringify(data.details),
    });
  }
};

const getAssetsPath = () => {
  let projectName = "";
  if (process.env.BUILD_ENV === "preview") {
    projectName = "dxymom-client_dynamic";
  } else if (process.env.BUILD_ENV === "production") {
    projectName = "dxymom-client";
  }
  return `https://assets.dxycdn.com/gitrepo/${projectName}/dist/`;
};

export default webpackConfig => {
  webpackConfig.output = {
    ...webpackConfig.output,
    chunkFilename: "[id].[chunkhash].async.js"
  };

  webpackConfig.module = {
    noParse: [/videojs-contrib-hls/],
    ...webpackConfig.module
  };

  /* 本地开发和Hybrid环境不需要 */
  if (!["development", "hybrid", "preview"].includes(process.env.BUILD_ENV)) {
    const SentryWebpackPlugin = require("@sentry/webpack-plugin");
    webpackConfig.plugins.push(
      new SentryWebpackPlugin({
        include: "./dist/",
        ignore: ["node_modules", "webpack.config.js"],
        urlPrefix: getAssetsPath()
      })
    );
  }

  webpackConfig.plugins.push(
    new ProgressBarPlugin({
      format: `build [:bar]${chalk.green.bold(":percent")} (:elapsed seconds)`,
      clear: false
    }),
    new HardSourceWebpackPlugin()
    // new WebpackBar({
    //   fancy: false,
    //   basic: false,
    //   profile: false,
    //   reporter: {
    //     start(context) {
    //       console.log('1.start', context.state);
    //       // echo('clear');
    //       // Called when (re)compile is started
    //     },
    //     change(context) {
    //       console.log('2.change', context.state);
    //       // Called when a file changed on watch mode
    //     },
    //     update(context) {
    //       console.log('3.update', context.state);
    //       // Called after each progress update
    //     },
    //     done(context) {
    //       console.log('4.done', context.state);
    //       // Called when compile finished
    //     },
    //     progress(context) {
    //       // console.log('5.progress', context.state);
    //       // echo('log', context.state);
    //       // Called when build progress updated
    //     },
    //     allDone(context) {
    //       console.log('6.allDone', context.state);
    //       // echo('write', logs);
    //       // Called when _all_ compiles finished
    //     },
    //     beforeAllDone(context) {},
    //     afterAllDone(context) {},
    //   },
    // })
  );

  return webpackConfig;
};
