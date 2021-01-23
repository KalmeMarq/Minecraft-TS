import ScreenP from './ScreenP.js';

class SettingsScreen extends ScreenP {
  public parentScreen
  public gameSettings

  constructor(previousScreen: ScreenP, gameSettingsObj: any) {
     super();
     this.parentScreen = previousScreen;
     this.gameSettings = gameSettingsObj;
  }

  onClose() {
    //  this.minecraft.gameSettings.saveOptions();
  }

  closeScreen() {
     this.minecraft.displayGuiScreen(this.parentScreen);
  }
}

export default SettingsScreen;