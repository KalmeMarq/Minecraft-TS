import TextureMetadataSectionSerializer from "./TextureMetadataSectionSerializer";

export default class TextureMetadataSection {
  public static readonly SERIALIZER: TextureMetadataSectionSerializer = new TextureMetadataSectionSerializer();
  private readonly blur: boolean;
  private readonly clamp: boolean;

  public constructor(blur: boolean, clamp: boolean) {
    this.blur = blur;
    this.clamp = clamp;
  }

  public isBlur(): boolean {
    return this.blur;
  }

  public isClamp(): boolean {
    return this.clamp;
  }
}