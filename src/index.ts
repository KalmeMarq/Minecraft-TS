import GameConfiguration from './GameConfiguration';
import Minecraft from './Minecraft'
import { getAllResources } from './util/Resources';
import './util/String';
import Util from './util/Util';

(async() => {
  await getAllResources();

  const gameconfigs = new GameConfiguration(
    new GameConfiguration.UserInformation('KalmeMarq'),
    new GameConfiguration.GameInformation(false, '1.42.0', 'release', false, false)
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



