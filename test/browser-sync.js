const bs = require('browser-sync').create();
bs.init({
    server: "test/files",
		// 监听并触发
		files:["test/**"]
});
// 简写
// bs.watch('./test/**').on('change', bs.reload);
// 再简写
// bs.reload('./test/**')