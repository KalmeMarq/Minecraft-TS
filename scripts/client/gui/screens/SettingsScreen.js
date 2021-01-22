import Screen from './Screen.js';

class SettingsScreen extends Screen {
  constructor(previousScreen, gameSettingsObj) {
     super();
     this.parentScreen = previousScreen;
     this.gameSettings = gameSettingsObj;
  }

  onClose() {
     this.minecraft.gameSettings.saveOptions();
  }

  closeScreen() {
     this.minecraft.displayGuiScreen(this.parentScreen);
  }
}

export default SettingsScreen;