export default class Utils {
  public static isInside(a: number, b: number, c: number, d: number, e: number, f: number, callback: Function) {
    a > c && a < c + d && b > e && b < e + f ? callback() : false;
  }
  
  public static sortIteratable<T extends { getId(): number, getKey(): string }>(id: T, nextId: T) {
    return id.getId() - nextId.getId();
  } 
}