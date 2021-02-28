import SoundCategory from "@mcsrc/util/SoundCategory";
import Util from "@mcsrc/util/Util";
import Minecraft from "../../Minecraft";
import DialogTexts from "../DialogTexts";
import { GameSettingsSlider } from "./GameSettingsSlider";

export default class SoundSlider extends GameSettingsSlider {
  private category: SoundCategory;

  constructor(settings: Minecraft, x: number, y: number, category: SoundCategory, width: number) {
    super(settings.gameSettings, x, y, width, 20, settings.gameSettings.getSoundLevel(category)!);
    this.category = category;
    this.setName();
  }

  protected setSaveOptionValue() {
    this.settings.setSoundLevel(this.category, this.sliderValue);
    this.settings.saveOptions();
  }

  protected setName(): void {
    let per = String(this.sliderValue === 0 ? DialogTexts.OPTIONS_OFF.getTranslatedKey() : String((Math.ceil(this.sliderValue * 100)) + "%"));
    this.setMessage((Util.getTranslation("soundCategory." + this.category.getName())) + ": " + (per));
  }
}