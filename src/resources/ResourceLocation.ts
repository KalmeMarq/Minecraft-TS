import ResourceLocationException from '../util/exceptions/ResourceLocationException'
import Util from '../util/Util'

class ResourceLocation {
  public static assetsDir = ''
  protected namespace = ''
  protected path = ''

  public constructor (location: string, namespace?: string) {
    this.namespace = namespace ?? ResourceLocation.decompose(location, ':')[0]
    this.path = ResourceLocation.decompose(location, ':')[1]

    if (!ResourceLocation.isValidNamespace(this.namespace)) {
      throw new ResourceLocationException('Non [a-z0-9_.-] character in namespace of location: ' + this.namespace + ':' + this.path)
    } else if (!ResourceLocation.isValidPath(this.path)) {
      throw new ResourceLocationException('Non [a-z0-9/._-] character in path of location: ' + this.namespace + ':' + this.path)
    }
  }

  public getPath (): string {
    return this.path
  }

  public getNamespace (): string {
    return this.namespace
  }

  public toString (): string {
    return this.namespace + ':' + this.path
  }

  public compareTo (location: ResourceLocation): boolean {
    let i = Util.equals(this.path, location.path)
    if (i) i = Util.equals(this.namespace, location.namespace)
    return false
  }

  /** @deprecated */
  public getFullPath (): string {
    return `${ResourceLocation.assetsDir}${this.namespace}/${this.path}`
  }

  public equals (resourceLocation: ResourceLocation): boolean {
    if (this === resourceLocation) {
      return true
    } else if (!(resourceLocation instanceof ResourceLocation)) {
      return false
    } else {
      const rl = resourceLocation
      return this.namespace === rl.namespace && this.path === rl.path
    }
  }

  public static isAllowedInResourceLocation (char: string): boolean {
    return (char >= '0' && char <= '9') || (char >= 'a' && char <= 'z') || char === '_' || char === ':' || char === '/' || char === '.' || char === '-'
  }

  private static validNamespaceChar (char: string): boolean {
    return char === '_' || char === '-' || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char === '.'
  }

  private static isValidNamespace (namespace: string): boolean {
    for (let i = 0; i < namespace.length; ++i) {
      if (!ResourceLocation.validNamespaceChar(namespace.charAt(i))) return false
    }
    return true
  }

  public static validPathChar (char: string): boolean {
    return char === '_' || char === '-' || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char === '/' || char === '.'
  }

  private static isValidPath (path: string): boolean {
    for (let i = 0; i < path.length; ++i) {
      if (!ResourceLocation.validPathChar(path.charAt(i))) return false
    }
    return true
  }

  protected static decompose (resourceName: string, splitOn: string): string[] {
    const astring = ['minecraft', resourceName]
    const i = resourceName.indexOf(splitOn)
    if (i > -1) {
      astring[1] = resourceName.substring(i + 1, resourceName.length)
      if (i >= 1) astring[0] = resourceName.substring(0, i)
    }

    return astring
  }
}

export default ResourceLocation
