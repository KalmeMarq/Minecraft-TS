import GameConfiguration from "./GameConfiguration.js";
import Minecraft from "./Minecraft.js";
import { getAllResources } from "./utils/Resources.js";
import './utils/String';

if(localStorage.getItem('GameSettings')) localStorage.removeItem('GameSettings');
if(localStorage.getItem('Resources')) localStorage.removeItem('Resources');
if(localStorage.getItem('prevScreen')) localStorage.removeItem('prevScreen');

export default class Main {
  public static async main(): Promise<void> {
    await getAllResources();
    await getAllResources();
    await getAllResources();

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