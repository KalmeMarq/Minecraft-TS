import ResourceLocation from "../resources/ResourceLocation";
import BiBetterMap from "./BiBetterMap";
import CustomMap from "./CustomMap";
import MutableRegistry from "./MutableRegistry";
import Registry from "./Registry";
import RegistryKey from "./RegistryKey";

export default class SimpleRegistry<T> extends MutableRegistry<T> {
  private nextId: number = 0;

  private readonly byId: Array<T> = new Array(256);
  private readonly storage: BiBetterMap<ResourceLocation, T>;
  private readonly keyStorage: CustomMap<RegistryKey<T>, T>;

  public constructor(key: RegistryKey<Registry<T>>) {
    super(key)
    this.storage = new BiBetterMap();
    this.keyStorage = new CustomMap();
  }

  public registerMapping<V extends T>(id: number, key: RegistryKey<T>, value: V): V {
    this.storage.set(key.getLocation(), value as T);
    this.keyStorage.set(key, value as T);

    if (this.nextId <= id) {
      this.nextId = id + 1;
    }
    return value;
  }

  public register<V extends T>(key: RegistryKey<T>, value: V): V {
    return this.registerMapping(this.nextId, key, value)
  }

  public getKey(value: T): ResourceLocation | undefined {
    return this.storage.reverse().get(value);
  }

  public get(p_230516_1_: RegistryKey<T> | undefined): T | undefined {
    return this.keyStorage.get(p_230516_1_);
  }
}