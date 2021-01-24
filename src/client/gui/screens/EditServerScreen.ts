import Button from '../widgets/Button.js';
import ScreenP from './ScreenP.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
import TextFieldWidget from '../widgets/TextFieldWidget.js';

export default class EditServerScreen extends ScreenP {
  public prevScreen
  public serverToEdit
  public textFieldServerAddress: TextFieldWidget | any;
  public textFieldServerName: TextFieldWidget | any;

  constructor(prevScreen: ScreenP, serverToEdit: any) {
    super();
    this.prevScreen = prevScreen;
    this.serverToEdit = serverToEdit;
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 100, this.height / 2 - 50, 200, 20, new TranslationTextComponent("gui.back").get(), () => {
      this.minecraft.displayGuiScreen(this.prevScreen);
   }));

    console.log(this.serverToEdit);
  }

  public render(): void {
    this.textFieldServerAddress = new TextFieldWidget(this.width / 2 - 100, 106, 200, 20, '');
    this.textFieldServerName = new TextFieldWidget(this.width / 2 - 100, 66, 200, 20, '');
    const a = this.textFieldServerAddress.render()
    const b = this.textFieldServerName.render()
    a.value = this.serverToEdit.data.hostname;
    b.value = this.serverToEdit.customName !== '<span></span>' ? this.serverToEdit.customName : this.serverToEdit.data.motd.clean[0].trim();

    ScreenP.drawCenteredString(this.root, 'Edit', this.width / 2, 20, 16777215);
    this.renderDirtBackground();
  }
}