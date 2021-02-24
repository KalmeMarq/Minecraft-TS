import GameSettings from "@km.mcts/GameSettings";
import Util from "@km.mcts/util/Util";
import Button from "../widgets/button/Button";
import GuiScreen from "./GuiScreen";
import SettingsScreen from "./SettingsScreen";

export default class DebugSettingsScreen extends SettingsScreen {
  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('Debug'))
  }

  protected init(): void {
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