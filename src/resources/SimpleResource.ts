import { IMetadataSectionSerializer } from '../interfaces/IMetadataSectionSerializer'
import IResource from '../interfaces/IResource'
import Util from '../util/Util'
import ResourceLocation from './ResourceLocation'

export default class SimpleResource implements IResource {
  private readonly sourceName: string
  private readonly location: ResourceLocation
  private readonly resourceBlob: Blob
  private readonly metadataBlob: Blob | null
  private triedMetadata = false
  private metadata: any | null = null

  public constructor (source: string, location: ResourceLocation, resourceBlob: Blob, metadataBlob: Blob | null = null) {
    this.sourceName = source
    this.location = location
    this.resourceBlob = resourceBlob
    this.metadataBlob = metadataBlob
  }

  public getLocation (): ResourceLocation {
    return this.location
  }

  public getBlob (): Blob {
    return this.resourceBlob
  }

  public getSourceName (): string {
    return this.sourceName
  }

  public hasMetadata (): boolean {
    return this.metadataBlob !== null
  }

  public async getMetadata<T> (serializer: IMetadataSectionSerializer<T>): Promise<T | null> {
    if (!this.hasMetadata()) return null
    else {
      let promise = null
      if (this.metadata === null && !this.triedMetadata) {
        this.triedMetadata = true
        let filereader: FileReader

        try {
          promise = new Promise((resolve, reject) => {
            filereader = new FileReader()
            filereader.onload = (e) => {
              this.metadata = JSON.parse(filereader.result as string)
              resolve(null)
            }
            filereader.readAsText(this.metadataBlob as File)
          }).catch(e => console.log(e))
        } catch (e) {}
      }

      await promise

      if (this.metadata === null) {
        return null
      } else {
        const s = serializer.getMetadataSectionName()
        return ((this.metadata[s] !== undefined) ? serializer.fromJson(this.metadata[s]) : null)
      }
    }
  }

  public equals (obj: any): boolean {
    if (this === obj) return true
    else if (!(obj instanceof SimpleResource)) return false
    else {
      const simpleresource: SimpleResource = obj
      if (this.location !== null) {
        if (!this.location.equals(simpleresource.location)) return false
        else if (simpleresource.location !== null) return false
      }

      if (this.sourceName !== null) {
        if (!Util.equals(this.sourceName, simpleresource.sourceName)) return false
        else if (simpleresource.sourceName !== null) return false
      }

      return true
    }
  }
}
