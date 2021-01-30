import GameConfiguration from "./GameConfiguration.js";
import Minecraft from "./Minecraft.js";
import { getResources, IResources } from "./utils/GetResources.js";

export var Resources: IResources;
class Main {
  public static async main(): Promise<void> {
    (<HTMLCanvasElement>document.getElementById('root')).getContext('2d')!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    Resources = (await getResources() as any);
    console.log(Resources);

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

Main.main();


