const fs = require("fs");
const mergeImg = require('merge-img');
const config = require('./config');
const attributes = require('./attributes');
const { Worker, isMainThread, parentPort } = require('node:worker_threads');
const Queue = require("queue-promise");

let faces;

function mergeImagesToPng(images, output) {

  return new Promise((resolve) => {
    const worker = new Worker('./generate-image.worker.js');

    worker.postMessage({images, output});

    worker.once('message', (message) => {
      resolve(message);
    });
  })


}

async function saveFaceByAttributes(arr, outFile) {
  let images = [];

  for (let i=0; i < arr.length; i++) {
    if (arr[i] > 0) {
      const img = {
        src: `${config.imagePartsFolder}/${attributes[i].name}${arr[i]}.png`,
        offsetX: (i == 0) ? 0 : -2000, // <-------- Put your image width here
        // offsetX: 0,
        offsetY: 0,
      }
      images.push(img);
    }
  }

  // Generate image
  await mergeImagesToPng(images, outFile);
}

function printAttributes(i) {
  let attrs = '[' + faces[i] + '] => ';
  for (let j=0; j<attributes.length; j++) {
    if (faces[i][j] > 0) {
      attrs += attributes[j].attrNames[faces[i][j]-1] + ", ";
    }
  }

  console.log(`Attributes for NFT ${i+1}:`, attrs);
}

async function generateImages() {

  const queue = new Queue({
    concurrent: 10,
  });

  for (let i=0; i<faces.length; i++) {
  // for (let i=0; i<100; i++) {

    const face = faces[i];
    const file = `${config.outputFolder}/nft_image_${i+1}.png`;

    printAttributes(i);

    queue.enqueue(async () => await saveFaceByAttributes(face, file));
  }

  await new Promise(resolve => queue.on('end', resolve));

}

async function main() {
  faces = JSON.parse(fs.readFileSync(`${config.outputFolder}/${config.outputJSON}`));
  console.time('images');
  await generateImages();
  console.timeEnd('images');
}

main();

