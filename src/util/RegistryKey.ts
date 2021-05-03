import ResourceLocation from "../resources/ResourceLocation";
import Registry from "./Registry";

export default class RegistryKey<T> {
  private static readonly VALUES: Map<String, RegistryKey<any>> = new Map();
  private readonly registryName: ResourceLocation;
  private readonly location: ResourceLocation;

  public static createRegistryKey<T>(location: ResourceLocation): any {
    return RegistryKey.create(Registry.ROOT_REGISTRY_NAME, location);
  }

  public static create<T>(registrylocation: ResourceLocation | RegistryKey<any>, location: ResourceLocation): RegistryKey<T> {
    if(registrylocation instanceof RegistryKey) {
      let s = (registrylocation.location + ":" + location);

      if(!RegistryKey.VALUES.has(s)) {
        RegistryKey.VALUES.set(s, new RegistryKey(registrylocation.location, location))
      }
  
      return RegistryKey.VALUES.get(s) as RegistryKey<T>;
    } else {
      let s = (registrylocation + ":" + location);

      if(!RegistryKey.VALUES.has(s)) {
        RegistryKey.VALUES.set(s, new RegistryKey(registrylocation, location))
      }
  
      return RegistryKey.VALUES.get(s) as RegistryKey<T>;
    }
  }

  private constructor(registrylocation: ResourceLocation, location: ResourceLocation) {
    this.registryName = registrylocation;
    this.location = location;
  }

  public getLocation(): ResourceLocation {
    return this.location;
  }

  public toString(): string {
    return `ResourceKey[${this.registryName} / ${this.location}]`;
  }
}