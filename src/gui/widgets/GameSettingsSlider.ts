import GameSettings from "../../GameSettings.js";
import AbstractSlider from "./AbstractSlider.js";

export abstract class GameSettingsSlider extends AbstractSlider {
   protected settings: GameSettings;
   
   constructor(settings: GameSettings, x: number, y: number, width: number, height: number, defaultValue: number) {
      super(x, y, width, height, '', defaultValue);
      this.settings = settings;
   }
}