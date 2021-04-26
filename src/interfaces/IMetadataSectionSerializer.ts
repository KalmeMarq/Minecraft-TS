export interface IMetadataSectionSerializer<T> {
  getMetadataSectionName: () => string
  fromJson: (obj: Object) => T
}
