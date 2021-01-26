import TranslationTextComponent from "../../../util/TranslationText.js";
import Button from "../widgets/button/Button.js";
import ScreenP from "./ScreenP.js";
export default class WorldSelectionScreen extends ScreenP {
    constructor(parentScreen) {
        super();
        this.parentScreen = parentScreen;
        this.deleteButton;
        this.selectButton;
        this.renameButton;
        this.copyButton;
        this.flag = false;
    }
    init() {
        this.addButton(new Button(this.width / 2 - 75, this.height / 2 - 20, 150, 20, new TranslationTextComponent("Simulate Select").get(), () => {
            this.flag = true;
            this.V();
        }));
        this.addButton(new Button(this.width / 2 - 75, this.height / 2 + 4, 150, 20, new TranslationTextComponent("Simulate Deselect").get(), () => {
            this.flag = false;
            this.V();
        }));
        this.selectButton = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 150, 20, new TranslationTextComponent("selectWorld.select").get(), () => {
            return false;
        }));
        this.addButton(new Button(this.width / 2 + 4, this.height - 52, 150, 20, new TranslationTextComponent("selectWorld.create").get(), () => {
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
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
        this.V();
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.parentScreen);
    }
    V() {
        this.selectButton.setActive(this.flag);
        this.renameButton.setActive(this.flag);
        this.deleteButton.setActive(this.flag);
        this.copyButton.setActive(this.flag);
    }
    render() {
        this.renderDirtBackground();
    }
}
