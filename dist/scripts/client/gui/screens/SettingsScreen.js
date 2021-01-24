import ScreenP from './ScreenP.js';
class SettingsScreen extends ScreenP {
    constructor(previousScreen) {
        super();
        this.parentScreen = previousScreen;
    }
    onClose() {
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.parentScreen);
    }
}
export default SettingsScreen;
