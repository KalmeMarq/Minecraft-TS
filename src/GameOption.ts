import GameSettings from "./GameSettings";
import BooleanOption from "./settings/BooleanOption";
import CloudOption from "./settings/CloudOption";
import GraphicsFanciness from "./settings/GraphicsFanciness";
import IteratableOption from "./settings/IteratableOption.js";
import TranslationTextComponent from "./utils/TranslationText.js";

export default abstract class GameOption {
  public static ShowFPSOption: BooleanOption = new BooleanOption('Show FPS', (settings: GameSettings) => {
    return settings.showFPS;
  }, (settings: GameSettings, optionValues: any) => {
    settings.showFPS = optionValues;
  });

  public static AdvancedItemTooltipsOption: BooleanOption = new BooleanOption('Advanced tooltips', (settings: GameSettings) => {
    return settings.advancedItemTooltips;
  }, (settings: GameSettings, optionValues: any) => {
    settings.advancedItemTooltips = optionValues;
  });

  public static HeldItemTooltipsOption: BooleanOption = new BooleanOption('Held tooltips', (settings: GameSettings) => {
    return settings.heldItemTooltips;
  }, (settings: GameSettings, optionValues: any) => {
    settings.heldItemTooltips = optionValues;
  });

  public static RawMouseInputOption: BooleanOption = new BooleanOption('options.rawMouseInput', (settings: GameSettings) => {
    return settings.rawMouseInput;
  }, (settings: GameSettings, optionValues: any) => {
    settings.rawMouseInput = optionValues;
  });

  public static SkipMultiplayerWarningOption: BooleanOption = new BooleanOption('Skip Multiplayer Warning', (settings: GameSettings) => {
    return settings.skipMultiplayerWarning;
  }, (settings: GameSettings, optionValues: any) => {
    settings.skipMultiplayerWarning = optionValues;
  });

  public static AutoJumpOption: BooleanOption = new BooleanOption('options.autoJump', (settings: GameSettings) => {
    return settings.autoJump;
  }, (settings: GameSettings, optionValues: any) => {
    settings.autoJump = optionValues;
  });

  public static VsyncOption: BooleanOption = new BooleanOption('options.vsync', (settings: GameSettings) => {
    return settings.vsync;
  }, (settings: GameSettings, optionValues: any) => {
    settings.vsync = optionValues;
  });

  public static ForceUnicodeFont: BooleanOption = new BooleanOption('options.forceUnicodeFont', (settings: GameSettings) => {
    return settings.forceUnicodeFont;
  }, (settings: GameSettings, optionValues: any) => {
    settings.forceUnicodeFont = optionValues;
  });

  public static ShowSubtitlesOption: BooleanOption = new BooleanOption('options.showSubtitles', (settings: GameSettings) => {
    return settings.showSubtitles;
  }, (settings: GameSettings, optionValues: any) => {
    settings.showSubtitles = optionValues;
  });

  public static HideGUIOption: BooleanOption = new BooleanOption('Hide GUI', (settings: GameSettings) => {
    return settings.hideGUI;
  }, (settings: GameSettings, optionValues: any) => {
    settings.hideGUI = optionValues;
  });
  
  public static TestOption: BooleanOption = new BooleanOption('Test', (settings: GameSettings) => {
    return settings.testthing;
  }, (settings: GameSettings, optionValues: any) => {
    settings.testthing = optionValues;
  });

  public static GRAPHICS_FANCINESS: IteratableOption = new IteratableOption('options.graphics', (settings: GameSettings) => {
    return settings.graphicFanciness;
  }, (settings: GameSettings) => {
    let i = settings.graphicFanciness.id;
    if(i + 1 == GraphicsFanciness.length) i = 0;
    else i++;
    
    settings.graphicFanciness = GraphicsFanciness[i];
  });

  public static CLOUDS_OPTION: IteratableOption = new IteratableOption('options.renderClouds', (settings: GameSettings) => {
    return settings.cloudsOption;
  }, (settings: GameSettings) => {
    let i = settings.cloudsOption.id;
    if(i + 1 == CloudOption.length) i = 0;
    else i++;
    
    settings.cloudsOption = CloudOption[i];
  });
}