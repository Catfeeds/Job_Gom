'use strict';

const path = require('path'),
  PNGCrop = require('png-crop'),
  Promise = require('bluebird');

Promise.promisifyAll(PNGCrop);

function getImagesAndName(options,message) {
  let images = message.data;
  const imagesAndName = [];
  let i = 0;
  images.forEach(function(image) {
    imagesAndName.push({
      data: image,
      name: i + '.png'
    });
    i++;
  })

  message.data = imagesAndName.map(x => x.name);
  return imagesAndName;
}

function storeFirefoxScreenshots(options, imagesAndName, storageManager) {
  const width = Number(options.browsertime.viewPort.split('x')[0]);
  const height = Number(options.browsertime.viewPort.split('x')[1]);

  // Firfox screenshots take the full height of the browser window, so Lets crop
  return storageManager.createDir(options.staticUrl+'screenshots/'+options.taskid).
  then((dirPath) => {
    return Promise.map(imagesAndName, function(screenshot) {
      return PNGCrop.cropAsync(screenshot.data, path.join(dirPath, screenshot.name), {
        width,
        height
      });
    })
  })
}

function storeChromeScreenshots(options, imagesAndName, storageManager) {
  return storageManager.createDir(options.staticUrl+'screenshots/'+options.taskid).
  then((dirPath) => {
    return Promise.map(imagesAndName, function(screenshot) {
      return storageManager.writeInDir(dirPath, screenshot.name, screenshot.data);
    })
  })
}

module.exports = {
  name() {
    return path.basename(__dirname);
  },
  open(context, options) {
    this.storageManager = context.storageManager;
    this.options = options;
  },
  processMessage(message) {
    switch (message.type) {
      case 'browsertime.screenshot':
        if (this.options.browser === 'firefox') {
          return storeFirefoxScreenshots(this.options, getImagesAndName(this.options,message), this.storageManager);
        } else {
          return storeChromeScreenshots(this.options, getImagesAndName(this.options,message), this.storageManager);
        }
    }
  }
};
