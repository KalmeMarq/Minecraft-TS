import GameSettings from "@mcsrc/GameSettings";
import GuiScreen from "./GuiScreen";

export default class SettingsScreen extends GuiScreen {
  protected parentScreen: GuiScreen;
  protected gameSettings: GameSettings;

  constructor(previousScreen: GuiScreen, gameSettingsObj: GameSettings, title: string) {
    super(title);
    this.parentScreen = previousScreen;
    this.gameSettings = gameSettingsObj;
  }

  public onClose(): void {
    // this.minecraft.gameSettings.saveOptions();
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
}