import Minecraft from "../../Minecraft";
import { float, int } from "../../utils/MouseHelper";
import SoundCategory from "../../utils/SoundCategory";
import TranslationTextComponent, { getKeyTranslation } from "../../utils/TranslationText";
import { GameSettingsSlider } from "./GameSettingsSlider";

export default class SoundSlider extends GameSettingsSlider {
  private category: SoundCategory;

  constructor(settings: Minecraft, x: number, y: number, category: SoundCategory, width: number) {
     super(settings.gameSettings, x, y, width, 20, (settings.gameSettings.getSoundLevel(category)? Number(settings.gameSettings.getSoundLevel(category)) : 1));
     this.category = category;
     this.setSliderText();
  }

  protected setSliderText() {
    let per = String(this.sliderValue == this.getYImage(false) ? getKeyTranslation('option.off') : String((int(this.sliderValue * 100.0)) + "%"));
    this.setMessage((getKeyTranslation("soundCategory." + this.category.getName())) + ": " + (per));
  }

  protected setSaveOptionValue() {
    this.settings.setSoundLevel(this.category, this.sliderValue);
    this.settings.saveOptions();
  }
}