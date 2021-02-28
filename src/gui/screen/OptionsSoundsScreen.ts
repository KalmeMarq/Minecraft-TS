import SoundCategory from '@mcsrc/util/SoundCategory';
import Util from '@mcsrc/util/Util';
import GameSettings from '../../GameSettings';
import Button from '../widgets/button/Button';
import SoundSlider from '../widgets/SoundSlider';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class OptionsSoundsScreen extends SettingsScreen {
  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.sounds.title'))
  }

  protected init(): void {
    let index = 0;
    this.addButton(new SoundSlider(this.minecraft, this.width / 2 - 155 + index % (2 * 160), this.height / 6 - 12 + 24 * (index >> 1), SoundCategory.MASTER, 310));
    index = index + 2;
    
    for (let i = 0; i < Object.values(SoundCategory).length; i++) {
      if(i !== 0 && i !== Object.values(SoundCategory).length - 1) {
        const soundcategory: any = Object.values(SoundCategory)[i];
        this.addButton(new SoundSlider(this.minecraft, this.width / 2 - 155 + index % 2 * 160, this.height / 6 - 12 + 24 * (index >> 1), soundcategory, 150));
        ++index;
      }
    }

    index++;
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