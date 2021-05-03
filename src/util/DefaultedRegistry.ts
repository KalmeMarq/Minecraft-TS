import ResourceLocation from "../resources/ResourceLocation";
import Registry from "./Registry";
import RegistryKey from "./RegistryKey";
import SimpleRegistry from "./SimpleRegistry";

export default class DefaultedRegistry<T> extends SimpleRegistry<T> {
  private readonly defaultKey: ResourceLocation;
  private defaultValue!: T;

  public constructor(path: string, p_i232506_2_: RegistryKey<Registry<T>>) {
    super(p_i232506_2_);
    this.defaultKey = new ResourceLocation(path);
  }

  public registerMapping<V extends T>(id: number, key: RegistryKey<T>, value: V): V {
    if (this.defaultKey.equals(key.getLocation())) {
      this.defaultValue = value as T;
    }

    return super.registerMapping(id, key, value);
  }

  public getKey(p_177774_1_: T): ResourceLocation {
  let resourcelocation = super.getKey(p_177774_1_);
  return resourcelocation === undefined ? this.defaultKey : resourcelocation;
  }

  public getDefaultKey(): ResourceLocation {
    return this.defaultKey;
  }
}