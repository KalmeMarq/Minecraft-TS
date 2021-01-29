import GameSettings from "../../GameSettings.js";
import ScreenP from "./ScreenP.js";

export default class SettingsScreen extends ScreenP {
  protected parentScreen: ScreenP;
  protected gameSettings: GameSettings;

  constructor(previousScreen: ScreenP, gameSettingsObj: GameSettings) {
    super();
    this.parentScreen = previousScreen;
    this.gameSettings = gameSettingsObj;
  }

  public onClose(): void {
    this.minecraft.gameSettings.saveOptions();
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    this.renderDirtBackground(context);
  }
}