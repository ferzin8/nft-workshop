const { Worker, isMainThread, parentPort } = require('node:worker_threads');
const mergeImg = require('merge-img');

parentPort.once('message', ({images, output}) => {

    new Promise(function(resolve, reject) {
      mergeImg(images)
      .then((img) => {
        // Save image as file
        img.write(output, () => {
          console.log(`Image ${output} saved`);
          resolve();
        });
      });
    }).then(() => {
        parentPort.postMessage({ok: 'ok'});
    });
});
