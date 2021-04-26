export default class JSONUtils {
  public static getAsInt (obj: any, key: string, defaultValue?: number): number {
    let value = defaultValue ?? 0
    if (obj[key] !== undefined) value = obj[key]
    return ~~(value)
  }

  public static getAsString (obj: any, key: string, defaultValue?: string): string {
    let value = defaultValue ?? ''
    if (obj[key] !== undefined) value = obj[key]
    return value.toString()
  }

  public static getAsBoolean (obj: any, key: string, defaultValue?: boolean): boolean {
    let value = defaultValue ?? false
    if (obj[key] !== undefined) value = obj[key]
    return value
  }

  public static getAsJsonObject (obj: any, key: string): any {
    const value = JSON.parse(obj)
    return value[key]
  }
}
