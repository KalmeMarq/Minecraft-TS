export default class GameLoop {
  private readonly loopID: number = 0
  private readonly running: boolean = true

  public start (callback: () => void): void {
    const loop = (): void => {
      if (!this.running) this.stop()
      requestAnimationFrame(loop)
      callback()
    }

    loop()
  }

  public stop (): void {
    cancelAnimationFrame(this.loopID)
  }
}
