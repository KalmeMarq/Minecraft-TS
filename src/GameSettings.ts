import GameOption from "./GameOption.js";
import Minecraft from "./Minecraft.js";
import AmbientOcclusionStatus from "./settings/AmbientOcclusionStatus.js";
import AttackIndicatorStatus from "./settings/AttackIndicatorStatus.js";
import ChatVisibility from "./settings/ChatVisibility.js";
import CloudOption from "./settings/CloudOption.js";
import GraphicsFanciness from "./settings/GraphicsFanciness.js";
import HandSide from "./settings/HandSide.js";
import KeyBinding from "./settings/KeyBinding.js";
import NarratorStatus from "./settings/NarratorStatus.js";
import ParticleStatus from "./settings/ParticleStatus.js";
import PlayerModelPart from "./settings/PlayerModelPart.js";
import PointOfView from "./settings/PointOfView.js";
import LSStore from "./utils/LSStore.js";
import SoundCategory from "./utils/SoundCategory.js";

export default class GameSettings {
  protected mc;
  private soundLevels: Map<SoundCategory, Number> = new Map((Object.entries(SoundCategory).slice(0, -1)).map(i => [i[1], 1]));
  private setModelParts: Set<PlayerModelPart> = new Set(Object.values(PlayerModelPart));
  public graphicFanciness = GraphicsFanciness.FANCY;
  public cloudOption = CloudOption.FANCY;
  public ambientOcclusionStatus = AmbientOcclusionStatus.MAX;
  public attackIndicator = AttackIndicatorStatus.CROSSHAIR;
  public narrator = NarratorStatus.OFF;
  public chatVisibility = ChatVisibility.FULL;
  public mainHand = HandSide.LEFT;
  public particles = ParticleStatus.ALL;
  public pointOfView = PointOfView.FIRST_PERSON;
  public mouseSensitivity: number = 0.5;
  public renderDistanceChunks: number = -1;
  public chatOpacity: number = 1.0;
  public chatLineSpacing: number = 0.0;
  public chatScale: number = 0.7;
  public entityDistanceScaling = 1;
  public mipmapLevels = 4;
  public chatWidth: number = 1.0;
  public chatHeightUnfocused: number = 0.44366196;
  public chatHeightFocused: number = 1.0;
  public chatDelay: number = 0.0;
  public accessibilityTextBackgroundOpacity: number = 0.5;
  public advancedItemTooltips: boolean = false;
  public heldItemTooltips: boolean = true;
  public framerateLimit: number = 60;
  public showFPS: boolean = true;
  public skipMultiplayerWarning: boolean = false;
  public biomeBlendRadius: number = 2;
  public mouseWheelSensitivity: number = 1.0;
  public rawMouseInput: boolean = true;
  public autoJump: boolean = true;
  public autoSuggestCommands: boolean = true;
  public chatColor: boolean = true;
  public chatLinks: boolean = true;
  public chatLinksPrompt: boolean = true;
  public vsync: boolean = true;
  public entityShadows: boolean = true;
  public forceUnicodeFont: boolean = false;
  public invertMouse: boolean = false;
  public discreteMouseScroll: boolean = false;
  public realmsNotifications: boolean = true;
  public hideMatchedNames: boolean = false;
  public reducedDebugInfo: boolean = false;
  public snooper: boolean = true;
  public showSubtitles: boolean = false;
  public accessibilityTextBackground: boolean = true;
  public touchscreen: boolean = false;
  public fullscreen: boolean = false;
  public viewBobbing: boolean = true;
  public toggleCrouch: any = false;
  public toggleSprint: any = false;
  public language: string = 'en_us';
  public hideGUI: boolean = false;
  public showDebugInfo: boolean = false;
  public fov: number = 70.0;
  public screenEffectScale: number = 1.0;
  public fovScaleEffect: number = 1.0;
  public gamma: number = 1.0;
  public guiScale: number = 3.0;
  public keyBindForward: KeyBinding = new KeyBinding("key.forward", 'w', "key.categories.movement");
  public keyBindLeft: KeyBinding = new KeyBinding("key.left", 'a', "key.categories.movement");
  public keyBindBack: KeyBinding = new KeyBinding("key.back", 's', "key.categories.movement");
  public keyBindRight: KeyBinding = new KeyBinding("key.right", 'd', "key.categories.movement");
  public keyBindJump: KeyBinding = new KeyBinding("key.jump", ' ', "key.categories.movement");
  public keyBindInventory: KeyBinding = new KeyBinding("key.inventory", 'e', "key.categories.inventory");
  public keyBindSwapHands: KeyBinding = new KeyBinding("key.swapOffhand", 'f', "key.categories.inventory");
  public keyBindDrop: KeyBinding = new KeyBinding("key.drop", 'q', "key.categories.inventory");
  public keyBindUseItem: KeyBinding = new KeyBinding("key.use", 'button1', "key.categories.gameplay");
  public keyBindAttack: KeyBinding = new KeyBinding("key.attack", 'button0', "key.categories.gameplay");
  public keyBindPickBlock: KeyBinding = new KeyBinding("key.pickItem", 'button2', "key.categories.gameplay");
  public keyBindChat: KeyBinding = new KeyBinding("key.chat", 't', "key.categories.multiplayer");
  public keyBindPlayerList: KeyBinding = new KeyBinding("key.playerlist", 'tab', "key.categories.multiplayer");
  public keyBindCommand: KeyBinding = new KeyBinding("key.command", ' ', "key.categories.multiplayer");
  public field_244602_au: KeyBinding = new KeyBinding("key.socialInteractions", 'p', "key.categories.multiplayer");
  public keyBindScreenshot: KeyBinding = new KeyBinding("key.screenshot", 'F2', "key.categories.misc");
  public keyBindTogglePerspective: KeyBinding = new KeyBinding("key.togglePerspective", 'F5', "key.categories.misc");
  public keyBindSmoothCamera: KeyBinding = new KeyBinding("key.smoothCamera", '', "key.categories.misc");
  public keyBindFullscreen: KeyBinding = new KeyBinding("key.fullscreen", 'F11', "key.categories.misc");
  public keyBindSpectatorOutlines: KeyBinding = new KeyBinding("key.spectatorOutlines", '', "key.categories.misc");
  public keyBindAdvancements: KeyBinding = new KeyBinding("key.advancements", 'l', "key.categories.misc");
  public keyBindSaveToolbar: KeyBinding = new KeyBinding("key.saveToolbarActivator", 'x', "key.categories.creative");
  public keyBindLoadToolbar: KeyBinding = new KeyBinding("key.loadToolbarActivator", 'c', "key.categories.creative");

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;
    this.loadOptions();
    console.log('Game settings loaded!')
    this.mc.outputLog += 'Game settings loaded!\n';
  }

  public loadOptions(): void {
    if(localStorage.getItem('Options')) {
      const optionsData = new LSStore('Options', 'get');
      
      for(const s of optionsData.keySet()) {
        const s1 = optionsData.getString(s);

        try {
          if('showFPS'.equals(s)) GameOption.SHOW_FPS.set(this, s1);
          if('advancedItemTooltips'.equals(s)) GameOption.ADVANCED_TOOLTIPS.set(this, s1);
          if('heldItemTooltips'.equals(s)) GameOption.HELD_TOOLTIPS.set(this, s1);
          if('skipMultiplayerWarning'.equals(s)) GameOption.SKIP_MULTIPLAYER_WARNING.set(this, s1);
          if('rawMouseInput'.equals(s)) GameOption.RAW_MOUSE_INPUT.set(this, s1);
          if('autoJump'.equals(s)) GameOption.AUTO_JUMP.set(this, s1);
          if('autoSuggestCommands'.equals(s)) GameOption.AUTO_SUGGEST_COMMANDS.set(this, s1);
          if('chatColor'.equals(s)) GameOption.CHAT_COLOR.set(this, s1);
          if('chatLinks'.equals(s)) GameOption.CHAT_LINKS.set(this, s1);
          if('chatLinksPrompt'.equals(s)) GameOption.CHAT_LINKS.set(this, s1);
          if('vsync'.equals(s)) GameOption.VSYNC.set(this, s1);
          if('entityShadows'.equals(s)) GameOption.ENTITY_SHADOWS.set(this, s1);
          if('forceUnicodeFont'.equals(s)) GameOption.FORCE_UNICODE_FONT.set(this, s1);
          if('invertMouse'.equals(s)) GameOption.INVERT_MOUSE.set(this, s1);
          if('discreteMouseScroll'.equals(s)) GameOption.DISCRETE_MOUSE_SCROLL.set(this, s1);
          if('realmsNotifications'.equals(s)) GameOption.REALMS_NOTIFICATIONS.set(this, s1);
          if('hideMatchedNames'.equals(s)) GameOption.HIDE_GUI.set(this, s1);
          if('reducedDebugInfo'.equals(s)) GameOption.REDUCED_DEBUG_INFO.set(this, s1);
          if('snooper'.equals(s)) GameOption.SNOOPER.set(this, s1);
          if('showSubtitles'.equals(s)) GameOption.SHOW_SUBTITLES.set(this, s1);
          if('backgroundForChatOnly'.equals(s)) this.accessibilityTextBackground = 'true'.equals(s1);
          if('touchscreen'.equals(s)) GameOption.TOUCHSCREEN.set(this, s1);
          if('fullscreen'.equals(s)) GameOption.FULLSCREEN.set(this, s1);
          if('viewBobbing'.equals(s)) GameOption.VIEW_BOBBING.set(this, s1);
          if('toggleCrouch'.equals(s)) this.toggleCrouch = 'true'.equals(s1);
          if('toggleSprint'.equals(s)) this.toggleSprint = 'true'.equals(s1);
          if('hideGUI'.equals(s)) GameOption.HIDE_GUI.set(this, s1);
          if('showDebugInfo'.equals(s)) this.showDebugInfo = 'true'.equals(s1);
          if('fov'.equals(s)) this.fov = (parseFloat(s1) * 40.0 + 70.0);
          if('screenEffectScale'.equals(s)) this.screenEffectScale = parseFloat(s1);
          if('fovEffectScale'.equals(s)) this.fovScaleEffect = parseFloat(s1);
          if('biomeBlendRadius'.equals(s)) this.biomeBlendRadius = parseInt(s1);
          if('mouseWheelSensitivity'.equals(s)) this.mouseWheelSensitivity = parseFloat(s1);
          if('gamma'.equals(s)) this.gamma = parseFloat(s1);
          if('guiScale'.equals(s)) this.guiScale = parseInt(s1);
          if('mouseSensitivity'.equals(s)) this.mouseSensitivity = parseFloat(s1);
          if('renderDistanceChunks'.equals(s)) this.renderDistanceChunks = parseInt(s1);
          if('chatOpacity'.equals(s)) this.chatOpacity = parseFloat(s1);
          if('chatLineSpacing'.equals(s)) this.chatLineSpacing = parseFloat(s1);
          if('chatScale'.equals(s)) this.chatScale = parseFloat(s1);
          if('chatWidth'.equals(s)) this.chatWidth = parseFloat(s1);
          if('chatHeightUnfocused'.equals(s)) this.chatHeightUnfocused = parseFloat(s1);
          if('chatHeightFocused'.equals(s)) this.chatHeightFocused = parseFloat(s1);
          if('chatDelay'.equals(s)) this.chatDelay = parseFloat(s1);
          if('textBackgroundOpacity'.equals(s)) this.accessibilityTextBackgroundOpacity = parseFloat(s1);
          if('framerateLimit'.equals(s)) this.framerateLimit = parseInt(s1)
          if('language'.equals(s)) this.language = s1;
          if('graphicsMode'.equals(s)) this.graphicFanciness = GraphicsFanciness.byId(parseInt(s1));
          if('renderClouds'.equals(s)) {
            if('true'.equals(s1)) {
              this.cloudOption = CloudOption.FANCY;
            } else if('false'.equals(s1)) {
              this.cloudOption = CloudOption.OFF;
            } else if('fast'.equals(s1)) {
              this.cloudOption = CloudOption.FAST;
            }
          }
          if('ambientOcclusionStatus'.equals(s)) this.ambientOcclusionStatus = AmbientOcclusionStatus.byId(parseInt(s1));
          if('attackIndicator'.equals(s)) this.attackIndicator = AttackIndicatorStatus.byId(parseInt(s1));
          if('narrator'.equals(s)) this.narrator = NarratorStatus.byId(parseInt(s1));
          if('chatVisibility'.equals(s)) this.chatVisibility = ChatVisibility.byId(parseInt(s1));
          if('mainHand'.equals(s)) this.mainHand = 'left'.equals(s1) ? HandSide.LEFT : HandSide.RIGHT;
          if('particles'.equals(s)) this.particles = ParticleStatus.byId(parseInt(s1));
          if('pointOfView'.equals(s)) this.pointOfView = PointOfView.byId(parseInt(s1));
          for(const soundcategory of Object.values(SoundCategory).slice(0, -1)) {
            if (s.equals(`soundCategory_${soundcategory.getName()}`)) {
              this.soundLevels.set(soundcategory, parseFloat(s1));
            }
          }
        } catch (e) {
          console.warn('Skipping bad option: {}:{}', s, s1);
        }
      }
    }
  }

  public saveOptions(): void {
    const lsoptions = new LSStore('Options', 'create');
    try {
      lsoptions.addLine('showFPS:' + GameOption.SHOW_FPS.get(this));
      lsoptions.addLine('skipMultiplayerWarning:' + GameOption.SKIP_MULTIPLAYER_WARNING.get(this));
      lsoptions.addLine('language:' + this.language);
      lsoptions.addLine('advancedItemTooltips:' + GameOption.ADVANCED_TOOLTIPS.get(this));
      lsoptions.addLine('heldItemTooltips:' + GameOption.HELD_TOOLTIPS.get(this));
      lsoptions.addLine('rawMouseInput:' + GameOption.RAW_MOUSE_INPUT.get(this));
      lsoptions.addLine('autoJump:' + GameOption.AUTO_JUMP.get(this));
      lsoptions.addLine('vsync:' + GameOption.VSYNC.get(this));
      lsoptions.addLine('forceUnicodeFont:' + GameOption.FORCE_UNICODE_FONT.get(this));
      lsoptions.addLine('showSubtitles:' + GameOption.SHOW_SUBTITLES.get(this));
      lsoptions.addLine('hideGUI:' + GameOption.HIDE_GUI.get(this));
      lsoptions.addLine('toggleCrouch:' + this.toggleCrouch);
      lsoptions.addLine('toggleSprint:' + this.toggleSprint);
      lsoptions.addLine('chatScale:' + this.chatScale);
      lsoptions.addLine('ambientOcclusionStatus:' + this.ambientOcclusionStatus.getId());
      lsoptions.addLine('attackIndicator:' + this.attackIndicator.getId());
      lsoptions.addLine('narrator:' + this.narrator.getId());
      lsoptions.addLine('chatVisibility:' + this.chatVisibility.getId());
      lsoptions.addLine('mainHand:' + (this.mainHand === HandSide.LEFT ? 'left' : 'right'));
      lsoptions.addLine('particles:' + this.particles.getId());
      lsoptions.addLine('pointOfView:' + this.pointOfView.getId());
      lsoptions.addLine('mouseSensitivity:' + this.mouseSensitivity);
      lsoptions.addLine('renderDistanceChunks:' + this.renderDistanceChunks);
      lsoptions.addLine('chatOpacity:' + this.chatOpacity);
      lsoptions.addLine('chatLineSpacing:' + this.chatLineSpacing);
      lsoptions.addLine('chatScale:' + this.chatScale);
      lsoptions.addLine('chatWidth:' + this.chatWidth);
      lsoptions.addLine('chatHeightUnfocused:' + this.chatHeightUnfocused);
      lsoptions.addLine('chatHeightFocused:' + this.chatHeightFocused);
      lsoptions.addLine('chatDelay:' + this.chatDelay);
      lsoptions.addLine('textBackgroundOpacity:' + this.accessibilityTextBackgroundOpacity);
      lsoptions.addLine('framerateLimit:' + this.framerateLimit);
      lsoptions.addLine('biomeBlendRadius:' + this.biomeBlendRadius);
      lsoptions.addLine('mouseWheelSensitivity:' + this.mouseWheelSensitivity);
      lsoptions.addLine('autoSuggestCommands:' + GameOption.AUTO_SUGGEST_COMMANDS.get(this));
      lsoptions.addLine('chatColor:' + GameOption.CHAT_COLOR.get(this));
      lsoptions.addLine('chatLinks:' + GameOption.CHAT_LINKS.get(this));
      lsoptions.addLine('chatLinksPrompt:' + GameOption.CHAT_LINKS_PROMPT.get(this));
      lsoptions.addLine('entityShadows:' + GameOption.ENTITY_SHADOWS.get(this));
      lsoptions.addLine('invertMouse:' + GameOption.INVERT_MOUSE.get(this));
      lsoptions.addLine('discreteMouseScroll:' + GameOption.DISCRETE_MOUSE_SCROLL.get(this));
      lsoptions.addLine('realmsNotifications:' + GameOption.REALMS_NOTIFICATIONS.get(this));
      lsoptions.addLine('hideMatchedNames:' + this.hideMatchedNames);
      lsoptions.addLine('reducedDebugInfo:' + GameOption.REDUCED_DEBUG_INFO.get(this));
      lsoptions.addLine('snooper:' + GameOption.SNOOPER.get(this));
      lsoptions.addLine('backgroundForChatOnly:' + this.accessibilityTextBackground);
      lsoptions.addLine('touchscreen:' + GameOption.TOUCHSCREEN.get(this));
      lsoptions.addLine('fullscreen:' + GameOption.FULLSCREEN.get(this));
      lsoptions.addLine('viewBobbing:' + GameOption.VIEW_BOBBING.get(this));
      lsoptions.addLine('showDebugInfo:' + this.showDebugInfo);
      lsoptions.addLine('fov:' + (this.fov - 70) / 40);
      lsoptions.addLine('screenEffectScale:' + this.screenEffectScale);
      lsoptions.addLine('fovScaleEffect:' + this.fovScaleEffect);
      lsoptions.addLine('gamma:' + this.gamma);
      lsoptions.addLine('guiScale:' + this.guiScale);
      lsoptions.addLine("graphicsMode:" + this.graphicFanciness.getId());
      switch(this.cloudOption) {
        case CloudOption.FANCY:
          lsoptions.addLine("renderClouds:true");
          break;
        case CloudOption.FAST:
          lsoptions.addLine("renderClouds:fast");
          break;
        case CloudOption.OFF:
          lsoptions.addLine("renderClouds:false");
          break;
      }
      for(const soundcategory of Object.values(SoundCategory).slice(0, -1)) {
        lsoptions.addLine(`soundCategory_${soundcategory.getName()}:` + this.getSoundLevel(soundcategory));
      }
      lsoptions.saveToLS();
    } catch (e) {
      console.error('Failed to save options', e);
    }
  }

  public getSoundLevel(category: SoundCategory) {
    return this.soundLevels.has(category) ? this.soundLevels.get(category) : 1.0;
  }

  public setSoundLevel(category: SoundCategory, volume: number) {
    this.soundLevels.set(category, volume);
  }

  public getModelParts(): Set<PlayerModelPart> {
    const copy: Set<PlayerModelPart> = new Set()
    for (const item of this.setModelParts) copy.add(item)
    return copy;
  }


  public switchModelPartEnabled(modelPart: PlayerModelPart) {
    if (this.getModelParts().has(modelPart)) {
       this.setModelParts.delete(modelPart);
    } else {
       this.setModelParts.add(modelPart);
    }
  }
}