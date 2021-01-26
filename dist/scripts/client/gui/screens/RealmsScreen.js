import TranslationTextComponent from "../../../util/TranslationText.js";
import Button from "../widgets/button/Button.js";
import ScreenP from "./ScreenP.js";
export default class RealmsScreen extends ScreenP {
    constructor(parentScreen) {
        super();
        this.parentScreen = parentScreen;
    }
    init() {
        this.addButton(new Button(this.width / 2 - 100, this.height / 2, 200, 20, new TranslationTextComponent("gui.back").get(), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
    }
    render() {
    }
}
