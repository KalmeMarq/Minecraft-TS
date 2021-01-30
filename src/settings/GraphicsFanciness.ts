class GraphicsFancinessEnum {
  private id: number;
  private key: string;
  
  constructor(id: number, keyIn: string) {
    this.id = id;
    this.key = keyIn;
 }

  public getId(): number {
    return this.id;
  }

  public getKey(): string {
    return this.key;
  }
}

export default class GraphicsFanciness {
  static FAST = new GraphicsFancinessEnum(0, "options.graphics.fast");
  static FANCY = new GraphicsFancinessEnum(1, "options.graphics.fancy");
  static FABULOUS = new GraphicsFancinessEnum(2, "options.graphics.fabulous");

  public static byId(id: number) {
    return Object.values(GraphicsFanciness).find(o => o.getId() === id);
  }
}