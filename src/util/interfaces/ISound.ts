import ResourceLocation from "../../resources/ResourceLocation";
import SoundCategory from "../../client/settings/SoundCategory";

export default interface ISound {
  getLocation(): ResourceLocation;
  // getSound(): Sound;
  getSource(): SoundCategory;
  isLooping(): boolean;
  getDelay(): number;
  getVolume(): number;
  getPitch(): number;
  canPlaySound(): boolean;
}