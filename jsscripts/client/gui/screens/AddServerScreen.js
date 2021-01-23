import Screen from './ScreenP.js';
import Button from '../widgets/Button.js';
import TextFieldWidget from '../widgets/TextFieldWidget.js';
import drawCenteredString from '../../../util/text/drawCenteredString.js';
import drawString from '../../../util/text/drawString.js';
import TranslationText from '../../../util/text/TranslationText.js';
export default class AddServerScreen extends Screen {
    constructor(parentScreen) {
        super();
        this.field_243290_a = TranslationText("addServer.enterName");
        this.field_243291_b = TranslationText("addServer.enterIp");
        this.parentScreen = parentScreen;
    }
    init() {
        this.addButton(new Button(this.width / 2 - 100 * 2.55, this.height / 4 + (120 + 18) * 2.55, 200, 20, TranslationText('gui.cancel'), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.parentScreen);
    }
    render() {
        this.textFieldServerAddress = new TextFieldWidget(this.width / 2 - 100 * 2.55, 66 * 2.55, 200, 20, '').render();
        this.textFieldServerName = new TextFieldWidget(this.width / 2 - 100 * 2.55, 106 * 2.55, 200, 20, '').render();
        let title = TranslationText("addServer.title");
        drawCenteredString(document.getElementById('root'), title, this.width / 2, 16, 'white');
        drawString(document.getElementById('root'), this.field_243290_a, this.width / 2 - 100 * 2.55, 53 * 2.55, 'grey');
        drawString(document.getElementById('root'), this.field_243291_b, this.width / 2 - 100 * 2.55, 94 * 2.55, 'grey');
        this.renderDirtBackground();
    }
}
