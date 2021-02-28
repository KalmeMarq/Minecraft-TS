import GameOption from '@mcsrc/GameOption';
import GameSettings from '@mcsrc/GameSettings';
import Util from '@mcsrc/util/Util';
import Button from '../widgets/button/Button';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class ChatOptionsScreen extends SettingsScreen {
  private SCREEN_OPTIONS: GameOption[] = [
    GameOption.CHAT_VISIBILITY,
    GameOption.CHAT_COLOR,
    GameOption.CHAT_LINKS,
    GameOption.CHAT_LINKS_PROMPT,
    GameOption.CHAT_OPACITY,
    GameOption.ACCESSIBILITY_TEXT_BACKGROUND_OPACITY,
    GameOption.CHAT_SCALE,
    GameOption.LINE_SPACING,
    GameOption.DELAY_INSTANT,
    GameOption.CHAT_WIDTH,
    GameOption.CHAT_HEIGHT_FOCUSED,
    GameOption.CHAT_HEIGHT_UNFOCUSED,
    GameOption.NARRATOR,
    GameOption.AUTO_SUGGEST_COMMANDS,
    GameOption.HIDE_MATCHED_NAMES,
    GameOption.REDUCED_DEBUG_INFO
  ];
  
  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.chat.title'))
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + 24 * (index >> 1);
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