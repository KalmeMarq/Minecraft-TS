import AbstractOption from "../../GameOption.js";
import GameSettings from "../../GameSettings.js";
import TranslationTextComponent from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import AccessibilityScreen from "./AccessibilityScreen.js";
import ChatOptionsScreen from "./ChatOptionsScreen.js";
import OptionsSoundsScreen from "./OptionsSoundsScreen.js";
import ScreenP from "./ScreenP.js";

export default class OptionsScreen extends ScreenP {
  private SCREEN_OPTIONS: AbstractOption[] = new Array();
  public parentScreen;
  private settings: GameSettings;

  constructor(parentScreen: ScreenP, gameSettingsObj: GameSettings) {
    super();
    this.parentScreen = parentScreen;
    this.settings = gameSettingsObj;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
  
  init() {
    let i = 0;
   
    this.addButton(new OptionButton(this.width / 2 - 155, this.height / 6 - 12 - 6, 150, 20, 0, AbstractOption.TestOption.func_238152_c_(this.settings), () => {
      AbstractOption.TestOption.nextValue(this.settings);
      this.settings.saveOptions();
    }));

    this.addButton(new OptionButton(this.width / 2 + 5, this.height / 6 - 12 - 6, 150, 20, 0, AbstractOption.ShowFPSOption.func_238152_c_(this.settings), () => {
      AbstractOption.ShowFPSOption.nextValue(this.settings);
      this.settings.saveOptions();
    }));

    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.skinCustomisation").get(), () => {
      // this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this));
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.sounds").get(), () => {
        this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 72 - 6, 150, 20, new TranslationTextComponent("options.video").get(), () => {
        // this.minecraft.displayGuiScreen(new VideoSettingsScreen(this));
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 72 - 6, 150, 20, new TranslationTextComponent("options.controls").get(), () => {
        // this.minecraft.displayGuiScreen(new ControlsScreen(this));
    }));
    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 96 - 6, 150, 20, new TranslationTextComponent("options.language").get(), () => {
        // this.minecraft.displayGuiScreen(new LanguageScreen(this));
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
  }
}