import Button from '../widgets/Button.js';
import ScreenP from './ScreenP.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
export default class NotJoinServerScreen extends ScreenP {
    constructor(prevScreen) {
        super();
        this.prevScreen = prevScreen;
    }
    init() {
        this.addButton(new Button(this.width / 2 - 100, this.height / 2 - 50, 200, 20, new TranslationTextComponent("gui.back").get(), () => {
            this.minecraft.displayGuiScreen(this.prevScreen);
        }));
    }
    render() {
        ScreenP.drawCenteredString(this.root, 'Haha nope XD', this.width / 2, this.height / 2 - 100, 16777215);
        this.renderDirtBackground();
    }
}
