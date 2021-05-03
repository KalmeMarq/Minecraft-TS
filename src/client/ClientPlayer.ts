import io from 'socket.io-client'
import Player from "../world/player/Player";

export default class ClientPlayer extends Player {
  public socketIO: SocketIOClient.Socket;

  public constructor() {
    super();

    this.socketIO = io('http://localhost:8000', {
      transports: [ 'websocket' ],
      upgrade: false
    });

    this.socketIO.on('connect', () => {
    })
  }
}