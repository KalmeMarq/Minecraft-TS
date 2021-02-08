import GameSettings from "../../GameSettings.js";
import GameOption from "../../GameOption.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";

export default class VideoSettingsScreen extends SettingsScreen {
  private SCREEN_OPTIONS: any[] = [
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
  
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.videoTitle"))
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + (index >> 1) * 24;
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, getKeyTranslation("gui.done"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 5, 16777215);
  }
}