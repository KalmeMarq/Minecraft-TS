const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const axios = require('axios')
var netApi = require('net-browserify');

app.use(express.json());
app.use(express.text());

app.use(netApi({ allowOrigin: '*' }))

let preFolders = ['public/resourcepacks', 'public/datapacks', 'public/saves', 'public/screenshots']
preFolders.forEach(folder => {
  if(!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
})

if(!fs.existsSync('public/options.txt')) {
  fs.writeFileSync('public/options.txt', '');
}

const config = require('./config.json');

(async() => {
  let versions = {};
  const version_manifest = await axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json');

  for(let i = 0; i < version_manifest.data['versions'].length; i++) {
    versions[version_manifest.data['versions'][i]['id']] = version_manifest.data['versions'][i]['url'];
  }

  let versionID = versions[config.id] ? config.id : version_manifest['lastest']['release'];
  const versionData = await axios.get(`${versions[versionID]}`);

  const assetsIndex = await axios.get(`${versionData.data['assetIndex']['url']}`);
  if(!fs.existsSync('assets/indexes')) {
    fs.mkdirSync('assets/indexes');
  }

  let assetsVersion = 'assets/indexes/' + versionData.data['assetIndex']['id'] + '.json';
  if(!fs.existsSync(assetsVersion)) {
    fs.writeFileSync(assetsVersion, JSON.stringify(assetsIndex.data));
  }

  let objects = Object.entries(assetsIndex.data['objects']);
  if(!fs.existsSync('assets/objects')) {
    fs.mkdirSync('assets/objects');
  }

  objects.forEach(async(object) => {
    let hash = object[1]['hash'] + '';
    let filepath = `assets/objects/${hash.slice(0, 2)}/${hash}`;
    if(!fs.existsSync('assets/objects/' + hash.slice(0, 2))) {
      fs.mkdirSync('assets/objects/' + hash.slice(0, 2));
    }

    if(!fs.existsSync(filepath)) {
      const resource = await axios.get(`http://resources.download.minecraft.net/${hash.slice(0, 2)}/${hash}`);
      fs.writeFileSync(filepath, JSON.stringify(resource.data));
    }
  });
})().then(() => {
  if (process.argv[3] === 'dev') {
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack.dev.js')
    const webpack = require('webpack')
    const compiler = webpack(config)
  
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
      })
    )
  } else {
    app.use(express.static(path.join(__dirname, './public')))
  }
  
  const server = app.listen(process.argv[2] === undefined ? 8000 : process.argv[2], () => {
    console.log(`Server is running at ${server.address().port}`);
  });
})

