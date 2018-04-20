var winston = require('winston');  
winston.log('info', 'Hello distributed log files!');  
winston.info('Hello again distributed logs');  
winston.info('Hello world!', {timestamp: Date.now(), pid: process.pid});  
winston.debug('debug', 'test message %d', 123);  
// winston.notice('notice', 'test message %d', 123);  
winston.error('error', 'test message %d', 123);  