export default class Timer {
  public partialTick = 0
  public tickDelta = 0
  private lastMs = 0
  private readonly msPerTick: number = 0

  constructor (ticks: number, lastMs: number) {
    this.msPerTick = 1000 / ticks
    this.lastMs = lastMs
  }

  public advanceTime (time: number): number {
    this.tickDelta = (time - this.lastMs) / this.msPerTick
    this.lastMs = time
    this.partialTick += this.tickDelta
    const i = Math.floor(this.partialTick)
    this.partialTick -= i
    return i
  }
}
