import { TextComponent } from "../util/text/TextComponent";
import PackMetadataSectionSerializer from "./PackMetadataSectionSerializer";
export class PackMetadataSection {
  public static readonly SERIALIZER: PackMetadataSectionSerializer = new PackMetadataSectionSerializer();
  private readonly description: TextComponent;
  private readonly packFormat: number;

  public constructor(description: TextComponent, format: number) {
    this.description = description;
    this.packFormat = format;
  }

  public getDescription(): TextComponent {
    return this.description;
  }

  public getPackFormat(): number {
    return this.packFormat;
  }
}