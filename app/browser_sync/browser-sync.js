const bs = require('browser-sync').create();

// 示例1
/* bs.init({
    server: "test/files",
		// 监听并 reload
		files:["test/**"]
}); */
// 简写
// bs.watch('./test/**').on('change', bs.reload);
// 再简写
// bs.reload('./test/**')


// 示例2
bs.init({
    proxy: "127.0.0.1:3065",
		// server: "test/files",
		// 监听并 reload
		files:["test/**"]
});

