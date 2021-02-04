import GameConfiguration from "./GameConfiguration.js";
import IMCResources from "./interfaces/IResources.js";
import Minecraft from "./Minecraft.js";
import { getAllResources, MCResources } from "./utils/Resources.js";


export default class Main {
  public static async main(): Promise<void> {
    await getAllResources();
    await getAllResources();
    await getAllResources();

    // console.log(MCResources);
    // (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!.clearRect(0, 0, document.querySelector('.window')!.clientWidth, document.querySelector('.window')!.clientHeight);

    const gameconfigs = new GameConfiguration(new GameConfiguration.UserInformation('KalmeMarq'), new GameConfiguration.GameInformation(false, '1.42.0', 'release', 'vanilla'));
    let minecraft: Minecraft;
    try {
      minecraft = new Minecraft(gameconfigs);
      console.log('Minecraft Initialized!');
    } catch(e) {
      console.log('Couldn\'t Initialize Minecraft! What a pain..');
      console.log(e);
    }
  }
}

export function shutdown() {
  window.close()
}

Main.main();