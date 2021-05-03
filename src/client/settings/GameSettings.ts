import Util from '../../util/Util'
import AmbientOcclusionStatus from './AmbientOcclusionStatus'
import AttackIndicatorStatus from './AttackIndicatorStatus'
import ChatVisibility from './ChatVisibility'
import CloudOption from './CloudOption'
import GraphicsFanciness from './GraphicsFanciness'
import HandSide from './HandSide'
import KeyBinding from './KeyBinding'
import NarratorStatus from './NarratorStatus'
import ParticleStatus from './ParticleStatus'
import PlayerModelPart from './PlayerModelPart'
import PointOfView from './PointOfView'
import SoundCategory from './SoundCategory'
import ToggleableKeyBinding from './ToggleableKeyBinding'
import { Buffer } from 'buffer'
import Minecraft from '../Minecraft'
import { Client } from '..'
import GameOption from './GameOption'

export default class GameSettings {
  private readonly mc: Minecraft
  private readonly optionsFile = 'options.txt'

  public resourcePacks: string[] = []
  public incompatibleResourcePacks: string[] = []
  private readonly soundLevels: Map<SoundCategory, number> = new Map((Object.entries(SoundCategory).slice(0, -1)).map(i => [i[1], 1]))
  private readonly modelParts: Set<PlayerModelPart> = new Set(Object.values(PlayerModelPart))
  public graphicFanciness = GraphicsFanciness.FANCY
  public cloudOption = CloudOption.FANCY
  public ambientOcclusion = AmbientOcclusionStatus.MAX
  public attackIndicator = AttackIndicatorStatus.CROSSHAIR
  public narrator = NarratorStatus.OFF
  public chatVisibility = ChatVisibility.FULL
  public mainHand = HandSide.LEFT
  public particles = ParticleStatus.ALL
  public pointOfView = PointOfView.FIRST_PERSON
  public mouseSensitivity = 0.5
  public renderDistanceChunks = -1
  public chatOpacity = 1.0
  public chatLineSpacing = 0.0
  public chatScale = 0.7
  public entityDistanceScaling = 1
  public mipmapLevels = 4
  public chatWidth = 1.0
  public chatHeightUnfocused = 0.44366196
  public chatHeightFocused = 1.0
  public chatDelay = 0.0
  public textBackgroundOpacity = 0.5
  public advancedItemTooltips = false
  public heldItemTooltips = true
  public framerateLimit = 60
  public showFPS = true
  public skipMultiplayerWarning = false
  public biomeBlendRadius = 2
  public mouseWheelSensitivity = 1.0
  public rawMouseInput = true
  public autoJump = true
  public autoSuggestCommands = true
  public chatColor = true
  public chatLinks = true
  public chatLinksPrompt = true
  public vsync = true
  public entityShadows = true
  public forceUnicodeFont = false
  public invertMouse = false
  public discreteMouseScroll = true
  public realmsNotifications = true
  public hideMatchedNames = false
  public reducedDebugInfo = false
  public snooper = true
  public showSubtitles = false
  public backgroundForChatOnly = true
  public touchscreen = false
  public fullscreen = false
  public viewBobbing = true
  public toggleCrouch = false
  public toggleSprint = false
  public languageCode = 'en_us'
  public hideGUI = false
  public showDebugInfo = false
  public fov = 70.0
  public screenEffectScale = 1.0
  public fovScaleEffect = 1.0
  public gamma = 1.0
  public guiScale = 3.0
  public keyUp: KeyBinding = new KeyBinding('key.forward', 'KeyW', 'key.categories.movement')
  public keyLeft: KeyBinding = new KeyBinding('key.left', 'KeyA', 'key.categories.movement')
  public keyDown: KeyBinding = new KeyBinding('key.back', 'KeyS', 'key.categories.movement')
  public keyRight: KeyBinding = new KeyBinding('key.right', 'KeyD', 'key.categories.movement')
  public keyJump: KeyBinding = new KeyBinding('key.jump', 'Space', 'key.categories.movement')
  public keyShift: KeyBinding = new ToggleableKeyBinding('key.sneak', 'ShiftLeft', 'key.categories.movement', () => this.toggleCrouch)
  public keySprint: KeyBinding = new ToggleableKeyBinding('key.sprint', 'ControlLeft', 'key.categories.movement', () => this.toggleSprint)
  public keyInventory: KeyBinding = new KeyBinding('key.inventory', 'KeyE', 'key.categories.inventory')
  public keySwapOffhand: KeyBinding = new KeyBinding('key.swapOffhand', 'KeyF', 'key.categories.inventory')
  public keyDrop: KeyBinding = new KeyBinding('key.drop', 'KeyQ', 'key.categories.inventory')
  public keyChat: KeyBinding = new KeyBinding('key.chat', 'KeyT', 'key.categories.multiplayer')
  public keyPlayerList: KeyBinding = new KeyBinding('key.playerlist', 'Tab', 'key.categories.multiplayer')
  public keyCommand: KeyBinding = new KeyBinding('key.command', 'Backslash', 'key.categories.multiplayer')
  public keySocialInteractions: KeyBinding = new KeyBinding('key.socialInteractions', 'KeyP', 'key.categories.multiplayer')
  public keyScreenshot: KeyBinding = new KeyBinding('key.screenshot', 'F2', 'key.categories.misc')
  public keyTogglePerspective: KeyBinding = new KeyBinding('key.togglePerspective', 'F5', 'key.categories.misc')
  public keyHotbarSlots: KeyBinding[] = [new KeyBinding('key.hotbar.1', 'Digit1', 'key.categories.inventory'), new KeyBinding('key.hotbar.2', 'Digit2', 'key.categories.inventory'), new KeyBinding('key.hotbar.3', 'Digit3', 'key.categories.inventory'), new KeyBinding('key.hotbar.4', 'Digit4', 'key.categories.inventory'), new KeyBinding('key.hotbar.5', 'Digit5', 'key.categories.inventory'), new KeyBinding('key.hotbar.6', 'Digit6', 'key.categories.inventory'), new KeyBinding('key.hotbar.7', 'Digit7', 'key.categories.inventory'), new KeyBinding('key.hotbar.8', 'Digit8', 'key.categories.inventory'), new KeyBinding('key.hotbar.9', 'Digit9', 'key.categories.inventory')]
  public keyMappings: KeyBinding[] = [
    this.keyUp,
    this.keyDown,
    this.keyLeft,
    this.keyRight,
    this.keyJump,
    this.keyShift,
    this.keySprint,
    this.keyInventory,
    this.keySwapOffhand,
    this.keyDrop,
    this.keyChat,
    this.keyPlayerList,
    this.keyCommand,
    this.keySocialInteractions,
    this.keyScreenshot,
    this.keyTogglePerspective,
    ...this.keyHotbarSlots
  ]

