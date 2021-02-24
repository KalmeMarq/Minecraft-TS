import GameSettings from '@km.mcts/GameSettings';
import AmbientOcclusionStatus from '@km.mcts/settings/AmbientOcclusionStatus';
import AttackIndicatorStatus from '@km.mcts/settings/AttackIndicatorStatus';
import BooleanOption from '@km.mcts/settings/BooleanOption';
import ChatVisibility from '@km.mcts/settings/ChatVisibility';
import CloudOption from '@km.mcts/settings/CloudOption';
import GraphicsFanciness from '@km.mcts/settings/GraphicsFanciness';
import HandSide from '@km.mcts/settings/HandSide';
import NarratorStatus from '@km.mcts/settings/NarratorStatus';
import IteratableOption from '@km.mcts/settings/IteratableOption';
import ParticleStatus from '@km.mcts/settings/ParticleStatus';
import PointOfView from '@km.mcts/settings/PointOfView';
import Util from '@km.mcts/util/Util';
import SliderMultiplierOption from './settings/SliderMultiplierOption';
import SliderPercentageOption from './settings/SliderPercentageOption';
import MathHelper from './util/MathHelper';

export default abstract class GameOption {
  public static RAW_MOUSE_INPUT: BooleanOption = new BooleanOption('options.rawMouseInput', (settings: GameSettings) => {
    return settings.rawMouseInput;
  }, (settings: GameSettings, optionValues: boolean) => {
      settings.rawMouseInput = optionValues;
  });

  public static AUTO_SUGGEST_COMMANDS: BooleanOption = new BooleanOption('options.autoSuggestCommands', (settings: GameSettings) => {
    return settings.autoSuggestCommands;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.autoSuggestCommands = optionValues;
  });

  public static field_244786_G: BooleanOption = new BooleanOption('options.hideMatchedNames', (settings: GameSettings) => {
    return settings.hideMatchedNames;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.hideMatchedNames = optionValues;
  });

  public static CHAT_COLOR: BooleanOption = new BooleanOption('options.chat.color', (settings: GameSettings) => {
    return settings.chatColor;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.chatColor = optionValues;
  });

  public static CHAT_LINKS: BooleanOption = new BooleanOption('options.chat.links', (settings: GameSettings) => {
    return settings.chatLinks;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.chatLinks = optionValues;
  });

  public static CHAT_LINKS_PROMPT: BooleanOption = new BooleanOption('options.chat.links.prompt', (settings: GameSettings) => {
    return settings.chatLinksPrompt;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.chatLinksPrompt = optionValues;
  });

  public static DISCRETE_MOUSE_SCROLL: BooleanOption = new BooleanOption('options.discrete_mouse_scroll', (settings: GameSettings) => {
    return settings.discreteMouseScroll;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.discreteMouseScroll = optionValues;
  });

  public static VSYNC: BooleanOption = new BooleanOption('options.vsync', (settings: GameSettings) => {
    return settings.vsync;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.vsync = optionValues;
  });

  public static ENTITY_SHADOWS: BooleanOption = new BooleanOption('options.entityShadows', (settings: GameSettings) => {
    return settings.entityShadows;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.entityShadows = optionValues;
  });

  public static FORCE_UNICODE_FONT: BooleanOption = new BooleanOption('options.forceUnicodeFont', (settings: GameSettings) => {
    return settings.forceUnicodeFont;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.forceUnicodeFont = optionValues;
  });

  public static INVERT_MOUSE: BooleanOption = new BooleanOption('options.invertMouse', (settings: GameSettings) => {
    return settings.invertMouse;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.invertMouse = optionValues;
  });

  public static REALMS_NOTIFICATIONS: BooleanOption = new BooleanOption('options.realmsNotifications', (settings: GameSettings) => {
    return settings.realmsNotifications;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.realmsNotifications = optionValues;
  });

  public static REDUCED_DEBUG_INFO: BooleanOption = new BooleanOption('options.reducedDebugInfo', (settings: GameSettings) => {
    return settings.reducedDebugInfo;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.reducedDebugInfo = optionValues;
  });

