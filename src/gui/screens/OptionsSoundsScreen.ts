import GameSettings from "../../GameSettings.js";
import GameOption from "../../GameOption.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";
import SoundCategory from "../../utils/SoundCategory.js";
import SoundSlider from "../widgets/SoundSlider.js";

export default class OptionsSoundsScreen extends SettingsScreen {
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.sounds.title"))
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

/*     for(var i = 0; i < Object.keys(SoundCategory).length; i++) {
      const soundcategory = Object.keys(SoundCategory)[i];
      if(soundcategory !== 'MASTER') {
        this.addButton(new SoundSlider(this.minecraft, this.width / 2 - 155 + index % 2 * 160, this.height / 6 - 12 + 24 * (index >> 1), soundcategory, 150));
        ++index;
      }
    } */


    const basePosX = this.width / 2 - 75;
    const basePosY = this.height / 6 - 12;
    index++;
    this.addButton(new OptionButton(basePosX, basePosY + 24 * (index >> 1), 150, 20, GameOption.SHOW_SUBTITLES, GameOption.SHOW_SUBTITLES.getName(this.gameSettings), () => {
      GameOption.SHOW_SUBTITLES.nextValue(this.minecraft.gameSettings);
      this.minecraft.gameSettings.saveOptions();
    }));

    this.addButton(new Button(basePosX - 25, basePosY + 180, 200, 20, getKeyTranslation("gui.done"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 15, 16777215);
  }
}