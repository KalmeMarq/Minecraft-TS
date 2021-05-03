import Registry from "./Registry";
import RegistryKey from "./RegistryKey";

export default abstract class MutableRegistry<T> extends Registry<T> {
  public constructor(key: RegistryKey<Registry<T>>) {
    super(key);
  }

  public abstract registerMapping<V extends T>(p_218382_1_: number, p_218382_2_: RegistryKey<T>, p_218382_3_: V): V;
  public abstract register<V extends T>(p_218381_1_: RegistryKey<T>, p_218381_2_: V): V;
}