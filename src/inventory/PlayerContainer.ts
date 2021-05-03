import ResourceLocation from "../resources/ResourceLocation";
import Player from "../world/player/Player";
import PlayerInventory from "../world/player/PlayerInventory";
import Container from "./Container";
import CraftingInventory from "./CraftingInventory";
import EquipmentSlotType from "./EquipmentSlotType";
import Slot from "./Slot";

export default class PlayerContainer extends Container {
  public static readonly EMPTY_ARMOR_SLOT_HELMET: ResourceLocation = new ResourceLocation("item/empty_armor_slot_helmet");
  public static readonly EMPTY_ARMOR_SLOT_CHESTPLATE: ResourceLocation = new ResourceLocation("item/empty_armor_slot_chestplate");
  public static readonly EMPTY_ARMOR_SLOT_LEGGINGS: ResourceLocation = new ResourceLocation("item/empty_armor_slot_leggings");
  public static readonly EMPTY_ARMOR_SLOT_BOOTS: ResourceLocation = new ResourceLocation("item/empty_armor_slot_boots");
  public static readonly EMPTY_ARMOR_SLOT_SHIELD: ResourceLocation = new ResourceLocation("item/empty_armor_slot_shield");
  private static TEXTURE_EMPTY_SLOTS: Readonly<ResourceLocation[]> = [PlayerContainer.EMPTY_ARMOR_SLOT_BOOTS, PlayerContainer.EMPTY_ARMOR_SLOT_LEGGINGS, PlayerContainer.EMPTY_ARMOR_SLOT_CHESTPLATE, PlayerContainer.EMPTY_ARMOR_SLOT_HELMET];
  private static SLOT_IDS: Readonly<EquipmentSlotType[]> = [EquipmentSlotType.HEAD, EquipmentSlotType.CHEST, EquipmentSlotType.LEGS, EquipmentSlotType.FEET];
  private readonly craftSlots: CraftingInventory = new CraftingInventory(this, 2, 2);
  public readonly active: boolean;
  private readonly owner: Player;

  public constructor(inventory: PlayerInventory, active: boolean, owner: Player) {
    super(undefined, 0);
    this.active = active;
    this.owner = owner;

    for(let i = 0; i < 2; ++i) {
      for(let j = 0; j < 2; ++j) {
        this.addSlot(new Slot(this.craftSlots, j + i * 2, 98 + j * 18, 18 + i * 18));
      }
    }

    for(let l = 0; l < 3; ++l) {
      for(let j1 = 0; j1 < 9; ++j1) {
         this.addSlot(new Slot(inventory, j1 + (l + 1) * 9, 8 + j1 * 18, 84 + l * 18));
      }
    }

    for(let i1 = 0; i1 < 9; ++i1) {
      this.addSlot(new Slot(inventory, i1, 8 + i1 * 18, 142));
    }
  }

  public getResultSlotIndex(): number {
    return 0;
  }

  public getCraftSlots(): CraftingInventory {
    return this.craftSlots;
  }

  public getGridWidth(): number {
    return this.craftSlots.getWidth();
  }

  public getGridHeight(): number {
    return this.craftSlots.getHeight();
  }

  public getSize(): number {
    return 5;
  }
}