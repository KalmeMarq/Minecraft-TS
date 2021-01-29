import Minecraft from "./Minecraft.js";

export default class GameSettings {
  protected mc;
  public mouseSensitivity: number = 0.5;
  public testthing: boolean = false;
  public framerateLimit: number = 60;
  public showFPS: boolean = true;
  public skipMultiplayerWarning: boolean = false;
  public language: string = 'en_us';

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;
    this.loadOptions();
  }

  public loadOptions(): void {
    localStorage.getItem('GameSettings') ? () => {
      const Options: GameSettings = JSON.parse(localStorage.getItem('GameSettings')!);

      this.testthing = Options.testthing;
      this.framerateLimit = Options.framerateLimit;
      this.showFPS = Options.showFPS;
      this.skipMultiplayerWarning = Options.skipMultiplayerWarning;
      this.language = Options.language;
    } : null
  }

  public saveOptions(): void {
    localStorage.setItem('GameSettings', JSON.stringify({
      testthing: this.testthing,
      framerateLimit: this.framerateLimit,
      showFPS: this.showFPS,
      skipMultiplayerWarning: this.skipMultiplayerWarning,
      language: this.language
    }));
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