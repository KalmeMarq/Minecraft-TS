import BasicChestContainer from "../../inventory/BasicChestContainer";
import Container from "../../inventory/Container";
import PlayerContainer from "../../inventory/PlayerContainer";
import MathHelper from "../../util/MathHelper";
import DataParameter from "./DataParameter";
import FoodStats from "./FoodStats";
import PlayerDataManager from "./PlayerDataManager";
import PlayerInventory from "./PlayerInventory";

export default class Player {
  protected entityData: PlayerDataManager;
  private static readonly DATA_HEALTH_ID: DataParameter<number> = PlayerDataManager.defineId(Player.prototype);
  public readonly inventory: PlayerInventory = new PlayerInventory(this);
  protected foodData: FoodStats = new FoodStats();
  public experienceLevel: number = 0;
  public totalExperience: number = 0;
  public experienceProgress: number = 0;
  private reducedDebugInfo: boolean = false;
  private showDeathScreen: boolean = false;
  public readonly inventoryMenu: PlayerContainer
  public containerMenu: Container;

  public constructor() {
    this.entityData = new PlayerDataManager(this);
    this.inventoryMenu = new PlayerContainer(this.inventory, true, this);
    this.containerMenu = this.inventoryMenu;
  }

  public getHealth(): number {
    return this.entityData.get(Player.DATA_HEALTH_ID);
  }

  public setHealth(value: number): void {
    this.entityData.set(Player.DATA_HEALTH_ID, MathHelper.clamp(value, 0, 20));
  }

  public isDeadOrDying(): boolean {
    return this.getHealth() <= 0;
  }
  
  public shouldShowDeathScreen(): boolean {
    return this.showDeathScreen;
  }

  public equals(compareTo: Object): boolean {
    if(compareTo === this) {
      return true;
    } else if(compareTo instanceof Player) {
      return true;
    } else {
      return false;
    }
  }
}