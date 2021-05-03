import IllegalArgumentException from "../util/exceptions/IllegalArgumentException"
import Util from "../util/Util"

export enum Group {
  HAND,
  ARMOR
}

export default class EquipmentSlotType {
  public static MAINHAND = new EquipmentSlotType(Group.HAND, 0, 0, "mainhand")
  public static OFFHAND = new EquipmentSlotType(Group.HAND, 1, 5, "offhand")
  public static FEET = new EquipmentSlotType(Group.ARMOR, 0, 1, "feet")
  public static LEGS = new EquipmentSlotType(Group.ARMOR, 1, 2, "legs")
  public static CHEST = new EquipmentSlotType(Group.ARMOR, 2, 3, "chest")
  public static HEAD = new EquipmentSlotType(Group.ARMOR, 3, 4, "head")

  private readonly type: Group;
  private readonly index: number;
  private readonly filterFlag: number;
  private readonly name: string;

  private constructor(type: Group, index: number, filterFlag: number, name: string) {
    this.type = type;
    this.index = index;
    this.filterFlag = filterFlag;
    this.name = name;
  }

  public getType(): Group {
    return this.type;
  }

  public getIndex(): number {
    return this.index;
  }

  public getFilterFlag(): number {
    return this.filterFlag;
  }

  public getName(): string {
    return this.name;
  }

  public static byName(name: string): EquipmentSlotType {
    for(const equipmentslottype of Object.values(this) as EquipmentSlotType[]) {
        if(Util.equals(equipmentslottype.getName(), name)) {
          return equipmentslottype;
        }
    }

    throw new IllegalArgumentException(`Invalid slot '${name}'`);
  }

  public static byTypeAndIndex(group: Group, index: number): EquipmentSlotType {
    for(const equipmentslottype of Object.values(this) as EquipmentSlotType[]) {
        if (equipmentslottype.getType() == group && equipmentslottype.getIndex() == index) {
          return equipmentslottype;
        }
    }

    throw new IllegalArgumentException("Invalid slot '" + group + "': " + index);
  }
}