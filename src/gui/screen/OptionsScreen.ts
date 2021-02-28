import GameOption from "@mcsrc/GameOption";
import GameSettings from "@mcsrc/GameSettings";
import AbstractOption from "@mcsrc/settings/AbstractOption";
import Util from "@mcsrc/util/Util";
import { settings } from "cluster";
import { constructor } from "path";
import DialogTexts from "../DialogTexts";
import Button from "../widgets/button/Button";
import OptionButton from "../widgets/button/OptionButton";
import AccessibilityScreen from "./AccessibilityScreen";
import ChatOptionsScreen from "./ChatOptionsScreen";
import ControlsScreen from "./ControlsScreen";
import CustomizeSkinScreen from "./CustomizeSkinScreen";
import DebugSettingsScreen from "./DebugSettings";
import GuiScreen from "./GuiScreen";
import LanguageScreen from "./LanguageScreen";
import OptionsSoundsScreen from "./OptionsSoundsScreen";
import PackScreen from "./PackScreen";
import VideoSettingsScreen from "./VideoSettingsScreen";

export default class OptionsScreen extends GuiScreen {
  private static SCREEN_OPTIONS: AbstractOption[] = [GameOption.FOV];
  public parentScreen: GuiScreen;
  private settings: GameSettings;

  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(Util.getTranslation('options.title'));
    this.parentScreen = parentScreen;
    this.settings = gameSettingsObj;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
  
  protected init(): void {
    let i = 0;

    for(let abstractoption of OptionsScreen.SCREEN_OPTIONS) {
       let j = this.width / 2 - 155 + i % 2 * 160;
       let k = this.height / 6 - 12 + 24 * (i >> 1);
       this.addButton(abstractoption.createWidget(this.minecraft.gameSettings, j, k, 150));
       ++i;
    }

    const baseY = this.height / 6 - 6;
    const baseX0 = this.width / 2 - 155;
    const baseX1 = baseX0 + 160;

    if(this.minecraft.world == null) {
      this.addButton(new OptionButton(this.width / 2 - 155 + i % 2 * 160, this.height / 6 - 12 + 24 * (i >> 1), 150, 20, GameOption.REALMS_NOTIFICATIONS, GameOption.REALMS_NOTIFICATIONS.getName(this.settings), (button) => {
        GameOption.REALMS_NOTIFICATIONS.nextValue(this.settings);
        this.settings.saveOptions();
        button.setMessage(GameOption.REALMS_NOTIFICATIONS.getName(this.settings));
      }));
    }

    this.addButton(new Button(baseX0, baseY + 24, 150, 20, Util.getTranslation('Debug'), () => {
      this.minecraft.displayGuiScreen(new DebugSettingsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX0, baseY + 48, 150, 20, Util.getTranslation('options.skinCustomisation'), () => {
      this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX1, baseY + 48, 150, 20, Util.getTranslation('options.sounds'), () => {
      this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX0, baseY + 72, 150, 20, Util.getTranslation('options.video'), () => {
      this.minecraft.displayGuiScreen(new VideoSettingsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX1, baseY + 72, 150, 20, Util.getTranslation('options.controls'), () => {
      this.minecraft.displayGuiScreen(new ControlsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX0, baseY + 96, 150, 20, Util.getTranslation('options.language'), () => {
      this.minecraft.displayGuiScreen(new LanguageScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX1, baseY + 96, 150, 20, Util.getTranslation('options.chat.title'), () => {
      this.minecraft.displayGuiScreen(new ChatOptionsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX0, baseY + 120, 150, 20, Util.getTranslation('options.resourcepack'), () => {
      // this.minecraft.displayGuiScreen(new PackScreen(this, Util.getTranslation('resourcePack.title')));
      this.minecraft.testSwitchLang();
    }));

    this.addButton(new Button(baseX1, baseY + 120, 150, 20, Util.getTranslation('options.accessibility.title'), () => {
      this.minecraft.displayGuiScreen(new AccessibilityScreen(this, this.settings));
    }));

    this.addButton(new Button(this.width / 2 - 100, baseY + 174, 200, 20, DialogTexts.GUI_DONE, () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 15, 16777215);
    super.render(context, mouseX, mouseY, partialTicks)
  }
}