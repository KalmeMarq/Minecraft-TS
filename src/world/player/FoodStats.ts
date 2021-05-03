
export default class FoodStats {
  private foodLevel: number = 20;
  private saturationLevel: number = 0;
  private exhaustionLevel: number = 0;
  private tickTimer: number = 0;
  private lastFoodLevel: number = 20;

  public constructor() {
    this.saturationLevel = 5;
  }

  public getFoodLevel(): number {
    return this.foodLevel;
  }

  public needsFood(): boolean {
    return this.foodLevel < 20;
  }

  public addExhaustion(value: number): void {
    this.exhaustionLevel = Math.min(this.exhaustionLevel + value, 40);
  }

  public getSaturationLevel(): number {
    return this.saturationLevel;
  }

  public setFoodLevel(value: number): void {
    this.foodLevel = value;
  }

  public setSaturation(value: number): void {
    this.saturationLevel = value;
  }
}