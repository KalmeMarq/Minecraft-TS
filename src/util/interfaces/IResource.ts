import ResourceLocation from "../../resources/ResourceLocation";

export default interface IResource {
  getLocation: () => ResourceLocation
  getBlob: () => Blob
  getSourceName: () => string
}