  public static SHOW_SUBTITLES: BooleanOption = new BooleanOption('options.showSubtitles', (settings: GameSettings) => {
    return settings.showSubtitles;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.showSubtitles = optionValues;
  });

  public static SNOOPER: BooleanOption = new BooleanOption('options.snooper', (settings: GameSettings) => {
    return false;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.snooper = optionValues;
  });

  public static TOUCHSCREEN: BooleanOption = new BooleanOption('options.touchscreen', (settings: GameSettings) => {
    return settings.touchscreen;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.touchscreen = optionValues;
  });

  public static FULLSCREEN: BooleanOption = new BooleanOption('options.fullscreen', (settings: GameSettings) => {
    return settings.fullscreen;
  }, (settings: GameSettings, optionValues: boolean) => {
    let elem = document.documentElement;
  /*   if(optionValues) {
      if(elem.requestFullscreen) elem.requestFullscreen();
    } else {
      if(document.exitFullscreen) document.exitFullscreen();
    } */
    
    settings.fullscreen = optionValues;
  });

  public static VIEW_BOBBING: BooleanOption = new BooleanOption('options.viewBobbing', (settings: GameSettings) => {
    return settings.viewBobbing;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.viewBobbing = optionValues;
  });

  public static AUTO_JUMP: BooleanOption = new BooleanOption('options.autoJump', (settings: GameSettings) => {
    return settings.autoJump;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.autoJump = optionValues;
  });

  public static SHOW_FPS: BooleanOption = new BooleanOption('Show FPS', (settings: GameSettings) => {
    return settings.showFPS;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.showFPS = optionValues;
  });

  public static HIDE_GUI: BooleanOption = new BooleanOption('Hide GUI', (settings: GameSettings) => {
    return settings.hideGUI;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.hideGUI = optionValues;
  });

  public static SKIP_MULTIPLAYER_WARNING: BooleanOption = new BooleanOption('Skip Multiplayer Warning', (settings: GameSettings) => {
    return settings.skipMultiplayerWarning;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.skipMultiplayerWarning = optionValues;
  });

  public static ADVANCED_TOOLTIPS: BooleanOption = new BooleanOption('Advanced tooltips', (settings: GameSettings) => {
    return settings.advancedItemTooltips;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.advancedItemTooltips = optionValues;
  });

  public static HELD_TOOLTIPS: BooleanOption = new BooleanOption('Held tooltips', (settings: GameSettings) => {
    return settings.heldItemTooltips;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.heldItemTooltips = optionValues;
  });

  public static HIDE_MATCHED_NAMES: BooleanOption = new BooleanOption('options.hideMatchedNames', (settings: GameSettings) => {
    return settings.hideMatchedNames;
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.hideMatchedNames = optionValues;
  });

