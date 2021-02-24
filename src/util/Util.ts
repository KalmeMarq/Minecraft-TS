import { getResourceLocation } from "./Resources";

export default class Util {
  public static milliTime() {
    return new Date().getMilliseconds();
  }

  public static nanoTime() {
    return this.milliTime() * 1000000;
  }

  public static createLog(...text: string[]) {
    let error = '';
    
    text.forEach((line: string) => error += line);

    console.log(error.trim());
  }

  public static isInside(a: number, b: number, c: number, d: number, e: number, f: number, callback: Function): boolean {
    return a > c && a < c + d && b > e && b < e + f ? callback() : false;
  }
  
  public static sortIteratable<T extends { getId(): number, getKey(): string }>(id: T, nextId: T): number {
    return id.getId() - nextId.getId();
  }

  public static getTranslation(key: string): string {
    if(getResourceLocation('langs', 'en_us')[key]) {
      return getResourceLocation('langs', 'en_us')[key]
    }
    
    return key;
  }

  /*
    From: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    By: bryc
  */
  public static hashCode53(str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
  }

  public static arrayToMap<T>(arr: T[]) {
    return arr.reduce(function(map: any, obj: any) {
      map[obj.key] = obj.val;
      return map;
    }, {});
  }
}