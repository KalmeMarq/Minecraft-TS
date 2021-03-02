import ResourceLocation from '../ResourceLocation';

export default class Sound {
  private name: ResourceLocation;
  private volume: number;
  private pitch: number;
  
  constructor(name: ResourceLocation, volumeIn: number, pitchIn: number) {
    this.name = name;
    this.volume = volumeIn;
    this.pitch = pitchIn;
  }

  public getSoundLocation(): ResourceLocation {
    return this.name;
  }

  public getVolume(): number {
    return this.volume;
 }

  public getPitch(): number {
    return this.pitch;
  }

  public cloneEntry(): Sound {
    return this;
  }

  public toString(): string {
    return 'Sound[' + this.name + ']';
  }
}