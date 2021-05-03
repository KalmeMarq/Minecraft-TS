import ResourceLocation from '../resources/ResourceLocation'
import CustomMap from './CustomMap'

export default class Util {
  public static equals (str0: string, str1: string): boolean {
    return str0 === str1
  }

  public static format (str: string, ...args: any): string {
    for (let i = 0; i < args.length; i++) str = str.replace(/%[a-zA-Z]/, args[i])
    return str
  }

  public static arrayToMap (arr: any[], callback: (value: any) => any): CustomMap<any, any> {
    const map: CustomMap<any, any> = new CustomMap()
    arr.forEach(value => {
      map.set(value, callback(value))
    })
    return map
  }

  public static sortIteratable<T extends { getId: () => number, getKey: () => string }>(id: T, nextId: T): number {
    return id.getId() - nextId.getId()
  }

  public static filterIteratable<T>(e: T) {
    console.log(e);
    
    return e;
  }

  public static getMillis (): number {
    return new Date().getTime()
  }

  public static async fileExists (path: string): Promise<any> {
    const res = await fetch('exists/' + path, {
      method: 'GET'
    })
    const data = await res.json()

    return data.exists
  }

  public static async getFile (path: string): Promise<any> {
    return await (await fetch('utils/receive/' + path, {
      method: 'GET'
    })).json()
  }

  public static createFile (path: string, filedata: any): void {
    const loc = path
    let type = ''
    if (loc.endsWith('.json')) {
      type = 'application/json'
    } else if (loc.endsWith('.txt')) {
      type = 'text/plain'
    }

    const bodyData = {
      path: path,
      data: filedata()
    }

    if (type !== '') {
      fetch('utils/createfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      }).catch(e => {
        console.log(e)
      })
    }
  }

  public static int (v: number): number {
    return v < 0 ? Math.ceil(v) : v < 0.00000005 && v > -0.00000005 ? 0 : Math.floor(v);
  }

  public static makeDescriptionId(base: string, location: ResourceLocation | undefined): string {
    return location === undefined ? base + ".unregistered_sadface" : base + '.' + location.getNamespace() + '.' + location.getPath().replace('/', '.');
  }

  public static hashCode(text: string): number {
    let hash = 0;
    for(let i = 0; i < text.length; i++) {
      let textChar = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + textChar;
      hash = hash & hash;
    }
    return hash;
  }
}
