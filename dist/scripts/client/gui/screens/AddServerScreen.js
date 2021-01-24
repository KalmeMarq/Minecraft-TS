import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import TextFieldWidget from '../widgets/TextFieldWidget.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
export default class AddServerScreen extends ScreenP {
    constructor(parentScreen) {
        super();
        this.textServerAdress = '';
        this.field_243290_a = new TranslationTextComponent("addServer.enterName").get();
        this.field_243291_b = new TranslationTextComponent("addServer.enterIp").get();
        this.parentScreen = parentScreen;
    }
    init() {
        this.buttonAddServer = this.addButton(new Button(this.width / 2 - 100, this.height / 4 + 96 + 18, 200, 20, new TranslationTextComponent("addServer.add").get(), () => {
            const serverIp = this.textFieldServerAddress.getText();
            const serverName = this.textFieldServerName.getText();
            let mc = this.minecraft;
            let prevScreen = this.parentScreen;
            if (serverIp !== '') {
                async function getServerData() {
                    let serversList = JSON.parse(localStorage.getItem('ServersList'));
                    const req = await fetch(`https://api.mcsrvstat.us/2/${serverIp}`);
                    const data = await req.json();
                    if (serversList.findIndex((serv) => serv.ip === data.ip) === -1) {
                        serversList.push({ customName: `<span>${serverName}</span>`, data: data });
                        localStorage.setItem('ServersList', JSON.stringify(serversList));
                    }
                    mc.displayGuiScreen(prevScreen);
                }
                getServerData();
            }
        }));
        this.addButton(new Button(this.width / 2 - 100, this.height / 4 + (120 + 18), 200, 20, new TranslationTextComponent('gui.cancel').get(), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
        this.buttonAddServer.active(false);
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.parentScreen);
    }
    func_228180_b_() {
        if (this.textFieldServerAddress.getText() !== '') {
            this.buttonAddServer.active(true);
        }
        else {
            this.buttonAddServer.active(false);
        }
    }
    render() {
        this.textFieldServerAddress = new TextFieldWidget(this.width / 2 - 100, 106, 200, 20, '');
        this.textFieldServerName = new TextFieldWidget(this.width / 2 - 100, 66, 200, 20, '');
        this.textFieldServerAddress.render().addEventListener('input', () => {
            this.func_228180_b_();
        });
        this.textFieldServerName.render().addEventListener('input', () => {
            this.func_228180_b_();
        });
        let title = new TranslationTextComponent("addServer.title").get();
        ScreenP.drawCenteredString(this.root, title, this.width / 2, 16, 16777215);
        ScreenP.drawString(this.root, this.field_243290_a, this.width / 2 - 100, 53, 16777215);
        ScreenP.drawString(this.root, this.field_243291_b, this.width / 2 - 100, 94, 16777215);
        this.renderDirtBackground();
    }
}
