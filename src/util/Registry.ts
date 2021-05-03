import SoundEvent from "../audio/SoundEvent";
import SoundEvents from "../audio/SoundEvents";
import Block from "../block/Block";
import Blocks from "../block/Blocks";
import Enchantment from "../enchantment/Enchantment";
import Enchantments from "../enchantment/Enchantments";
import ContainerType from "../inventory/ContainerType";
import Item from "../item/Item";
import Items from "../item/Items";
import Effect from "../potion/Effect";
import Effects from "../potion/Effects";
import ResourceLocation from "../resources/ResourceLocation";
import DefaultedRegistry from "./DefaultedRegistry";
import ISupplier from "./interfaces/ISupplier";
import MutableRegistry from "./MutableRegistry";
import RegistryKey from "./RegistryKey";
import SimpleRegistry from "./SimpleRegistry";

export default abstract class Registry<T> {
  public static readonly ROOT_REGISTRY_NAME: ResourceLocation = new ResourceLocation("root");
  protected static readonly WRITABLE_REGISTRY: any = new SimpleRegistry(Registry.createRegistryKey("root"));
  public static readonly SOUND_EVENT_REGISTRY: RegistryKey<Registry<SoundEvent>> = Registry.createRegistryKey("sound_event");
  public static readonly MOB_EFFECT_REGISTRY: RegistryKey<Registry<Effect>> = Registry.createRegistryKey("mob_effect");
  public static readonly BLOCK_REGISTRY:  RegistryKey<Registry<Block>> = Registry.createRegistryKey("block");
  public static readonly ITEM_REGISTRY: RegistryKey<Registry<Item>> = Registry.createRegistryKey("item");
  public static readonly MENU_REGISTRY = Registry.createRegistryKey("menu");
  public static readonly ENCHANTMENT_REGISTRY: RegistryKey<Registry<Enchantment>> = Registry.createRegistryKey("enchantment");
  public static readonly SOUND_EVENT: Registry<SoundEvent> = Registry.registerSimple(Registry.SOUND_EVENT_REGISTRY, () => {
    return SoundEvents.ITEM_PICKUP;
  });
  public static readonly BLOCK: DefaultedRegistry<Block> = Registry.registerDefaulted(Registry.BLOCK_REGISTRY, "air", () => {
    return Blocks.AIR;
  });
  public static readonly ITEM: DefaultedRegistry<Item> = Registry.registerDefaulted(Registry.ITEM_REGISTRY, "air", () => {
    return Items.AIR;
  });
  public static readonly MENU: Registry<ContainerType<any>> = Registry.registerSimple(Registry.MENU_REGISTRY, () => {
    return ContainerType.BASIC_CHEST;
  });
  public static ENCHANTMENT: Registry<Enchantment> = Registry.registerSimple(Registry.ENCHANTMENT_REGISTRY, () => {
    return Enchantments.BLOCK_FORTUNE;
  });
  public static readonly MOB_EFFECT: Registry<Effect> = Registry.registerSimple(Registry.MOB_EFFECT_REGISTRY, () => {
    return Effects.LUCK;
  });

  private readonly key: RegistryKey<Registry<T>>;
  protected constructor(key: RegistryKey<Registry<T>>) {
    this.key = key;
  }

  public abstract getKey(value: T): ResourceLocation | undefined;

  private static registerSimple<T>(key: RegistryKey<Registry<T>>, value: ISupplier<T>): Registry<T> {
    return Registry._registerSimple(key, value);
  }

  private static createRegistryKey<T>(name: string): RegistryKey<Registry<T>> {
    return RegistryKey.createRegistryKey(new ResourceLocation(name));
  }

  public static register<T>(registry: Registry<T>, path: string, key: T): T {
    return Registry._register(registry, new ResourceLocation(path), key);
  }

  private static registerDefaulted<T>(key: RegistryKey<Registry<T>>, p_239745_1_: string, p_239745_2_: ISupplier<T>): DefaultedRegistry<T> {
    return Registry._registerDefaulted(key, p_239745_1_, p_239745_2_);
  }

  public static _register<V, T extends V>(registry: Registry<V>, location: ResourceLocation, value: T): T {
    return (registry as any).register(RegistryKey.create(registry.key, location), value);
  }

  private static _registerDefaulted<T>(key: RegistryKey<Registry<T>>, path: string, supplier: ISupplier<T>): DefaultedRegistry<T> {
    return Registry.internalRegister(key, new DefaultedRegistry(path, key), supplier);
  }

  private static _registerSimple<T>(key: RegistryKey<Registry<T>>, supplier: ISupplier<T>): Registry<T>  {
    return Registry.internalRegister(key, new SimpleRegistry(key), supplier);
  }

  private static internalRegister<T, R extends MutableRegistry<T>>(key: RegistryKey<Registry<T>>, registry: R, supplier: ISupplier<T>): R {
    let resourcelocation: ResourceLocation = key.getLocation();
    let mutableregistry: MutableRegistry<R> = Registry.WRITABLE_REGISTRY as MutableRegistry<R>;
    return mutableregistry.register(key as RegistryKey<T>, registry) as R;
  }

  public static registerMapping<V, T extends V>(resgistry: Registry<V>, id: number, path: string, value: T): T {
    return (resgistry as MutableRegistry<V>).registerMapping(id, RegistryKey.create(resgistry.key, new ResourceLocation(path)), value);
  }
}