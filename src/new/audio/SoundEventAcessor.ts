import TranslationTextComponent from "@mcsrc/util/text/TranslationTextComponent";
import ResourceLocation from "../ResourceLocation";
import Sound from "./Sound";

export default class SoundEventAcessor {
  private accessorList: Array<Sound> = new Array();
  private location: ResourceLocation;
  private subtitle: string | null;

  constructor(locationIn: ResourceLocation, subtitleIn: string | null) {
    this.location = locationIn;
    this.subtitle = subtitleIn == null ? null : subtitleIn;
  }

  public addSound(accessor: Sound) {
    this.accessorList.push(accessor);
  }

  public getSubtitle(): string {
    return this.subtitle || 'empty';
  }
}