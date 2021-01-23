import Screen from './ScreenP.js';

class SettingsScreen extends Screen {
  public parentScreen
  public gameSettings

  constructor(previousScreen: Screen, gameSettingsObj: any) {
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