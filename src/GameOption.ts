import GameSettings from "./GameSettings";
import BooleanOption from "./settings/BooleanOption";
import TranslationTextComponent from "./utils/TranslationText";

export default abstract class GameOption {
  public static ShowFPSOption = new BooleanOption('Show FPS', (settings: GameSettings) => {
    return settings.showFPS;
  }, (settings: GameSettings, optionValues: any) => {
    settings.showFPS = optionValues;
  });
  
  public static TestOption = new BooleanOption('Test', (settings: GameSettings) => {
    return settings.testthing;
  }, (settings: GameSettings, optionValues: any) => {
    settings.testthing = optionValues;
  });
}