  public darkMojangStudiosBackground = false

  public constructor (mcIn: Minecraft) {
    this.mc = mcIn
    // this.load().catch(e => console.log(e))
    // this.save();
  }

  public async load (): Promise<void> {
    if (!(await Util.fileExists(Client.uuid + '-' + this.optionsFile))) {
      return
    }

    const optionsData = Buffer.from((await Util.getFile(Client.uuid + '-' + this.optionsFile)).data).toString('utf8')
    const options: Map<string, string> = new Map()
    optionsData.split('\n').forEach((line: string) => {
      const l = line.split(':')
      options.set(l[0], l[1])
    })

    for (const key of options.keys()) {
      const value = options.get(key) ?? ''

      try {
        if (Util.equals('showFPS', key)) GameOption.SHOW_FPS.set(this, value)
        if (Util.equals('advancedItemTooltips', key)) GameOption.ADVANCED_TOOLTIPS.set(this, value)
        if (Util.equals('heldItemTooltips', key)) GameOption.HELD_TOOLTIPS.set(this, value)
        if (Util.equals('skipMultiplayerWarning', key)) GameOption.SKIP_MULTIPLAYER_WARNING.set(this, value)
        if (Util.equals('rawMouseInput', key)) GameOption.RAW_MOUSE_INPUT.set(this, value)
        if (Util.equals('autoJump', key)) GameOption.AUTO_JUMP.set(this, value)
        if (Util.equals('autoSuggestCommands', key)) GameOption.AUTO_SUGGEST_COMMANDS.set(this, value)
        if (Util.equals('chatColor', key)) GameOption.CHAT_COLOR.set(this, value)
        if (Util.equals('chatLinks', key)) GameOption.CHAT_LINKS.set(this, value)
        if (Util.equals('chatLinksPrompt', key)) GameOption.CHAT_LINKS.set(this, value)
        if (Util.equals('vsync', key)) GameOption.VSYNC.set(this, value)
        if (Util.equals('entityShadows', key)) GameOption.ENTITY_SHADOWS.set(this, value)
        if (Util.equals('forceUnicodeFont', key)) GameOption.FORCE_UNICODE_FONT.set(this, value)
        if (Util.equals('invertMouse', key)) GameOption.INVERT_MOUSE.set(this, value)
        if (Util.equals('discreteMouseScroll', key)) GameOption.DISCRETE_MOUSE_SCROLL.set(this, value)
        if (Util.equals('realmsNotifications', key)) GameOption.REALMS_NOTIFICATIONS.set(this, value)
        if (Util.equals('hideMatchedNames', key)) GameOption.HIDE_GUI.set(this, value)
        if (Util.equals('reducedDebugInfo', key)) GameOption.REDUCED_DEBUG_INFO.set(this, value)
        if (Util.equals('snooper', key)) GameOption.SNOOPER.set(this, value)
        if (Util.equals('showSubtitles', key)) GameOption.SHOW_SUBTITLES.set(this, value)
        if (Util.equals('darkMojangStudiosBackground', key)) this.darkMojangStudiosBackground = Util.equals('true', value)
        if (Util.equals('backgroundForChatOnly', key)) this.backgroundForChatOnly = Util.equals('true', value)
        if (Util.equals('touchscreen', key)) GameOption.TOUCHSCREEN.set(this, value)
        if (Util.equals('fullscreen', key)) GameOption.FULLSCREEN.set(this, value)
        if (Util.equals('viewBobbing', key)) GameOption.VIEW_BOBBING.set(this, value)
        if (Util.equals('toggleCrouch', key)) this.toggleCrouch = Util.equals('true', value)
        if (Util.equals('toggleSprint', key)) this.toggleSprint = Util.equals('true', value)
        if (Util.equals('hideGUI', key)) GameOption.HIDE_GUI.set(this, value)
        if (Util.equals('showDebugInfo', key)) this.showDebugInfo = Util.equals('true', value)
        if (Util.equals('fov', key)) this.fov = (parseFloat(value) * 40.0 + 70.0)
        if (Util.equals('screenEffectScale', key)) this.screenEffectScale = parseFloat(value)
        if (Util.equals('fovEffectScale', key)) this.fovScaleEffect = parseFloat(value)
        if (Util.equals('biomeBlendRadius', key)) this.biomeBlendRadius = parseInt(value)
        if (Util.equals('mouseWheelSensitivity', key)) this.mouseWheelSensitivity = parseFloat(value)
        if (Util.equals('gamma', key)) this.gamma = parseFloat(value)
        if (Util.equals('guiScale', key)) this.guiScale = parseInt(value)
        if (Util.equals('mouseSensitivity', key)) this.mouseSensitivity = parseFloat(value)
        if (Util.equals('renderDistanceChunks', key)) this.renderDistanceChunks = parseInt(value)
        if (Util.equals('chatOpacity', key)) this.chatOpacity = parseFloat(value)
        if (Util.equals('chatLineSpacing', key)) this.chatLineSpacing = parseFloat(value)
        if (Util.equals('chatScale', key)) this.chatScale = parseFloat(value)
        if (Util.equals('chatWidth', key)) this.chatWidth = parseFloat(value)
        if (Util.equals('chatHeightUnfocused', key)) this.chatHeightUnfocused = parseFloat(value)
        if (Util.equals('chatHeightFocused', key)) this.chatHeightFocused = parseFloat(value)
        if (Util.equals('chatDelay', key)) this.chatDelay = parseFloat(value)
        if (Util.equals('textBackgroundOpacity', key)) this.textBackgroundOpacity = parseFloat(value)
        if (Util.equals('framerateLimit', key)) this.framerateLimit = parseInt(value)
        if (Util.equals('lang', key)) this.languageCode = value
        if (Util.equals('graphicsMode', key)) this.graphicFanciness = GraphicsFanciness.byId(parseInt(value))
        if (Util.equals('attackIndicator', key)) this.attackIndicator = AttackIndicatorStatus.byId(parseInt(value))
        if (Util.equals('narrator', key)) this.narrator = NarratorStatus.byId(parseInt(value))
        if (Util.equals('chatVisibility', key)) this.chatVisibility = ChatVisibility.byId(parseInt(value))
        if (Util.equals('mainHand', key)) this.mainHand = Util.equals('left', value) ? HandSide.LEFT : HandSide.RIGHT
        if (Util.equals('particles', key)) this.particles = ParticleStatus.byId(parseInt(value))
        if (Util.equals('pointOfView', key)) this.pointOfView = PointOfView.byId(parseInt(value))

        if (Util.equals('renderClouds', key)) {
          if (Util.equals('true', value)) {
            this.cloudOption = CloudOption.FANCY
          } else if (Util.equals('false', value)) {
            this.cloudOption = CloudOption.OFF
          } else if (Util.equals('fast', value)) {
            this.cloudOption = CloudOption.FAST
          }
        }

        if (Util.equals('ao', key)) {
          if (Util.equals('true', value)) {
            this.ambientOcclusion = AmbientOcclusionStatus.MAX
          } else if (Util.equals('false', value)) {
            this.ambientOcclusion = AmbientOcclusionStatus.OFF
          } else {
            this.ambientOcclusion = AmbientOcclusionStatus.byId(parseInt(value))
          }
        }

        if (Util.equals('resourcePacks', key)) {
          this.resourcePacks = JSON.parse(value)
          if (this.resourcePacks === null) {
            this.resourcePacks = []
          }
        }

        if (Util.equals('incompatibleResourcePacks', key)) {
          this.incompatibleResourcePacks = JSON.parse(value)
          if (this.incompatibleResourcePacks === null) {
            this.incompatibleResourcePacks = []
          }
        }

        for (const keybinding of this.keyMappings) {
          if (Util.equals(key, `key_${keybinding.getName()}`)) {
            keybinding.setKey(value)
          }
        }

        for (const soundcategory of Object.values(SoundCategory).slice(0, -1) as SoundCategory[]) {
          if (Util.equals(key, `soundCategory_${soundcategory.getName()}`)) {
            this.soundLevels.set(soundcategory, parseFloat(value))
          }
        }
      } catch (e) {
        console.warn(`Skipping bad option: ${key}:${value}`)
      }
    }
  }

