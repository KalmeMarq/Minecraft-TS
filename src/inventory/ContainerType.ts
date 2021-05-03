import PlayerInventory from "../world/player/PlayerInventory";
import BasicChestContainer from "./BasicChestContainer";
import Container from "./Container";

export default class ContainerType<T extends Container> {
  public static BASIC_CHEST: ContainerType<BasicChestContainer> = ContainerType.register("basic_chest", (id: number, inventory: PlayerInventory) => {
    return new BasicChestContainer(id, inventory);
  });
  private readonly contConstructor: IFactory<T>;

  private static register<T extends Container>(name: string, creator: IFactory<T>): ContainerType<T> {
    return new ContainerType(creator);
  }

  private constructor(creator: IFactory<T>) {
    this.contConstructor = creator;
  }

  public create(id: number, inventory: PlayerInventory): T {
    return this.contConstructor(id, inventory);
  }

  public equals(compareTo: Object): boolean {
    if(compareTo === this) {
      return true;
    } else {
      return false;
    }
  }
}

type IFactory<T extends Container> = (id: number, inventory: PlayerInventory) => T;