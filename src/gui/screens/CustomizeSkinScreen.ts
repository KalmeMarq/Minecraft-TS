import GameOption from "../../GameOption.js";
import GameSettings from "../../GameSettings.js";
import AbstractOption from "../../settings/AbstractOption.js";
import PlayerModelPart from "../../settings/PlayerModelPart.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";

export default class CustomizeSkinScreen extends SettingsScreen {
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.skinCustomisation.title"))
  }

  protected init(): void {
    let index = 0;

    for(const playermodelpart of Object.values(PlayerModelPart)) {
      this.addButton(new Button(this.width / 2 - 155 + index % 2 * 160, this.height / 6 + 24 * (index >> 1), 150, 20, this.func_238655_a_(playermodelpart), () => {
         this.gameSettings.switchModelPartEnabled(playermodelpart);
      }));
      ++index;
    }

    this.addButton(new OptionButton(this.width / 2 - 155 + index % 2 * 160, this.height / 6 + 24 * (index >> 1), 150, 20, GameOption.MAIN_HAND, GameOption.MAIN_HAND.getName(this.gameSettings), () => {
      GameOption.MAIN_HAND.setValueIndex(this.gameSettings, 1);
      this.gameSettings.saveOptions();
    }));

    ++index;
    if(index % 2 == 1) ++index;

    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 24 * (index >> 1), 200, 20, getKeyTranslation("gui.done"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
  }

  private func_238655_a_(p_238655_1_: PlayerModelPart) {
    return `${getKeyTranslation(p_238655_1_.getName())}: ${getKeyTranslation(this.gameSettings.getModelParts().has(p_238655_1_) ? 'options.on' : 'options.off')}`;
  }
}