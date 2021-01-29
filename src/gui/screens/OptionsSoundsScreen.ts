import AbstractOption from "../../GameOption.js";
import GameSettings from "../../GameSettings";
import TranslationTextComponent from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import ScreenP from "./ScreenP.js";
import SettingsScreen from "./SettingsScreen.js";

export default class OptionsSoundsScreen extends SettingsScreen {

  constructor(parentScreenIn: ScreenP, gameSettingsIn: GameSettings) {
    super(parentScreenIn, gameSettingsIn);
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
  
  init() {
    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }
}