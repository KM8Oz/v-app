
const path = require('path');
const builder = require('electron-builder');
const Platform = builder.Platform

builder.build({
  targets:Platform.MAC.createTarget(),
  files: [
    path.join(__dirname, '../src/main'),
    path.join(__dirname, '../src/dist'),
  ],
  win: {
    target: [
      {
        target: "nsis",
        arch: [
          "x64"
        ]
      }
    ],
    artifactName: "${productName}_setup_${version}.${ext}"
  },
  directories: {
    output: "release"
  },
  extends: null,
  productName: "vignettes",
})
  .then((...args) => {
    console.log(args)
  })
  .catch(error => {
    console.log(error);
  });