  public static AO: IteratableOption = new IteratableOption('options.ao', (settings: GameSettings, optionValues: any) => {
    settings.ambientOcclusionStatus = AmbientOcclusionStatus.byId(settings.ambientOcclusionStatus.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.ambientOcclusionStatus.getKey()));
  });

  public static ATTACK_INDICATOR = new IteratableOption('options.attackIndicator', (settings: GameSettings, optionValues: any) => {
    settings.attackIndicator = AttackIndicatorStatus.byId(settings.attackIndicator.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any ) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.attackIndicator.getKey()));
  });
    
  public static CHAT_VISIBILITY: IteratableOption = new IteratableOption('options.chat.visibility', (settings: GameSettings, optionValues: any) => {
    settings.chatVisibility = ChatVisibility.byId(settings.chatVisibility.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(settings.chatVisibility.getKey());
  });

  public static MAIN_HAND: IteratableOption = new IteratableOption('options.mainHand', (settings: GameSettings, optionValues: any) => {
    settings.mainHand = HandSide.byId(settings.narrator.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(settings.mainHand.getKey());
  });

  public static NARRATOR: IteratableOption = new IteratableOption('options.narrator', (settings: GameSettings, optionValues: any) => {
    settings.narrator = NarratorStatus.byId(settings.narrator.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(settings.narrator.getKey());
  });

  public static PARTICLES: IteratableOption = new IteratableOption('options.particles', (settings: GameSettings, optionValues: any) => {
    settings.particles = ParticleStatus.byId(settings.particles.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.particles.getKey()));
  });

  public static RENDER_CLOUDS: IteratableOption = new IteratableOption('options.renderClouds', (settings: GameSettings, optionValues: any) => {
    settings.cloudOption = CloudOption.byId(settings.cloudOption.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.cloudOption.getKey()));
  });

  public static ACCESSIBILITY_TEXT_BACKGROUND: IteratableOption = new IteratableOption('options.accessibility.text_background', (settings: GameSettings, optionValues: any) => {
    settings.accessibilityTextBackground = !settings.accessibilityTextBackground;
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.accessibilityTextBackground ? 'options.accessibility.text_background.chat' : 'options.accessibility.text_background.everywhere'));
  });

  public static GUI_SCALE: IteratableOption = new IteratableOption('options.guiScale', (settings: GameSettings, optionValues: any) => {
    settings.guiScale = 0;
  }, (settings: GameSettings, optionValues: any) => {
    return settings.guiScale == 0 ? optionValues.getGenericValueComponent(Util.getTranslation('options.guiScale.auto')) : optionValues.getMessageWithValue(settings.guiScale);
  });

  public static SNEAK: IteratableOption = new IteratableOption('key.sneak', (settings: GameSettings, optionValues: any) => {
    settings.toggleCrouch = !settings.toggleCrouch;
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.toggleCrouch ? 'options.key.toggle' : 'options.key.hold'));
  });

  public static SPRINT: IteratableOption = new IteratableOption('key.sprint', (settings: GameSettings, optionValues: any) => {
    settings.toggleSprint = !settings.toggleSprint;
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.toggleSprint ? 'options.key.toggle' : 'options.key.hold'));
  });

  public static GRAPHICS_FANCINESS: IteratableOption = new IteratableOption('options.graphics', (settings: GameSettings, optionValues: any) => {
    settings.graphicFanciness = GraphicsFanciness.byId(settings.graphicFanciness.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.graphicFanciness.getKey()));
  });

  public static POINT_OF_VIEW: IteratableOption = new IteratableOption('POINT_OF_VIEW', (settings: GameSettings, optionValues: any) => {
    settings.pointOfView = PointOfView.byId(settings.pointOfView.getId() + optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(Util.getTranslation(settings.pointOfView.getKey()));
  });

  public static CHAT_SCALE: SliderPercentageOption = new SliderPercentageOption('options.chat.scale', 0, 1, 0, (settings: GameSettings) => {
    return settings.chatScale;
  }, (settings: GameSettings, optionValues: any) => {
    settings.chatScale = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    let value = optionValues.normalizeValue(optionValues.get(settings));
    return (value == 0 ? (Util.getTranslation(optionValues.getBaseMessageTranslation()) + ': ' + Util.getTranslation(optionValues.get(settings) === true ? 'options.on' : 'options.off')) : optionValues.getPercentValueComponent(value));
  });

  public static CHAT_OPACITY: SliderPercentageOption = new SliderPercentageOption('options.chat.opacity', 0, 1, 0, (settings: GameSettings) => {
    return settings.chatOpacity;
  }, (settings: GameSettings, optionValues: any) => {
    settings.chatOpacity = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    let value = optionValues.normalizeValue(optionValues.get(settings));
    return optionValues.getPercentValueComponent(value * 0.9 + 0.1);
  });
  
  public static LINE_SPACING: SliderPercentageOption = new SliderPercentageOption('options.chat.line_spacing', 0, 1, 0, (settings: GameSettings) => {
    return settings.chatLineSpacing;
  }, (settings: GameSettings, optionValues: any) => {
    settings.chatLineSpacing = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getPercentValueComponent(optionValues.normalizeValue(optionValues.get(settings)));
  });

  public static FOV_EFFECT_SCALE_SLIDER: SliderPercentageOption = new SliderPercentageOption('options.fovEffectScale', 0.0, 1.0, 0.0, (settings: GameSettings) => {
    return Math.pow(settings.fovScaleEffect, 2.0);
  }, (settings: GameSettings, optionValues: any) => {
    settings.fovScaleEffect = MathHelper.sqrt(optionValues);
  }, (settings: GameSettings, optionValues: any) => {
    let value = optionValues.normalizeValue(optionValues.get(settings));
    return value == 0.0 ? optionValues.getGenericValueComponent(Util.getTranslation('options.fovEffectScale.off')) : optionValues.getPercentValueComponent(value);
  });

  public static SCREEN_EFFECT_SCALE_SLIDER: SliderPercentageOption = new SliderPercentageOption('options.screenEffectScale', 0.0, 1.0, 0.0, (settings: GameSettings) => {
    return settings.screenEffectScale;
  }, (settings: GameSettings, percentage: any) => {
    settings.screenEffectScale = percentage;
  }, (percentage: GameSettings, percentage2: any) => {
    let value = percentage2.normalizeValue(percentage2.get(percentage));
    return value == 0.0 ? percentage2.getGenericValueComponent(Util.getTranslation('options.screenEffectScale.off')) : percentage2.getPercentValueComponent(value);
  }); 

  public static DELAY_INSTANT: SliderPercentageOption = new SliderPercentageOption('options.chat.delay_instant', 0, 6, 0.1, (settings: GameSettings) => {
    return settings.chatDelay;
  }, (settings: GameSettings, optionValues: any) => {
    settings.chatDelay = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    let value = optionValues.get(settings);
    return value <= 0 ? Util.getTranslation('options.chat.delay_none') : Util.getTranslation('options.chat.delay').replace('%s', value.toFixed(1));
  });

  public static ACCESSIBILITY_TEXT_BACKGROUND_OPACITY: SliderPercentageOption = new SliderPercentageOption('options.accessibility.text_background_opacity', 0, 1, 0, (settings: GameSettings) => {
    return settings.accessibilityTextBackgroundOpacity;
  }, (settings: GameSettings, optionValues: number) => {
    settings.accessibilityTextBackgroundOpacity = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getPercentValueComponent(optionValues.normalizeValue(optionValues.get(settings)));
  });

  public static CHAT_WIDTH: SliderPercentageOption = new SliderPercentageOption('options.chat.width', 0, 1, 0, (settings: GameSettings) => {
    return settings.chatWidth;
  }, (settings: GameSettings, optionValues: number) => {
    settings.chatWidth = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.normalizeValue(optionValues.get(settings));
    return optionValues.getPixelValueComponent(Math.floor(value * 280 + 40));
  });

  public static CHAT_HEIGHT_FOCUSED: SliderPercentageOption = new SliderPercentageOption('options.chat.height.focused', 0, 1, 0, (settings: GameSettings) => {
    return settings.chatHeightFocused;
  }, (settings: GameSettings, optionValues: number) => {
    settings.chatHeightFocused = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.normalizeValue(optionValues.get(settings));
    return optionValues.getPixelValueComponent(Math.floor(value * 160 + 20));
  });

  public static CHAT_HEIGHT_UNFOCUSED: SliderPercentageOption = new SliderPercentageOption('options.chat.height.unfocused', 0, 1, 0, (settings: GameSettings) => {
    return settings.chatHeightUnfocused;
  }, (settings: GameSettings, optionValues: number) => {
    settings.chatHeightUnfocused = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.normalizeValue(optionValues.get(settings));
    return optionValues.getPixelValueComponent(Math.floor(value * 160 + 20));
  });

  public static RENDER_DISTANCE: SliderPercentageOption = new SliderPercentageOption('options.renderDistance', 2, 64, 1, (settings: GameSettings) => {
    return settings.renderDistanceChunks;
  }, (settings: GameSettings, optionValues: any) => {
    settings.renderDistanceChunks = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.get(settings);
    return optionValues.getGenericValueComponent(Util.getTranslation('options.chunks').replace('%s', value));
  });

  public static ENTITY_DISTANCE_SCALING: SliderPercentageOption = new SliderPercentageOption('options.entityDistanceScaling', 0.5, 5, 0.25, (settings: GameSettings) => {
    return settings.entityDistanceScaling;
  }, (settings: GameSettings, optionValues: any) => {
    settings.entityDistanceScaling = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.get(settings);
    return optionValues.getPercentValueComponent(value);
  });

  public static GAMMA: SliderPercentageOption = new SliderPercentageOption('options.gamma', 0, 1, 0, (settings: GameSettings) => {
    return settings.gamma;
  }, (settings: GameSettings, optionValues: any) => {
    settings.gamma = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.normalizeValue(optionValues.get(settings));
    if(value == 0.0) return optionValues.getGenericValueComponent(Util.getTranslation('options.gamma.min'));
    else return value == 1.0 ? optionValues.getGenericValueComponent(Util.getTranslation('options.gamma.max')) : optionValues.getPercentageAddMessage((value * 100));
  });

  public static MIPMAP_LEVELS: SliderPercentageOption = new SliderPercentageOption('options.mipmapLevels', 0, 4, 1, (settings: GameSettings) => {
    return settings.mipmapLevels;
  }, (settings: GameSettings, optionValues: any) => {
    settings.mipmapLevels = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.get(settings);
    return (value == 0.0 ? `${optionValues.getBaseMessageTranslation()}: ${Util.getTranslation('options.off')}` : optionValues.getMessageWithValue(value));
  });

  public static FRAMERATE_LIMIT: SliderPercentageOption = new SliderPercentageOption('options.framerateLimit', 10, 260, 10, (settings: GameSettings) => {
    return settings.framerateLimit;
  }, (settings: GameSettings, percentage: any) => {
    settings.framerateLimit = percentage;
  }, (settings: GameSettings, percentage: any) => {
    const value = percentage.get(settings);
    return value == percentage.getMaxValue() ? percentage.getGenericValueComponent(Util.getTranslation('options.framerateLimit.max')) : percentage.getGenericValueComponent(Util.getTranslation('options.framerate').replace('%s', value));
  });

  public static FOV: SliderPercentageOption = new SliderPercentageOption('options.fov', 30, 110, 1, (settings: GameSettings) => {
    return settings.fov;
  }, (settings: GameSettings, optionValues: any) => {
      settings.fov = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.get(settings);
    if(value == 70.0) return optionValues.getGenericValueComponent(Util.getTranslation('options.fov.min'));
    else return value == optionValues.getMaxValue() ? optionValues.getGenericValueComponent(Util.getTranslation('options.fov.max')) : optionValues.getMessageWithValue(~~(value));
  });

  public static SENSITIVITY: SliderPercentageOption = new SliderPercentageOption('options.sensitivity', 0, 1, 0, (settings: GameSettings) => {
    return settings.mouseSensitivity;
  }, (settings: GameSettings, optionValues: any) => {
    settings.mouseSensitivity = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.normalizeValue(optionValues.get(settings));
    if(value == 0) return optionValues.getGenericValueComponent(Util.getTranslation('options.sensitivity.min'));
    else return value == 1 ? optionValues.getGenericValueComponent(Util.getTranslation('options.sensitivity.max')) : optionValues.getPercentValueComponent(2 * value);
  });

  public static MOUSE_WHEEL_SENSITIVITY: SliderPercentageOption = new SliderMultiplierOption('options.mouseWheelSensitivity', 0.01, 10, 0.01, (settings: GameSettings) => {
    return settings.mouseWheelSensitivity;
  }, (settings: GameSettings, optionValues: any) => {
    settings.mouseWheelSensitivity = optionValues;
  }, (settings: GameSettings, optionValues: any) => {
    const value = optionValues.normalizeValue(optionValues.get(settings));
    return optionValues.getGenericValueComponent(optionValues.denormalizeValue(value).toFixed(2));
  });
}