export default class Timer {
  public renderPartialTicks = 0;
  public elapsedPartialTicks = 0;
  private lastSyncSysClock;
  private readonly tickLength;

  constructor(ticks: number, lastSyncSysClock: number) {
    this.tickLength = 1000.0 / ticks;
    this.lastSyncSysClock = lastSyncSysClock;
  }

  public getPartialTicks(gameTime: number) {
    this.elapsedPartialTicks = (gameTime - this.lastSyncSysClock) / this.tickLength;
    this.lastSyncSysClock = gameTime;
    this.renderPartialTicks += this.elapsedPartialTicks;
    let i = Math.ceil(this.renderPartialTicks);
    this.renderPartialTicks -= i;
    return i;
  }
}