import Minecraft from "../Minecraft"
import { TextComponent } from "../../util/text/TextComponent"
import AmbientOcclusionStatus from "./AmbientOcclusionStatus"
import AttackIndicatorStatus from "./AttackIndicatorStatus"
import BooleanOption from "./BooleanOption"
import ChatVisibility from "./ChatVisibility"
import CloudOption from "./CloudOption"
import GameSettings from "./GameSettings"
import GraphicsFanciness from "./GraphicsFanciness"
import HandSide from "./HandSide"
import IteratableOption from "./IteratableOption"
import NarratorStatus from "./NarratorStatus"
import ParticleStatus from "./ParticleStatus"
import PointOfView from "./PointOfView"

export default abstract class GameOption {
  public static RAW_MOUSE_INPUT: BooleanOption = new BooleanOption('options.rawMouseInput', (settings: GameSettings) => {
    return settings.rawMouseInput
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.rawMouseInput = optionValues
  })

  public static AUTO_SUGGEST_COMMANDS: BooleanOption = new BooleanOption('options.autoSuggestCommands', (settings: GameSettings) => {
    return settings.autoSuggestCommands
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.autoSuggestCommands = optionValues
  })

  public static field_244786_G: BooleanOption = new BooleanOption('options.hideMatchedNames', (settings: GameSettings) => {
    return settings.hideMatchedNames
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.hideMatchedNames = optionValues
  })

  public static CHAT_COLOR: BooleanOption = new BooleanOption('options.chat.color', (settings: GameSettings) => {
    return settings.chatColor
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.chatColor = optionValues
  })

  public static CHAT_LINKS: BooleanOption = new BooleanOption('options.chat.links', (settings: GameSettings) => {
    return settings.chatLinks
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.chatLinks = optionValues
  })

  public static CHAT_LINKS_PROMPT: BooleanOption = new BooleanOption('options.chat.links.prompt', (settings: GameSettings) => {
    return settings.chatLinksPrompt
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.chatLinksPrompt = optionValues
  })

  public static DISCRETE_MOUSE_SCROLL: BooleanOption = new BooleanOption('options.discrete_mouse_scroll', (settings: GameSettings) => {
    return settings.discreteMouseScroll
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.discreteMouseScroll = optionValues
  })

  public static VSYNC: BooleanOption = new BooleanOption('options.vsync', (settings: GameSettings) => {
    return settings.vsync
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.vsync = optionValues
    // Minecraft.getInstance().setFramerateLimit(settings.framerateLimit);
  })

  public static ENTITY_SHADOWS: BooleanOption = new BooleanOption('options.entityShadows', (settings: GameSettings) => {
    return settings.entityShadows
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.entityShadows = optionValues
  })

  public static FORCE_UNICODE_FONT: BooleanOption = new BooleanOption('options.forceUnicodeFont', (settings: GameSettings) => {
    return settings.forceUnicodeFont
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.forceUnicodeFont = optionValues
    const minecraft: Minecraft = Minecraft.getInstance()
    // minecraft.forceUnicodeFont(optionValues);
  })

  public static INVERT_MOUSE: BooleanOption = new BooleanOption('options.invertMouse', (settings: GameSettings) => {
    return settings.invertMouse
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.invertMouse = optionValues
  })

  public static REALMS_NOTIFICATIONS: BooleanOption = new BooleanOption('options.realmsNotifications', (settings: GameSettings) => {
    return settings.realmsNotifications
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.realmsNotifications = optionValues
  })

  public static REDUCED_DEBUG_INFO: BooleanOption = new BooleanOption('options.reducedDebugInfo', (settings: GameSettings) => {
    return settings.reducedDebugInfo
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.reducedDebugInfo = optionValues
  })

  public static SHOW_SUBTITLES: BooleanOption = new BooleanOption('options.showSubtitles', (settings: GameSettings) => {
    return settings.showSubtitles
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.showSubtitles = optionValues
  })

  public static SNOOPER: BooleanOption = new BooleanOption('options.snooper', (settings: GameSettings) => {
    return false
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.snooper = optionValues
  })

  public static TOUCHSCREEN: BooleanOption = new BooleanOption('options.touchscreen', (settings: GameSettings) => {
    return settings.touchscreen
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.touchscreen = optionValues
  })

  public static FULLSCREEN: BooleanOption = new BooleanOption('options.fullscreen', (settings: GameSettings) => {
    return settings.fullscreen
  }, (settings: GameSettings, optionValues: boolean) => {
    const elem = document.documentElement
    if (optionValues) {
      if (document.fullscreenElement === null) elem.requestFullscreen()
    } else {
      if (document.fullscreenElement != null) document.exitFullscreen()
    }

    settings.fullscreen = optionValues
  })

  public static VIEW_BOBBING: BooleanOption = new BooleanOption('options.viewBobbing', (settings: GameSettings) => {
    return settings.viewBobbing
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.viewBobbing = optionValues
  })

  public static AUTO_JUMP: BooleanOption = new BooleanOption('options.autoJump', (settings: GameSettings) => {
    return settings.autoJump
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.autoJump = optionValues
  })

  public static SHOW_FPS: BooleanOption = new BooleanOption('Show FPS', (settings: GameSettings) => {
    return settings.showFPS
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.showFPS = optionValues
  })

  public static HIDE_GUI: BooleanOption = new BooleanOption('Hide GUI', (settings: GameSettings) => {
    return settings.hideGUI
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.hideGUI = optionValues
  })

  public static SKIP_MULTIPLAYER_WARNING: BooleanOption = new BooleanOption('Skip Multiplayer Warning', (settings: GameSettings) => {
    return settings.skipMultiplayerWarning
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.skipMultiplayerWarning = optionValues
  })

