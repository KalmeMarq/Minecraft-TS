
export default class Food {
  private readonly nutrition: number;
  private readonly saturationModifier: number;
  private readonly meat: boolean;
  private readonly canEatAlways: boolean;
  private readonly fastFood: boolean;

  public constructor(nutrition: number, saturationMod: number, isMeat: boolean, canAlwaysEat: boolean, fastFood: boolean) {
    this.nutrition = nutrition;
    this.saturationModifier = saturationMod;
    this.meat = isMeat;
    this.canEatAlways = canAlwaysEat;
    this.fastFood = fastFood;
  }

  public getNutrition(): number {
    return this.nutrition;
  }

  public getSaturationModifier(): number {
    return this.saturationModifier;
  }

  public isMeat(): boolean {
    return this.meat;
  }

  public canAlwaysEat(): boolean  {
    return this.canEatAlways;
  }

  public isFastFood(): boolean {
    return this.fastFood;
  }
}
export class FoodBuilder {
  private _nutrition: number = 0;
  private saturationModifier: number = 0;
  private isMeat: boolean = false;
  private canEatAlways: boolean = false;
  private fastFood: boolean = false;

  public nutrition(nutrition: number): FoodBuilder {
     this._nutrition = nutrition;
     return this;
  }

  public saturationMod(mod: number): FoodBuilder {
    this.saturationModifier = mod;
    return this;
  }

  public meat(): FoodBuilder {
    this.isMeat = true;
    return this;
  }

  public alwaysEat(): FoodBuilder {
    this.canEatAlways = true;
    return this;
  }

  public fast(): FoodBuilder {
    this.fastFood = true;
    return this;
  }

  public build(): Food {
    return new Food(this._nutrition, this.saturationModifier, this.isMeat, this.canEatAlways, this.fastFood);
  }
}