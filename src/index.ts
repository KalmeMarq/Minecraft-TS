import GameConfiguration from '@mcsrc/GameConfiguration';
import Minecraft from './Minecraft'
import Session from './new/util/Session';
import './util/String';
import Util from './util/Util';

(async() => {
  const gameconfigs = new GameConfiguration(
    new GameConfiguration.UserInformation(new Session('KalmeMarq', '5c8a10baf595463ca969dd940dc42256')),
    new GameConfiguration.FolderInformation('./resources/assets/'),
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