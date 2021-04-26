export default class StringBuilder {
  private string = ''

  public constructor (initial?: string) {
    this.string += initial ?? ''
  }

  public append (text: string | number): StringBuilder {
    this.string += text.toString()
    return this
  }

  public delete (start: number, end: number): StringBuilder {
    const left = this.string.substring(0, start)
    const right = this.string.substring(end, this.string.length)
    this.string = left + right
    return this
  }

  public deleteChar (index: number): StringBuilder {
    this.delete(index, index + 1)
    return this
  }

  public indexOf (str: string, fromIndex = 0): number {
    return this.string.indexOf(str, fromIndex)
  }

  public lastIndexOf (str: string, fromIndex = 0): number {
    return this.string.lastIndexOf(str, fromIndex)
  }

  public replace (start: number, end: number, string: string): StringBuilder {
    const left = this.string.substring(0, start)
    const right = this.string.substring(end, this.string.length)
    this.string = left + string + right
    return this
  }

  public reverse (): StringBuilder {
    let newstring = ''
    for (let i = this.string.length - 1; i >= 0; i--) newstring += this.string[i]
    this.string = newstring
    return this
  }

  public length (): number {
    return this.string.length
  }

  public substring (start: number, end?: number): string {
    return this.string.substring(start, end ?? this.string.length)
  }

  public toString (): string {
    return this.string
  }
}
