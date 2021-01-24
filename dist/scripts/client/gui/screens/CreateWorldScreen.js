import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
export default class WorldSelectionScreen extends ScreenP {
    constructor(screenIn) {
        super();
        this.prevScreen = screenIn;
    }
    init() {
        this.setTitle(new TranslationTextComponent("selectWorld.create").get());
        this.addButton(new Button(this.width / 2 + 82, this.height - 28, 72, 20, new TranslationTextComponent("gui.cancel").get(), () => {
            this.minecraft.displayGuiScreen(this.prevScreen);
        }));
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.prevScreen);
    }
    render() {
        ScreenP.drawCenteredString(this.root, this.title, this.width / 2, 8, 16777215);
        this.renderDirtBackground();
    }
}
