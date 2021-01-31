import Minecraft from "./Minecraft.js";
import CloudOption from "./settings/CloudOption.js";
import GraphicsFanciness from "./settings/GraphicsFanciness.js";
import KeyBinding from "./settings/KeyBinding.js";

export default class GameSettings {
  protected mc;
  private optionsLS: string = 'GameSettings';
  public graphicFanciness = GraphicsFanciness[0];
  public cloudsOption = CloudOption[0];
  public mouseSensitivity: number = 0.5;
  public renderDistanceChunks: number = -1;
  public chatOpacity: number = 1.0;
  public chatLineSpacing: number = 0.0;
  public chatScale: number = 1.0;
  public chatWidth: number = 1.0;
  public chatHeightUnfocused: number = 0.44366196;
  public chatHeightFocused: number = 1.0;
  public chatDelay: number = 0.0;
  public accessibilityTextBackgroundOpacity: number = 0.5;
  public advancedItemTooltips: boolean = false;
  public heldItemTooltips: boolean = true;
  public testthing: boolean = false;
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
  public reducedDebugInfo: boolean = false;
  public snooper: boolean = true;
  public showSubtitles: boolean = false;
  public accessibilityTextBackground: boolean = true;
  public touchscreen: boolean = false;
  public fullscreen: boolean = false;
  public viewBobbing: boolean = true;
  public toggleCrouch: boolean = false;
  public toggleSprint: boolean = false;
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
    // this.mc.outputLog += '\n Game Options Loaded'
  }

  public loadOptions(): void {
    if(localStorage.getItem('GameSettings')) {
      const Options: GameSettings = JSON.parse(localStorage.getItem('GameSettings')!);

      this.testthing = Options.testthing ? Options.testthing : this.testthing;
      this.framerateLimit = Options.framerateLimit ? Options.framerateLimit : this.framerateLimit;
      this.showFPS = Options.showFPS ? Options.showFPS : this.showFPS;
      this.language = Options.language ? Options.language : this.language;
      this.advancedItemTooltips = Options.advancedItemTooltips ? Options.advancedItemTooltips : this.advancedItemTooltips;
      this.heldItemTooltips = Options.heldItemTooltips ? Options.heldItemTooltips : this.heldItemTooltips;
      this.rawMouseInput = Options.rawMouseInput ? Options.rawMouseInput : this.rawMouseInput;
      this.skipMultiplayerWarning = Options.skipMultiplayerWarning ? Options.skipMultiplayerWarning : this.skipMultiplayerWarning;
      this.autoJump = Options.autoJump ? Options.autoJump : this.autoJump;
      this.vsync = Options.vsync ? Options.vsync : this.vsync;
      this.forceUnicodeFont = Options.forceUnicodeFont ? Options.forceUnicodeFont : this.forceUnicodeFont;
      this.showSubtitles = Options.showSubtitles ? Options.showSubtitles : this.showSubtitles;
      this.hideGUI = Options.hideGUI ? Options.hideGUI : this.hideGUI;
      this.graphicFanciness = Options.graphicFanciness ? Options.graphicFanciness : this.graphicFanciness;
      this.cloudsOption = Options.cloudsOption ? Options.cloudsOption : this.cloudsOption;
    }
  }

  public saveOptions(): void {
    localStorage.setItem('GameSettings', JSON.stringify({
      testthing: this.testthing,
      framerateLimit: this.framerateLimit,
      showFPS: this.showFPS,
      skipMultiplayerWarning: this.skipMultiplayerWarning,
      language: this.language,
      advancedItemTooltips: this.advancedItemTooltips,
      heldItemTooltips: this.heldItemTooltips,
      rawMouseInput: this.rawMouseInput,
      autoJump: this.autoJump,
      vsync: this.vsync,
      forceUnicodeFont: this.forceUnicodeFont,
      showSubtitles: this.showSubtitles,
      hideGUI: this.hideGUI,
      graphicFanciness: this.graphicFanciness,
      cloudsOption: this.cloudsOption
    }));

    // this.mc.outputLog += '\n Game Options Saved'
  }

  public test(i: string): boolean {
    if(Object.prototype.hasOwnProperty.call(this, i)) {
       // @ts-ignore: Unreachable code error
      return this[i];
    }
    return false;
  }

  public accept(i: string, value: boolean): boolean {
    if(Object.prototype.hasOwnProperty.call(this, i)) {
      // @ts-ignore: Unreachable code error
      return this[i] = value;
    }
    return false;
  }
}