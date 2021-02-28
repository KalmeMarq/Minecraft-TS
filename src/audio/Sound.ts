export default class Sounds {
  public static clickStereo = new Sounds('click_stereo', './resources/assets/minecraft/sounds/click_stereo.ogg');

  private soundName: string;
  private soundSrc: string;
  
  private constructor(name: string, buffersrc: any) {
    this.soundName = name;
    this.soundSrc = buffersrc;
  }

  public getSoundName(): string {
    return this.soundName;
  }

  public getBufferSrc(): string {
    return this.soundSrc;
  }
}