/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const createRandom = (min, max) => parseInt(Math.random() * (max - min + 1) + min, 10);

export default params => new Promise(async (resolve, reject) => {
  const apiId = params.url.match(/\d*$/)[0];
  try {
    const rlt = require(`../mock/${apiId}`);
    const delay = createRandom(1, 500);
    console.info(`mockRequestPromise.try: ${apiId} [${delay}ms]`);
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(rlt)));
    }, delay);
  } catch (err) {
    console.warn(`mockRequestPromise.err: ${err}`);
    reject(err);
  }
});


/**
 * 
 */