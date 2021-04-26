class CustomMap<T, Y> {
  public map: Map<any, any>
  constructor ();
  constructor (iterable: Iterable<readonly [T, Y]>);
  constructor (iterable?: Iterable<readonly [T, Y]>) {
    this.map = (iterable != null) ? new Map(iterable) : new Map()
  }

  get (key: any): Y | undefined {
    if (typeof key.equals !== 'function') return this.map.get(key)

    let y: any
    this.map.forEach((v, k) => {
      if (k.equals(key) as boolean) {
        y = this.map.get(k)
      }
    })

    return y
  }

  getOrDefault<T, Y> (key: T, defaultValue: Y): true | Y {
    return (this.get(key) != null) || defaultValue
  }

  has (key: any): boolean {
    if (typeof key.equals !== 'function') return this.map.has(key)

    let y = false
    this.map.forEach((v, k) => {
      if (k.equals(key) as boolean) {
        y = true
      }
    })

    return y
  }

  set<T, Y> (key: T, value: Y): Y {
    this.map.set(key, value)
    return value
  }

  size (): number {
    return this.map.size
  }

  values (): IterableIterator<Y> {
    return this.map.values()
  }

  keys (): IterableIterator<T> {
    return this.map.keys()
  }

  entries (): IterableIterator<[T, Y]> {
    return this.map.entries()
  }

  isEmpty (): boolean {
    return this.map.size === 0
  }

  delete (key: any): boolean {
    if (typeof key.equals !== 'function') return this.map.delete(key)

    let d = false
    this.map.forEach((v, k) => {
      if (k.equals(key) as boolean) {
        d = this.map.delete(k)
      }
    })

    return d
  }

  forEach (callbackfn: (value: any, key: any, map: Map<any, any>) => void, thisArg?: any): void {
    this.map.forEach(callbackfn, thisArg)
  }

  clear (): void {
    this.map.clear()
  }

  getMap (): Map<T, Y> {
    return this.map
  }

  entrySet (): Set<[T, Y]> {
    return new Set(this.map)
  }
}

export default CustomMap
