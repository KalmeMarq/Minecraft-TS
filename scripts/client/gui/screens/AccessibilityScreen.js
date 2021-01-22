import Button from '../widgets/button.js';
import SettingsScreen from './SettingsScreen.js';

export default class AccessibilitySettingsScreen extends SettingsScreen {
  initCont() {
    this.addButton(new Button(this.width / 2 - 100 * 2.5, this.height - 27 * 2.5, 200, 20, "gui.done", () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
      console.log(this.parentScreen)
   }));
  }
}