export default class ResourceLocation {
  private path: string

  public constructor(path: string) {
    this.path = path
  }

  public getPath(): string {
    return this.path
  }
}