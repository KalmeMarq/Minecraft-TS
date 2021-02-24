import GameOption from '@km.mcts/GameOption';
import AbstractOption from '@km.mcts/settings/AbstractOption';
import Util from '@km.mcts/util/Util';
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
    this.optionsRowList = new TestList(this.minecraft, this.width, this.height, 32, this.height - 32, 25);
    this.optionsRowList.addOptions(this.OPTIONS);
    this.children.push(this.optionsRowList);

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.optionsRowList.render(context, mouseX, mouseY, partialTicks);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 5, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}