import GameSettings from "./GameSettings.js";
import AmbientOcclusionStatus from "./settings/AmbientOcclusionStatus.js";
import AttackIndicatorStatus from "./settings/AttackIndicatorStatus.js";
import BooleanOption from "./settings/BooleanOption.js";
import ChatVisibility from "./settings/ChatVisibility.js";
import CloudOption from "./settings/CloudOption.js";
import GraphicsFanciness from "./settings/GraphicsFanciness.js";
import HandSide from "./settings/HandSide.js";
import IteratableOption from "./settings/IteratableOption.js";
import NarratorStatus from "./settings/NarratorStatus.js";
import ParticleStatus from "./settings/ParticleStatus.js";
import PointOfView from "./settings/PointOfView.js";
// import SliderPercentageOption from "./settings/SliderPercentageOption";
import SneakOption from "./settings/SneakOption.js";
import SprintOption from "./settings/SprintOption.js";

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

  public static CHAT_COLOR: BooleanOption = new BooleanOption("options.chat.color", (settings: GameSettings) => {
    return settings.chatColor;
  }, (settings: GameSettings, optionValues: any) => {
      settings.chatColor = optionValues;
  });

  public static CHAT_LINKS: BooleanOption = new BooleanOption("options.chat.links", (settings: GameSettings) => {
    return settings.chatLinks;
  }, (settings: GameSettings, optionValues: any) => {
      settings.chatLinks = optionValues;
  });

  public static CHAT_LINKS_PROMPT: BooleanOption = new BooleanOption("options.chat.links.prompt", (settings: GameSettings) => {
    return settings.chatLinksPrompt;
  }, (settings: GameSettings, optionValues: any) => {
      settings.chatLinksPrompt = optionValues;
  });

  public static SPRINT: IteratableOption = new IteratableOption('key.sprint', (settings: GameSettings) => {
    return settings.toggleSprint;
  }, (settings: GameSettings) => {
    settings.toggleSprint = SprintOption.byId(settings.toggleSprint.id + 1);
  });

  public static SNEAK: IteratableOption = new IteratableOption('key.sneak', (settings: GameSettings) => {
    return settings.toggleCrouch;
  }, (settings: GameSettings) => {
    settings.toggleCrouch = SneakOption.byId(settings.toggleCrouch.id + 1);
  });

  public static GRAPHICS_FANCINESS: IteratableOption = new IteratableOption('options.graphics', (settings: GameSettings) => {
    return settings.graphicFanciness;
  }, (settings: GameSettings) => {
    settings.graphicFanciness = GraphicsFanciness.byId(settings.graphicFanciness.id + 1);
  });

  public static CLOUDS_OPTION: IteratableOption = new IteratableOption('options.renderClouds', (settings: GameSettings) => {
    return settings.cloudsOption;
  }, (settings: GameSettings) => {
    settings.cloudsOption = CloudOption.byId(settings.cloudsOption.id + 1);
  });

  public static AMBIENT_OCCLUSION_STATUS: IteratableOption = new IteratableOption('options.ao', (settings: GameSettings) => {
    return settings.ambientOcclusion;
  }, (settings: GameSettings) => {
    settings.ambientOcclusion = AmbientOcclusionStatus.byId(settings.ambientOcclusion.id + 1);
  });

  public static ATTACK_INDICATOR_STATUS: IteratableOption = new IteratableOption('options.attackIndicator', (settings: GameSettings) => {
    return settings.attackIndicator;
  }, (settings: GameSettings) => {
    settings.attackIndicator = AttackIndicatorStatus.byId(settings.attackIndicator.id + 1);
  });

  public static CHAT_VISIBILITY: IteratableOption = new IteratableOption('options.attackIndicator', (settings: GameSettings) => {
    return settings.chatVisibility;
  }, (settings: GameSettings) => {
    settings.chatVisibility = ChatVisibility.byId(settings.chatVisibility.id + 1);
  });

  public static HAND_SIDE: IteratableOption = new IteratableOption('options.mainHand', (settings: GameSettings) => {
    return settings.handSide;
  }, (settings: GameSettings) => {
    settings.handSide = HandSide.byId(settings.handSide.id + 1);
  });

  public static PARTICLE_STATUS: IteratableOption = new IteratableOption('options.particles', (settings: GameSettings) => {
    return settings.particleStatus;
  }, (settings: GameSettings) => {
    settings.particleStatus = ParticleStatus.byId(settings.particleStatus.id + 1);
  });

  public static NARRATOR_STATUS: IteratableOption = new IteratableOption('options.particles', (settings: GameSettings) => {
    return settings.narratorStatus;
  }, (settings: GameSettings) => {
    settings.narratorStatus = NarratorStatus.byId(settings.narratorStatus.id + 1);
  });

  public static POINT_OF_VIEW: IteratableOption = new IteratableOption('POINT_OF_VIEW', (settings: GameSettings) => {
    return settings.pointOfView;
  }, (settings: GameSettings) => {
    settings.pointOfView = PointOfView.byId(settings.pointOfView.id + 1);
  });

  // public static ACCESSIBILITY_TEXT_BACKGROUND_OPACITY: SliderPercentageOption = new SliderPercentageOption(/* "options.accessibility.text_background_opacity", 0.0, 1.0, 0.0, (settings: GameSettings) => {
  //   return settings.accessibilityTextBackgroundOpacity;
  // }, (settings: GameSettings, optionValues: any) => {
  //     settings.accessibilityTextBackgroundOpacity = optionValues;
  // }, (settings: GameSettings, optionValues: any) => {
  //     return optionValues.getPercentValueComponent(optionValues.normalizeValue(optionValues.get(settings)));
  // } */);
}