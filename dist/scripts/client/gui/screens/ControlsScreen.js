import Button from '../widgets/Button.js';
import SettingsScreen from './SettingsScreen.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
import MouseSettingsScreen from './MouseSettingsScreen.js';
export default class ControlsScreen extends SettingsScreen {
    init() {
        this.setTitle(new TranslationTextComponent("controls.title").get());
        this.addButton(new Button(this.width / 2 - 155, 18, 150, 20, new TranslationTextComponent("options.mouse_settings").get(), () => {
            this.minecraft.displayGuiScreen(new MouseSettingsScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 155 + 160, this.height - 29, 150, 20, new TranslationTextComponent("gui.done").get(), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
    }
    render() {
        this.renderDirtBackground();
        SettingsScreen.drawCenteredString(this.root, this.title, this.width / 2, 8, 16777215);
    }
}
