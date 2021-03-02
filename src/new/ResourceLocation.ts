export default class ResourceLocation {
  public static assetsDir: string = '';
  protected namespace: string;
  protected path: string;

  constructor(resourceName: string) {
    this.namespace = ResourceLocation.decompose(resourceName, ':')[0];
    this.path = ResourceLocation.decompose(resourceName, ':')[1];
  }

  public getPath(): string {
    return this.path;
  }

  public getNamespace(): string {
    return this.namespace;
  }

  public getFullPath(): string {
    return `${ResourceLocation.assetsDir}${this.namespace}/${this.path}`;
  }

  public equals(resourceLocation: ResourceLocation) {
    return resourceLocation.getFullPath() == this.getFullPath()
  }

  public toString(): string {
    return this.namespace + ':' + this.path;
  }

  protected static decompose(resourceName: string, splitOn: string) {
    let astring = ['minecraft', resourceName];
    let i = resourceName.indexOf(splitOn);
    if(i >= 0) {
      astring[1] = resourceName.substring(i + 1, resourceName.length);
      if(i >= 1) astring[0] = resourceName.substring(0, i);
    }

    return astring;
  }
}