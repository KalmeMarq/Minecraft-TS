import GameOption from '@mcsrc/GameOption';
import AbstractOption from '@mcsrc/settings/AbstractOption';
import Util from '@mcsrc/util/Util';
import GameSettings from '../../GameSettings';
import Button from '../widgets/button/Button';
import TestList from '../widgets/list/TestList';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class VideoSettingsScreen extends SettingsScreen {
  private OPTIONS: AbstractOption[] = [
    GameOption.GRAPHICS_FANCINESS,
    GameOption.RENDER_DISTANCE,
    GameOption.AO,
    GameOption.FRAMERATE_LIMIT,
    GameOption.VSYNC,
    GameOption.VIEW_BOBBING,
    GameOption.GUI_SCALE,
    GameOption.ATTACK_INDICATOR,
    GameOption.GAMMA,
    GameOption.RENDER_CLOUDS,
    GameOption.FULLSCREEN,
    GameOption.PARTICLES,
    GameOption.MIPMAP_LEVELS,
    GameOption.ENTITY_SHADOWS,
    GameOption.SCREEN_EFFECT_SCALE_SLIDER,
    GameOption.ENTITY_DISTANCE_SCALING,
    GameOption.FOV_EFFECT_SCALE_SLIDER
  ];
  private optionsRowList!: TestList;

  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.videoTitle'))
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + 24 * (index >> 1);
      this.addButton((iterator as AbstractOption).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }

   /*  this.optionsRowList = new TestList(this.minecraft, this.width, this.height, 32, this.height - 32, 25);
    this.optionsRowList.addOptions(this.OPTIONS);
    this.children.push(this.optionsRowList);
 */
    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  // Minecraft.getInstance().updateWindowSize();

  public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    let guiScale = this.gameSettings.guiScale;

    if(super.mouseClicked(mouseX, mouseY, button)) {
      if(this.gameSettings.guiScale != guiScale) {
        this.minecraft.updateWindowSize();
      }
      return true;
    }

    return false;
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderDirtBackground(context, 0);
/*     this.optionsRowList.render(context, mouseX, mouseY, partialTicks); */
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 5, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}