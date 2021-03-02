import ResourceLocation from "../ResourceLocation";

export class SoundEvent {
  private name: ResourceLocation;

  constructor(name: ResourceLocation) {
    this.name = name;
  }

  public getName(): ResourceLocation {
    return this.name;
  }
}