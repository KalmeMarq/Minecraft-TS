
export default interface IResourcePack {
  getRootResource: () => any
  getResource: () => any
  hasResource: () => any
  getResources: () => any
  listResources: () => any
  getNamespaces: () => any
  getMetadataSection: () => any
  getName: () => any
}
