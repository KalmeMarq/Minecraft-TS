import GameConfiguration from '@mcsrc/GameConfiguration';
import Minecraft from './Minecraft'
import ResourceLocation from './new/ResourceLocation';
import TextureManager from './new/TextureManager';
import './util/String';
import Util from './util/Util';

(async() => {
  const gameconfigs = new GameConfiguration(
    new GameConfiguration.UserInformation('KalmeMarq'),
    new GameConfiguration.GameInformation(false, '1.17.0', 'release', false, false)
  );
  let minecraft: Minecraft;
  try {
    minecraft = new Minecraft(gameconfigs);
    Util.createLog('Minecraft Initialized!');

    minecraft.run()
  } catch(e) {
    Util.createLog(
      'Couldn\'t Initialize Minecraft!',
      '\n\nMore Details:',
      `\n\t${e}`
    );
  }
})()