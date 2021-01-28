import TranslationTextComponent from "../../utils/TranslationText";
import Button from "../widgets/button/Button";
import AccessibilityScreen from "./Accessibility";
import ScreenP from "./ScreenP";

export default class OptionsScreen extends ScreenP {
  public parentScreen;

  constructor(parentScreen: ScreenP) {
    super();
    this.parentScreen = parentScreen;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
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
    // this.resourcePackBtn = this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.resourcepack").get(), () => {
    //   return false;
    // }));
    this.addButton(new Button(this.width / 2 + 5, this.height / 6 + 120 - 6, 150, 20, new TranslationTextComponent("options.accessibility.title").get(), () => {
        this.minecraft.displayGuiScreen(new AccessibilityScreen(this));
    }));
    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    this.renderDirtBackground(context);
  }
}