  public save (): void {
    Util.createFile(Client.uuid + '-' +  this.optionsFile, () => {
      let data = ''

      data += 'showFPS:true'
      data += '\nrenderClouds:fast'
      data += '\nguiScale:3'

      data += (`skipMultiplayerWarning:${GameOption.SKIP_MULTIPLAYER_WARNING.get(this).toString()}`)
      data += `\nlang:${this.languageCode}`
      data += (`advancedItemTooltips:${GameOption.ADVANCED_TOOLTIPS.get(this).toString()}`)
      data += (`heldItemTooltips:${GameOption.HELD_TOOLTIPS.get(this).toString()}`)
      data += (`rawMouseInput:${GameOption.RAW_MOUSE_INPUT.get(this).toString()}`)
      data += (`autoJump:${GameOption.AUTO_JUMP.get(this).toString()}`)
      data += (`vsync:${GameOption.VSYNC.get(this).toString()}`)
      data += (`forceUnicodeFont:${GameOption.FORCE_UNICODE_FONT.get(this).toString()}`)
      data += (`showSubtitles:${GameOption.SHOW_SUBTITLES.get(this).toString()}`)
      data += (`hideGUI:${GameOption.HIDE_GUI.get(this).toString()}`)
      data += `\ntoggleCrouch:${String(this.toggleCrouch)}`
      data += `\ntoggleSprint:${String(this.toggleSprint)}`
      data += `\ndarkMojangStudiosBackground:${String(this.darkMojangStudiosBackground)}`
      data += `\nchatScale:${String(this.chatScale)}`
      data += `\nao:${this.ambientOcclusion.getId().toString()}`
      data += `\nattackIndicator:${this.attackIndicator.getId().toString()}`
      data += `\nnarrator:${this.narrator.getId().toString()}`
      data += `\nchatVisibility:${this.chatVisibility.getId().toString()}`
      data += `\nmainHand:${(this.mainHand === HandSide.LEFT ? 'left' : 'right')}`
      data += `\nparticles:${this.particles.getId().toString()}`
      data += `\npointOfView:${this.pointOfView.getId().toString()}`
      data += `\nmouseSensitivity:${this.mouseSensitivity}`
      data += `\nrenderDistanceChunks:${this.renderDistanceChunks}`
      data += `\nchatOpacity:${this.chatOpacity}`
      data += `\nchatLineSpacing:${this.chatLineSpacing}`
      data += `\nchatScale:${this.chatScale}`
      data += `\nchatWidth:${this.chatWidth}`
      data += `\nchatHeightUnfocused:${this.chatHeightUnfocused}`
      data += `\nchatHeightFocused:${this.chatHeightFocused}`
      data += `\nchatDelay:${this.chatDelay}`
      data += `\ntextBackgroundOpacity:${this.textBackgroundOpacity}`
      data += `\nframerateLimit:${this.framerateLimit}`
      data += `\nbiomeBlendRadius:${this.biomeBlendRadius}`
      data += `\nmouseWheelSensitivity:${this.mouseWheelSensitivity}`
      data += (`autoSuggestCommands:${GameOption.AUTO_SUGGEST_COMMANDS.get(this).toString()}`)
      data += (`chatColor:${GameOption.CHAT_COLOR.get(this).toString()}`)
      data += (`chatLinks:${GameOption.CHAT_LINKS.get(this).toString()}`)
      data += (`chatLinksPrompt:${GameOption.CHAT_LINKS_PROMPT.get(this).toString()}`)
      data += (`entityShadows:${GameOption.ENTITY_SHADOWS.get(this).toString()}`)
      data += (`invertMouse:${GameOption.INVERT_MOUSE.get(this).toString()}`)
      data += (`discreteMouseScroll:${GameOption.DISCRETE_MOUSE_SCROLL.get(this).toString()}`)
      data += (`realmsNotifications:${GameOption.REALMS_NOTIFICATIONS.get(this).toString()}`)
      data += `\nhideMatchedNames:${String(this.hideMatchedNames)}`
      data += (`reducedDebugInfo:${GameOption.REDUCED_DEBUG_INFO.get(this).toString()}`)
      data += (`snooper:${GameOption.SNOOPER.get(this).toString()}`)
      data += `\nbackgroundForChatOnly:${String(this.backgroundForChatOnly)}`
      data += (`touchscreen:${GameOption.TOUCHSCREEN.get(this).toString()}`)
      data += '\nfullscreen:false'
      data += (`viewBobbing:${GameOption.VIEW_BOBBING.get(this).toString()}`)
      data += `\nshowDebugInfo:${String(this.showDebugInfo)}`
      data += `\nfov:${((this.fov - 70) / 40).toString()}`
      data += `\nscreenEffectScale:${this.screenEffectScale}`
      data += `\nfovScaleEffect:${this.fovScaleEffect}`
      data += `\ngamma:${this.gamma}`
      data += `\nguiScale:${this.guiScale}`
      data += `\nresourcePacks:${JSON.stringify(this.resourcePacks)}`
      data += `\nincompatibleResourcePacks:${JSON.stringify(this.incompatibleResourcePacks)}`
      data += `\ngraphicsMode:${this.graphicFanciness.getId()}`

      switch (this.cloudOption) {
        case CloudOption.FANCY: data += '\nrenderClouds:true'
          break
        case CloudOption.FAST: data += '\nrenderClouds:fast'
          break
        case CloudOption.OFF: data += '\nrenderClouds:false'
          break
      }

      for (const keybinding of this.keyMappings) { data += `\nkey_${keybinding.getName()}:${keybinding.saveString()}` }

      for (const soundcategory of Object.values(SoundCategory).slice(0, -1) as SoundCategory[]) { data += `\nsoundCategory_${soundcategory.getName()}:${this.getSoundLevel(soundcategory) as number}` }

      for (const playermodelpart of Object.values(PlayerModelPart) as PlayerModelPart[]) {
        data += `\nmodelPart_${playermodelpart.getName()}:${String(this.modelParts.has(playermodelpart))}`
      }
      return data
    })
  }

  public getSoundLevel (category: SoundCategory): number | undefined {
    return this.soundLevels.get(category)
  }

  public setSoundLevel (category: SoundCategory, volume: number): void {
    this.soundLevels.set(category, volume)
  }
}
