import IInventory from "../../util/interfaces/IInventory";
import { TextComponent } from "../../util/text/TextComponent";
import Player from "./Player";

export default class PlayerInventory implements IInventory {
  public items: any[] = new Array(36);
  public armor: any[] = new Array(4);
  public offhand: any[] = new Array(1);
  private compartments = [this.items, this.armor, this.offhand]
  public selected: number = -1;
  public player: Player;

  public constructor(player: Player) {
    this.player = player;
  }

  public static getSelectionSize(): number {
    return 9;
  }

  public getContainerSize(): number {
    return this.items.length + this.armor.length + this.offhand.length;
  }

  public getName(): TextComponent {
    return new TextComponent("container.inventory");
  }
}