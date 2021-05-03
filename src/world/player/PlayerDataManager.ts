import CustomMap from "../../util/CustomMap";
import Exception from "../../util/exceptions/Exception";
import DataParameter from "./DataParameter";
import Player from "./Player";

export default class PlayerDataManager {
  private entity: Player;
  private static ENTITY_ID_POOL: CustomMap<Player, number> = new CustomMap();
  private itemsById: Map<number, DataEntry<any>> = new Map();

  public constructor(entity: Player) {
    this.entity = entity;
  }

  public static defineId<T>(entity: Player): DataParameter<T> {
    let j = 0;

    if(PlayerDataManager.ENTITY_ID_POOL.has(entity)) {
      j = (PlayerDataManager.ENTITY_ID_POOL.get(entity) as unknown) as number + 1;
    }  else {
      j = PlayerDataManager.ENTITY_ID_POOL.size();
    }

    if (j > 254) {
      throw new Exception(`Data value id is too big with ${j}! (Max is ${254})`);
    } else {
      PlayerDataManager.ENTITY_ID_POOL.set(entity, j);
      return new DataParameter(j);
    }
  }

  private getItem<T>(param: DataParameter<T>): DataEntry<T> {
    let dataentry: DataEntry<T>
    if(this.itemsById.has(param.getId())) {
      dataentry = (this.itemsById.get(param.getId()) as unknown) as DataEntry<T>;
    } else throw new Exception(`Failed to get entity data \n Data ID: ${param.toString()}`)
    
    return dataentry;
  }

  public set<T>(param: DataParameter<T>, value: T): void {
    let dataentry: DataEntry<T> = this.getItem(param);
    if(value !== dataentry.getValue()) dataentry.setValue(value);
  }

  public get<T>(param: DataParameter<T>): T {
    return this.getItem(param).getValue();
  }
}
export class DataEntry<T> {
  private readonly accessor: DataParameter<T>;
  private value: T;

  public constructor(param: DataParameter<T>, value: T) {
    this.accessor = param;
    this.value = value;
  }

  public getAccessor(): DataParameter<T> {
    return this.accessor;
  }

  public setValue(value: T): void {
    this.value = value;
  }

  public getValue(): T {
    return this.value;
  }
}