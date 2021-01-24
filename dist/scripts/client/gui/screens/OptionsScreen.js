import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import VideoSettingsScreen from './VideoSettingsScreen.js';
import AccessibilityScreen from './AccessibilityScreen.js';
import ControlsScreen from './ControlsScreen.js';
import OptionsSoundsScreen from './OptionsSoundsScreen.js';
import CustomizeSkinScreen from './CustomizeSkinScreen.js';
import ChatOptionsScreen from './ChatOptionsScreen.js';
import LanguageScreen from './LanguageScreen.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
class OptionsScreen extends ScreenP {
    constructor(parentScreen) {
        super();
        this.lastScreen = parentScreen;
    }
    init() {
        this.setTitle(new TranslationTextComponent('options.title').get());
        this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.skinCustomisation").get(), () => {
            this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this));
        }));
        this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.sounds").get(), () => {
            this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 72 - 6, 150, 20, new TranslationTextComponent("options.video").get(), () => {
            this.minecraft.displayGuiScreen(new VideoSettingsScreen(this));
        }));
        this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 72 - 6, 150, 20, new TranslationTextComponent("options.controls").get(), () => {
            this.minecraft.displayGuiScreen(new ControlsScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 96 - 6, 150, 20, new TranslationTextComponent("options.language").get(), () => {
            this.minecraft.displayGuiScreen(new LanguageScreen(this));
        }));
        this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 96 - 6, 150, 20, new TranslationTextComponent("options.chat.title").get(), () => {
            this.minecraft.displayGuiScreen(new ChatOptionsScreen(this));
        }));
        this.resourcePackBtn = this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.resourcepack").get(), () => {
            return false;
        }));
        this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.accessibility.title").get(), () => {
            this.minecraft.displayGuiScreen(new AccessibilityScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
            this.minecraft.displayGuiScreen(this.lastScreen);
        }));
        this.resourcePackBtn.active(false);
    }
    render() {
        ScreenP.drawCenteredString(this.root, this.title, this.width / 2, 15, 16777215);
        this.renderDirtBackground();
    }
}
export default OptionsScreen;
