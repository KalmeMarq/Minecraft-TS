import Button from '../widgets/button.js';
import SettingsScreen from './SettingsScreen.js';

export default class AccessibilitySettingsScreen extends SettingsScreen {
  
  init() {
    
    this.addButton(new Button(this.width / 2 - 100 * 2.55, this.height - 27 * 2.55, 200, 20, "gui.done", () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
   }));
  }
}