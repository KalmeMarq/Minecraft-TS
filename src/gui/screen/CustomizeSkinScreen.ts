import GameOption from '@mcsrc/GameOption';
import PlayerModelPart from '@mcsrc/settings/PlayerModelPart';
import Util from '@mcsrc/util/Util';
import GameSettings from '../../GameSettings';
import Button from '../widgets/button/Button';
import OptionButton from '../widgets/button/OptionButton';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class CustomizeSkinScreen extends SettingsScreen {
  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.skinCustomisation.title'))
  }

  protected init(): void {
    let index = 0;

    for(const playermodelpart of Object.values(PlayerModelPart)) {
      this.addButton(new Button(this.width / 2 - 155 + index % 2 * 160, this.height / 6 + 24 * (index >> 1), 150, 20, this.getOptionMessage(playermodelpart), (button) => {
         this.gameSettings.switchModelPartEnabled(playermodelpart);
         button.setMessage(this.getOptionMessage(playermodelpart))
      }));
      ++index;
    }

    this.addButton(new OptionButton(this.width / 2 - 155 + index % 2 * 160, this.height / 6 + 24 * (index >> 1), 150, 20, GameOption.MAIN_HAND, GameOption.MAIN_HAND.getName(this.gameSettings), (button) => {
      GameOption.MAIN_HAND.setValueIndex(this.gameSettings, 1);
      this.gameSettings.saveOptions();
      button.setMessage(GameOption.MAIN_HAND.getName(this.gameSettings));
    }));

    ++index;
    if(index % 2 == 1) ++index;

    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 24 * (index >> 1), 200, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 20, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }

  private getOptionMessage(p_238655_1_: PlayerModelPart) {
    return `${Util.getTranslation(p_238655_1_.getName())}: ${Util.getTranslation(this.gameSettings.getModelParts().has(p_238655_1_) ? 'options.on' : 'options.off')}`;
  }
}