  public static ADVANCED_TOOLTIPS: BooleanOption = new BooleanOption('Advanced tooltips', (settings: GameSettings) => {
    return settings.advancedItemTooltips
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.advancedItemTooltips = optionValues
  })

  public static HELD_TOOLTIPS: BooleanOption = new BooleanOption('Held tooltips', (settings: GameSettings) => {
    return settings.heldItemTooltips
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.heldItemTooltips = optionValues
  })

  public static HIDE_MATCHED_NAMES: BooleanOption = new BooleanOption('options.hideMatchedNames', (settings: GameSettings) => {
    return settings.hideMatchedNames
  }, (settings: GameSettings, optionValues: boolean) => {
    settings.hideMatchedNames = optionValues
  })

  public static AO: IteratableOption = new IteratableOption('options.ao', (settings: GameSettings, optionValues: any) => {
    settings.ambientOcclusion = AmbientOcclusionStatus.byId(settings.ambientOcclusion.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.ambientOcclusion.getKey()))
  })

  public static ATTACK_INDICATOR = new IteratableOption('options.attackIndicator', (settings: GameSettings, optionValues: any) => {
    settings.attackIndicator = AttackIndicatorStatus.byId(settings.attackIndicator.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.attackIndicator.getKey()))
  })

  public static CHAT_VISIBILITY: IteratableOption = new IteratableOption('options.chat.visibility', (settings: GameSettings, optionValues: any) => {
    settings.chatVisibility = ChatVisibility.byId(settings.chatVisibility.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(settings.chatVisibility.getKey())
  })

  public static MAIN_HAND: IteratableOption = new IteratableOption('options.mainHand', (settings: GameSettings, optionValues: any) => {
    settings.mainHand = HandSide.byId(settings.mainHand.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(settings.mainHand.getKey())
  })

  public static NARRATOR: IteratableOption = new IteratableOption('options.narrator', (settings: GameSettings, optionValues: any) => {
    settings.narrator = NarratorStatus.byId(settings.narrator.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent(settings.narrator.getKey())
  })

  public static PARTICLES: IteratableOption = new IteratableOption('options.particles', (settings: GameSettings, optionValues: any) => {
    settings.particles = ParticleStatus.byId(settings.particles.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.particles.getKey()))
  })

  public static RENDER_CLOUDS: IteratableOption = new IteratableOption('options.renderClouds', (settings: GameSettings, optionValues: any) => {
    settings.cloudOption = CloudOption.byId(settings.cloudOption.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.cloudOption.getKey()))
  })

  public static ACCESSIBILITY_TEXT_BACKGROUND: IteratableOption = new IteratableOption('options.accessibility.text_background', (settings: GameSettings, optionValues: any) => {
    settings.backgroundForChatOnly = !settings.backgroundForChatOnly
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.backgroundForChatOnly ? 'options.accessibility.text_background.chat' : 'options.accessibility.text_background.everywhere'))
  })

  public static GUI_SCALE: IteratableOption = new IteratableOption('options.guiScale', (settings: GameSettings, optionValues: any) => {
    settings.guiScale = (settings.guiScale + optionValues) % Minecraft.getInstance().getCanvas().calculateScale(0)
  }, (settings: GameSettings, optionValues: any) => {
    return settings.guiScale === 0 ? optionValues.getGenericValueComponent(('options.guiScale.auto')) : optionValues.getMessageWithValue(settings.guiScale)
  })

  public static SNEAK: IteratableOption = new IteratableOption('key.sneak', (settings: GameSettings, optionValues: any) => {
    settings.toggleCrouch = !settings.toggleCrouch
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.toggleCrouch ? 'options.key.toggle' : 'options.key.hold'))
  })

  public static SPRINT: IteratableOption = new IteratableOption('key.sprint', (settings: GameSettings, optionValues: any) => {
    settings.toggleSprint = !settings.toggleSprint
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.toggleSprint ? 'options.key.toggle' : 'options.key.hold'))
  })

  private static readonly GRAPHICS_TOOLTIP_FAST: TextComponent = new TextComponent('options.graphics.fast.tooltip')
  private static readonly GRAPHICS_TOOLTIP_FABULOUS: TextComponent = new TextComponent('options.graphics.fabulous.tooltip')
  private static readonly GRAPHICS_TOOLTIP_FANCY: TextComponent = new TextComponent('options.graphics.fancy.tooltip')

  public static GRAPHICS_FANCINESS: IteratableOption = new IteratableOption('options.graphics', (settings: GameSettings, optionValues: any) => {
    settings.graphicFanciness = GraphicsFanciness.byId(settings.graphicFanciness.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    // switch (settings.graphicFanciness) {
    //   case GraphicsFanciness.FAST:
    //     optionValues.setTooltip(Context2D.split(GameOption.GRAPHICS_TOOLTIP_FAST, 200))
    //     break
    //   case GraphicsFanciness.FANCY:
    //     optionValues.setTooltip(Context2D.split(GameOption.GRAPHICS_TOOLTIP_FANCY, 200))
    //     break
    //   case GraphicsFanciness.FABULOUS:
    //     optionValues.setTooltip(Context2D.split(GameOption.GRAPHICS_TOOLTIP_FABULOUS, 200))
    // }

    return optionValues.getGenericValueComponent((settings.graphicFanciness.getKey()))
  })

  public static POINT_OF_VIEW: IteratableOption = new IteratableOption('POINT_OF_VIEW', (settings: GameSettings, optionValues: any) => {
    settings.pointOfView = PointOfView.byId(settings.pointOfView.getId() + optionValues)
  }, (settings: GameSettings, optionValues: any) => {
    return optionValues.getGenericValueComponent((settings.pointOfView.getKey()))
  })
}