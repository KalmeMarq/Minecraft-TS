import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import TextFieldWidget from '../widgets/TextFieldWidget.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
import CreateWorldScreen from './CreateWorldScreen.js';
export default class WorldSelectionScreen extends ScreenP {
    constructor(screenIn) {
        super();
        this.prevScreen = screenIn;
        this.deleteButton;
        this.selectButton;
        this.renameButton;
        this.copyButton;
    }
    init() {
        this.setTitle(new TranslationTextComponent("selectWorld.title").get());
        this.addButton(new Button(this.width / 2 - 75, this.height / 2 - 20, 150, 20, new TranslationTextComponent("Simulate Select").get(), () => {
            this.V(true);
        }));
        this.addButton(new Button(this.width / 2 - 75, this.height / 2 + 4, 150, 20, new TranslationTextComponent("Simulate Deselect").get(), () => {
            this.V(false);
        }));
        this.selectButton = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 150, 20, new TranslationTextComponent("selectWorld.select").get(), () => {
            return false;
        }));
        this.addButton(new Button(this.width / 2 + 4, this.height - 52, 150, 20, new TranslationTextComponent("selectWorld.create").get(), () => {
            this.minecraft.displayGuiScreen(new CreateWorldScreen(this));
        }));
        this.renameButton = this.addButton(new Button(this.width / 2 - 154, this.height - 28, 72, 20, new TranslationTextComponent("selectWorld.edit").get(), () => {
            return false;
        }));
        this.deleteButton = this.addButton(new Button(this.width / 2 - 76, this.height - 28, 72, 20, new TranslationTextComponent("selectWorld.delete").get(), () => {
            return false;
        }));
        this.copyButton = this.addButton(new Button(this.width / 2 + 4, this.height - 28, 72, 20, new TranslationTextComponent("selectWorld.recreate").get(), () => {
            return false;
        }));
        this.addButton(new Button(this.width / 2 + 82, this.height - 28, 72, 20, new TranslationTextComponent("gui.cancel").get(), () => {
            this.minecraft.displayGuiScreen(this.prevScreen);
        }));
        this.V(false);
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.prevScreen);
    }
    V(activeBoolean) {
        this.selectButton.active(activeBoolean);
        this.renameButton.active(activeBoolean);
        this.deleteButton.active(activeBoolean);
        this.copyButton.active(activeBoolean);
    }
    render() {
        this.searchField = new TextFieldWidget(this.width / 2 - 100, 22, 200, 20, '').render();
        ScreenP.drawCenteredString(this.root, this.title, this.width / 2, 8, 16777215);
        this.renderDirtBackground();
    }
}
