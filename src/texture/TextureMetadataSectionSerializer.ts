import { IMetadataSectionSerializer } from "../util/interfaces/IMetadataSectionSerializer";
import JSONUtils from "../util/JSONUtils";
import TextureMetadataSection from "./TextureMetadataSection";

export default class TextureMetadataSectionSerializer implements IMetadataSectionSerializer<TextureMetadataSection> {
  public fromJson(obj: Object): TextureMetadataSection {
    let flag = JSONUtils.getAsBoolean(obj, "blur", false);
    let flag1 = JSONUtils.getAsBoolean(obj, "clamp", false);
    return new TextureMetadataSection(flag, flag1);
  }

  public getMetadataSectionName(): string {
    return "texture";
  }
}