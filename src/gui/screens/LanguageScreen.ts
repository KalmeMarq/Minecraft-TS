import GameOption from "../../GameOption.js";
import GameSettings from "../../GameSettings.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";

export default class LanguageScreen extends SettingsScreen {
  private warningInfo = `(${getKeyTranslation("options.languageWarning")})`;
  private forceUnicodeFontBtn!: OptionButton;
  private confirmSettingsBtn!: Button;

  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj,  getKeyTranslation("options.language"))
  }

  protected init(): void {
    this.forceUnicodeFontBtn = this.addButton(new OptionButton(this.width / 2 - 155, this.height - 38, 150, 20, GameOption.FORCE_UNICODE_FONT, GameOption.FORCE_UNICODE_FONT.getName(this.gameSettings), () => {
      GameOption.FORCE_UNICODE_FONT.nextValue(this.gameSettings);
      this.gameSettings.saveOptions();
    }));

    this.confirmSettingsBtn = this.addButton(new Button(this.width / 2 - 155 + 160, this.height - 38, 150, 20, getKeyTranslation('gui.done'), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    super.init();
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
    this.drawCenteredString(context, this.warningInfo, this.width / 2, this.height - 56, 8421504);
  }
}