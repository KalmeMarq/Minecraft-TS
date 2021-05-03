export default class BetterList<E> extends Array<E> {
  public add(e: E): boolean {
    this.push(e);
    return true
  }

  public addAll(...e: E[]): void {
    e.map(v => {
      this.push(v);
    })
  }

  public addIn(index: number, e: E): void {
    const left = this.slice(0, index)
    const right = this.slice(index, this.length)
    this.splice(0, this.length)
    this.push(...left, e,...right)
  }

  public get(index: number): E {
    return this[index]
  }

  public set(index: number, e: E): E {
    this[index] = e;
    return e
  }

  public remove(index: number): E {
    return this.splice(index, 1)[0]
  }

  public clear(): void {
    this.splice(0, this.length)
  }

  public size(): number {
    return this.length;
  }

  protected removeRange(fromIndex: number, toIndex: number): void {
    this.splice(fromIndex, toIndex);
  }

  public contains(e: E): boolean {
    return this.indexOf(e) !== -1;
  }

  public equals(compareTo: Object): boolean {
    if(compareTo === this) {
      return true;
    } else if(!(compareTo instanceof BetterList)) {
      return false;
    } else {
      let list = compareTo as BetterList<any>;
      
      let is = true;

      for(let i = 0; i < this.length; i++) {
        if(typeof (this[i] as any)['equals'] === 'function') {
          if(!(this[i] as any).equals(list[i])) {
            is = false;
            break;
          }
        } else if(this[i] !== list[i]) {
          is = false;
          break;
        }
      }

      return is;
    }
  }

  public containsAll(...e: E[]): boolean {
    let does = true;

    for(let i = 0; i < e.length; i++) {
      if(this.indexOf(e[i]) === -1 && does) {
        does = false;
        break
      }
    }

    return does;
  }
}