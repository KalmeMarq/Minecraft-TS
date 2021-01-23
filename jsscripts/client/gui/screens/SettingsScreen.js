import ScreenP from './ScreenP.js';
class SettingsScreen extends ScreenP {
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
