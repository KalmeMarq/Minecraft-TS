import express, { Application, Express } from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { Compiler } from 'webpack'
import axios from 'axios'

const app: Express = express()
app.use(express.json())
app.use(express.text())
app.use(compression())
const PORT: string | number = process.argv[2] === undefined ? 8000 : process.argv[2]

const preFolders = ['public/resourcepacks', 'public/datapacks', 'public/saves', 'public/screenshots']
preFolders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
})

if (!fs.existsSync('public/options.txt')) {
  fs.writeFileSync('public/options.txt', '')
}

const config = require('./config.json');

(async () => {
  const promises: Promise<any>[] = []

  const versions: any = {}
  const version_manifest: any = await axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json')

  for (let i = 0; i < version_manifest.data.versions.length; i++) {
    versions[version_manifest.data.versions[i].id] = version_manifest.data.versions[i].url
  }

  const versionID = versions[config.id] ? config.id : version_manifest.lastest.release
  const versionData = await axios.get(`${versions[versionID]}`)

  const assetsIndex = await axios.get(`${versionData.data.assetIndex.url}`)
  if (!fs.existsSync('assets/indexes')) {
    fs.mkdirSync('assets/indexes')
  }

  const assetsVersion = 'assets/indexes/' + versionData.data.assetIndex.id + '.json'
  if (!fs.existsSync(assetsVersion)) {
    fs.writeFileSync(assetsVersion, JSON.stringify(assetsIndex.data))
  }

  const objects = Object.entries(assetsIndex.data.objects)
  if (!fs.existsSync('assets/objects')) {
    fs.mkdirSync('assets/objects')
  }

  objects.forEach((object: any) => {
    promises.push(
      new Promise(async (res, rej) => {
        const hash = object[1].hash + ''
        const filepath = `assets/objects/${hash.slice(0, 2)}/${hash}`
        if (!fs.existsSync('assets/objects/' + hash.slice(0, 2))) {
          fs.mkdirSync('assets/objects/' + hash.slice(0, 2))
        }

        if (!fs.existsSync(filepath)) {
          try {
            const response = await axios.request({
              method: 'GET',
              url: `http://resources.download.minecraft.net/${hash.slice(0, 2)}/${hash}`,
              responseType: 'arraybuffer',
              // @ts-ignore
              responseEncoding: 'binary'
            })

            fs.writeFile(filepath, response.data, {
              encoding: 'ascii'
            }, () => {
              res(true)
            })
          } catch (e) {

          }
        } else {
          res(false)
        }
      })
    )
  })

  await Promise.all(promises)

  if (process.argv[3] === 'dev') {
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const config = require('./webpack.dev.js')
    const webpack = require('webpack')
    const compiler: Compiler = webpack(config)
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
      })
    )
  } else {
    app.use(express.static(path.join(__dirname, './public')))
  }

  const server = app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`)
  })

  app.get('/options', (request, response) => {
    let data = ''
    if (fs.existsSync('public/options.txt')) {
      data = fs.readFileSync('public/options.txt', 'utf-8')
    }
    response.send(data)
  })

  app.post('/options', (request, response) => {
    const data = request.body
    fs.writeFileSync('public/options.txt', data)
    response.end()
  })

  app.get('/exists/:path', (req, res) => {
    const base = 'public/'
    const { path } = req.params
    const exists = fs.existsSync(base + path)

    const resData = {
      path: path,
      exists: exists
    }

    res.send(resData)
  })

  app.post('/utils/createfile', (req, res) => {
    const base = 'public/'
    const path = req.body.path
    const data = req.body.data
    fs.writeFileSync(base + path, req.body.data + '')
    res.send(req.body)
  })

  app.get('/utils/receive/:path', (req, res) => {
    const base = 'public/'
    const { path } = req.params

    res.send({
      path: path,
      data: fs.readFileSync(base + path)
    })
  })
})()