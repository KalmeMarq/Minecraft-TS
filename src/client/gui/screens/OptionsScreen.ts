import TranslationTextComponent from "../../../util/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Widget from "../widgets/Widget.js";
import ScreenP from "./ScreenP.js";

export default class OptionsScreen extends ScreenP {
  public parentScreen;
  private resourcePackBtn: Button | any

  constructor(parentScreen: ScreenP) {
    super();
    this.parentScreen = parentScreen;
  }

  init() {
    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.skinCustomisation").get(), () => {
      // this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this));
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 48 - 6, 150, 20, new TranslationTextComponent("options.sounds").get(), () => {
        // this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this));
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
        // this.minecraft.displayGuiScreen(new ChatOptionsScreen(this));
    }));
    this.resourcePackBtn = this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.resourcepack").get(), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.accessibility.title").get(), () => {
        // this.minecraft.displayGuiScreen(new AccessibilityScreen(this));
    }));
    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    this.resourcePackBtn.setActive(false);
  }

  render() {
    this.renderDirtBackground();
  }
}