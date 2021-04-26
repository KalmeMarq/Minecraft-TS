import ResourceLocation from '../resources/ResourceLocation'
import IResource from './IResource'
import IResourcePack from './IResourcePack'

export default interface IResourceManager {
  getNamespaces: () => Set<string>
  getResource: (location: ResourceLocation) => IResource
  hasResource: (location: ResourceLocation) => boolean
  getResources: (location: ResourceLocation) => IResource[]
  listResources: (path: string, condition: (name: string) => boolean) => ResourceLocation[]
  listPacks: () => IResourcePack[]
}
