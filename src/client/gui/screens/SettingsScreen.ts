import ScreenP from './ScreenP.js';

class SettingsScreen extends ScreenP {
  public parentScreen

  constructor(previousScreen: ScreenP) {
     super();
     this.parentScreen = previousScreen;
  }

  onClose() {
    //  this.minecraft.gameSettings.saveOptions();
  }

  closeScreen() {
     this.minecraft.displayGuiScreen(this.parentScreen);
  }
}

export default SettingsScreen;