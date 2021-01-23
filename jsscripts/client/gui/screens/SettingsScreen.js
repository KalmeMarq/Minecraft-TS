import Screen from './ScreenP.js';
class SettingsScreen extends Screen {
    constructor(previousScreen, gameSettingsObj) {
        super();
        this.parentScreen = previousScreen;
        this.gameSettings = gameSettingsObj;
    }
    onClose() {
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.parentScreen);
    }
}
export default SettingsScreen;
