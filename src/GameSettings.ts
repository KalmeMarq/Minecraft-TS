import Minecraft from "./Minecraft.js";

export default class GameSettings {
 
  public testthing: boolean = false;
  public framerateLimit: number = 60;
  public showFPS: boolean = true;
  public mc;

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;
  }

  test(i: string): boolean {
    if(Object.prototype.hasOwnProperty.call(this, i)) {
       // @ts-ignore: Unreachable code error
      return this[i];
    }
    return false;
  }

  accept(i: string, value: boolean): boolean {
    if(Object.prototype.hasOwnProperty.call(this, i)) {
       // @ts-ignore: Unreachable code error
      return this[i] = value;
    }
    return false;
  }
}