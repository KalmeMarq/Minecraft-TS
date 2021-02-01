import GameSettings from "../../GameSettings";
import Screen from "./Screen";

export default class SettingsScreen extends Screen {
  protected parentScreen: Screen;
  protected gameSettings: GameSettings;

  constructor(previousScreen: Screen, gameSettingsObj: GameSettings, title: string) {
    super(title);
    this.parentScreen = previousScreen;
    this.gameSettings = gameSettingsObj;
  }

  public onClose(): void {
    this.minecraft.gameSettings.saveOptions();
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context);
  }
}