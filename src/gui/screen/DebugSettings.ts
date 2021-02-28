import GameOption from "@mcsrc/GameOption";
import GameSettings from "@mcsrc/GameSettings";
import Util from "@mcsrc/util/Util";
import Button from "../widgets/button/Button";
import GuiScreen from "./GuiScreen";
import SettingsScreen from "./SettingsScreen";

export default class DebugSettingsScreen extends SettingsScreen {
  private SCREEN_OPTIONS: any[] = [
    GameOption.SHOW_FPS,
    GameOption.ADVANCED_TOOLTIPS,
    GameOption.HELD_TOOLTIPS,
    GameOption.HIDE_GUI,
    GameOption.POINT_OF_VIEW,
    GameOption.SNOOPER,
    GameOption.SKIP_MULTIPLAYER_WARNING
  ];
  
  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('Debug'))
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + (index >> 1) * 24;
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 20, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}