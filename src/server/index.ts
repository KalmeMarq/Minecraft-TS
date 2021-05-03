import express, { Application, Express } from 'express'
import request from 'request';
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { Compiler } from 'webpack'
const socketIO = require('socket.io');
import * as http from 'http'
import axios from 'axios'
import { Socket } from 'node:dgram';
import SocketIO from 'socket.io';
import { Node } from 'estree';
import Util from '../util/Util';
const config = require('../../config.json');

const PORT: string | number = process.argv[2] === undefined ? 8000 : process.argv[2]
const defaultPath = 'public/'
const assetDir = 'public/assets';
const indexesDir = 'public/assets/indexes';
const objectsDir = 'public/assets/objects';

class Server {
  public app: Express;
  public server: http.Server;
  public io: Socket;
  public users: Map<string, { username: string, password: string, uuid: string }> = new Map();

  public constructor(port: string | number) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
    this.app.use(express.json())
    this.app.use(express.text())
    this.app.use(compression())
    this.downloadAssets().finally(() => {
      this.init();
    });
  }

  public async downloadAssets() {
    const promises: Promise<any>[] = []

    const versions: any = {}
    const version_manifest: any = await (await axios.get(`${config.versions_url}`)).data;
  
    for (let i = 0; i < version_manifest.versions.length; i++) {
      versions[version_manifest.versions[i].id] = version_manifest.versions[i].url
    }
  
    const versionID = versions[config.id] ? config.id : version_manifest.lastest.release
    const versionData = await (await axios.get(`${versions[versionID]}`)).data
  
    const assetsIndex = await (await axios.get(`${versionData.assetIndex.url}`)).data
    if (!fs.existsSync(indexesDir)) {
      fs.mkdirSync(indexesDir)
    }
  
    if(!fs.existsSync(assetDir + '/client.jar')) {
      request.get(`${versionData.downloads.client.url}`, { encoding: null }, function(e: any, r: any, b: any) {
        if (e) throw e;
        fs.writeFileSync(assetDir + '/client.jar', b);
      });
    }
  
    const assetsVersion = indexesDir + '/' + versionData.assetIndex.id + '.json'
    if (!fs.existsSync(assetsVersion)) {
      fs.writeFileSync(assetsVersion, JSON.stringify(assetsIndex))
    }
  
    const objects = Object.entries(assetsIndex.objects)
    if (!fs.existsSync(objectsDir)) {
      fs.mkdirSync(objectsDir)
    }
  
    objects.forEach((object: any) => {
      promises.push(
        new Promise(async (res, rej) => {
          const hash = object[1].hash + ''
          const filepath = `${objectsDir}/${hash.slice(0, 2)}/${hash}`
          if (!fs.existsSync(objectsDir + '/' + hash.slice(0, 2))) {
            fs.mkdirSync(objectsDir + '/' + hash.slice(0, 2))
          }
  
          if (!fs.existsSync(filepath)) {
            try {
              const response = await (await axios.request({
                method: 'GET',
                url: Util.format(config.base_resources_url, hash.slice(0, 2), hash),
                responseType: 'arraybuffer',
                // @ts-ignore
                responseEncoding: 'binary'
              })).data
  
              fs.writeFile(filepath, response, {
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
  
    return await Promise.all(promises)
  }

  public init() {
    if (process.argv[3] === 'dev') {
      const webpackDevMiddleware = require('webpack-dev-middleware')
      const config = require('../../webpack.dev.js')
      const webpack = require('webpack')
      const compiler: Compiler = webpack(config)
      this.app.use(
        webpackDevMiddleware(compiler, {
          publicPath: config.output.publicPath
        })
      )
    } else {
      this.app.use(express.static(path.join(__dirname, '../../public')))
    }

    this.server.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`)
    })

    this.io.on('connection', (socket: SocketIO.Socket) => {
      console.log("Connected succesfully to the socket ... %s", socket.id );

      /* socket.emit('get_user', '');

      socket.on('send_user', (data: any) => {
        const usernm = data.username;
        const pass = data.password;

        if(this.users[usernm] === undefined || this.users[usernm] === pass) {
          if((usernm !== null && usernm !== undefined)) {
            this.users[usernm] = pass;
          }
          socket.emit('user_accepted', { username: usernm });
        } else if(true) {
          socket.emit('user_rejected');
        }

        console.log(this.users);
      }) */
    })
  }
}

const server = new Server(PORT);

server.app.get('/options', (request, response) => {
  let data = ''
  if (fs.existsSync('public/options.txt')) {
    data = fs.readFileSync('public/options.txt', 'utf-8')
  }
  response.send(data)
})

server.app.post('/options', (request, response) => {
  const data = request.body
  fs.writeFileSync('public/options.txt', data)
  response.end()
})

server.app.get('/exists/:path', (req, res) => {
  const base = 'public/'
  const { path } = req.params
  const exists = fs.existsSync(base + path)

  const resData = {
    path: path,
    exists: exists
  }

  res.send(resData)
})

server.app.post('/utils/createfile', (req, res) => {
  const base = 'public/'
  const path = req.body.path
  const data = req.body.data
  fs.writeFileSync(base + path, req.body.data + '')
  res.send(req.body)
})

server.app.get('/utils/receive/:path', (req, res) => {
  const base = 'public/'
  const { path } = req.params

  res.send({
    path: path,
    data: fs.readFileSync(base + path)
  })
})

server.app.post('/user', (request, response) => {
  const data = request.body

  const usernm = data.username;
  const pass = data.password;
  const uuid = uuidv5(usernm ?? 'unknown', '716fa44c-d32f-43c8-8391-94e862fdad99')

  if((server.users.has(uuid) && server.users.get(uuid)?.username === usernm && server.users.get(uuid)?.password === pass) || !server.users.has(uuid)) {
    if(!server.users.has(uuid)) {
      server.users.set(uuid, {
        username: usernm,
        password: pass,
        uuid: uuid
      })
    }
    response.send({ accepted: true, uuid: uuid });
  } else if(true) {
    response.send({ accepted: false });
  }

  console.log(server.users);
})