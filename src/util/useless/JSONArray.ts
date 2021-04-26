import JSONObject from './JSONObject'

export default class JSONArray {
  private readonly array: any[] = []
  public constructor (arr?: any[]) {
    this.array.push(...(arr ?? []))
  }

  add (item: any): void {
    this.array.push(item instanceof JSONObject ? item.toJSONString() : item)
  }

  toString (): string {
    return JSON.stringify(this.array)
  }

  toJSONString (): any[] {
    return this.array
  }
}
