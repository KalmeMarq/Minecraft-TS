import Util from '@km.mcts/util/Util';
import GameSettings from '../../GameSettings';
import Button from '../widgets/button/Button';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class OptionsSoundsScreen extends SettingsScreen {
  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.sounds.title'))
  }

  protected init(): void {
    const basePosX = this.width / 2 - 75;
    const basePosY = this.height / 6 - 12;

    this.addButton(new Button(basePosX - 25, basePosY + 180, 200, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 15, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}