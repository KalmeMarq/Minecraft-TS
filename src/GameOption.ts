import GameSettings from "./GameSettings";
import { BooleanOption } from "./settings/BooleanOption";

export default abstract class GameOption {
  public static ShowFPSOption = new BooleanOption('Show FPS', 'showFPS', false);
  public static TestOption = new BooleanOption('Test', 'testthing', false);
  
//   public setOptionValues(values: []) {
//     this.optionValues = Optional.of(values);
//  }
}