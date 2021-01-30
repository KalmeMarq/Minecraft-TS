import AbstractOption from "../../GameOption.js";
import GameSettings from "../../GameSettings.js";
import TranslationTextComponent from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import AccessibilityScreen from "./AccessibilityScreen.js";
import ChatOptionsScreen from "./ChatOptionsScreen.js";
import ControlsScreen from "./ControlsScreen.js";
import CustomizeSkinScreen from "./CustomizeSkinScreen.js";
import LanguageScreen from "./LanguageScreen.js";
import OptionsSoundsScreen from "./OptionsSoundsScreen.js";
import Screen from "./Screen.js";
import VideoSettingsScreen from "./VideoSettingsScreen.js";

export default class OptionsScreen extends Screen {
  private SCREEN_OPTIONS: AbstractOption[] = [AbstractOption.TestOption, AbstractOption.ShowFPSOption];
  public parentScreen;
  private settings: GameSettings;

  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(new TranslationTextComponent("options.title").get());
    this.parentScreen = parentScreen;
    this.settings = gameSettingsObj;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
  
  protected init(): void {
    let i = 0;
    
    for (const iterator of this.SCREEN_OPTIONS) {
      let j = this.width / 2 - 155 + (i % 2) * 160;
      let k = this.height / 6 - 12 + 24 * (i >> 1);
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, j, k, 150));
      i++;
    }

    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.skinCustomisation").get(), () => {
      this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.sounds").get(), () => {
        this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 72 - 6, 150, 20, new TranslationTextComponent("options.video").get(), () => {
        this.minecraft.displayGuiScreen(new VideoSettingsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 72 - 6, 150, 20, new TranslationTextComponent("options.controls").get(), () => {
        this.minecraft.displayGuiScreen(new ControlsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 96 - 6, 150, 20, new TranslationTextComponent("options.language").get(), () => {
        this.minecraft.displayGuiScreen(new LanguageScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 96 - 6, 150, 20, new TranslationTextComponent("options.chat.title").get(), () => {
        this.minecraft.displayGuiScreen(new ChatOptionsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.resourcepack").get(), () => {
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.accessibility.title").get(), () => {
        this.minecraft.displayGuiScreen(new AccessibilityScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    this.renderDirtBackground(context);
    this.drawCenteredString(context, this.title, this.width / 2, 15, 16777215);
  }
}