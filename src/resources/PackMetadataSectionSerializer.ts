import { IMetadataSectionSerializer } from "../util/interfaces/IMetadataSectionSerializer";
import JSONUtils from "../util/JSONUtils";
import { TextComponent } from "../util/text/TextComponent";
import JSONObject from "../util/useless/JSONObject";
import { PackMetadataSection } from "./PackMetadataSection";

export default class PackMetadataSectionSerializer implements IMetadataSectionSerializer<PackMetadataSection> {
  public fromJson(obj: Object): PackMetadataSection {
    let a = new JSONObject(obj);

    let itextcomponent: TextComponent = new TextComponent(a.get("description"));
    if(itextcomponent == null) {
      throw new Error("Invalid/missing description!");
    } else {
      let i = JSONUtils.getAsInt(obj, "pack_format");
      return new PackMetadataSection(itextcomponent, i);
    }
  }

  public getMetadataSectionName(): string {
    return "pack";
  }
}