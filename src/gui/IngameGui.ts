import Minecraft from "../Minecraft"

export default class IngameGui {
  private readonly mc: Minecraft;
  private ticks: number = 0;

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;
  }

  public renderIngameGui(context: CanvasRenderingContext2D, partialTicks: number): void {}

  public tick(): void {}

  public getTicks(): number {
    return this.ticks;
  }

  public reset(): void {}
}