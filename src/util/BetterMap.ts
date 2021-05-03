import IBiConsumer from "./interfaces/IBiConsumer";
import IFunction from "./interfaces/IFunction";

export default class BetterMap<K, V> extends Map<K, V> {
  public getOrDefault(key: K, defaultValue: V): V {
    return this.get(key) ?? defaultValue;
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  public computeIfAbsent(key: K, callback: IFunction<K, V>): V {
    if(!this.has(key)) {
      this.set(key, callback(key))
      return this.get(key) as V;
    } else {
      return this.get(key) as V;
    }
  }

  public containsValue(value: V): boolean {
    return [...this.values()].includes(value);
  }

  public get(key: K): V | undefined {
    if(typeof (key as any)['equals'] !== 'function') return super.get(key)

    let vl: V | undefined;

    for(let [k, v] of this) {
      if((k as any).equals(key) as boolean) {
        vl = super.get(k)
        break;
      }
    }

    return vl
  }

  public has(key: K): boolean {
    if(typeof (key as any)['equals'] !== 'function') return super.has(key)

    let exists = false

    for(let [k, v] of this) {
      if((k as any).equals(key) as boolean) {
        exists = true
        break;
      }
    }
  
    return exists
  }

  public putAll(m: Map<K, V>): void {
    for(let [k, v] of m) {
      this.set(k, v);
    }
  }

  public keySet(): Set<K> {
    return new Set(this.keys())
  }

  equals(compareTo: Object): boolean {
    if(compareTo === this) {
      return true;
    } else if(compareTo instanceof BetterMap) {
      return false;
    }

    return false;
  }

  public putIfAbsent(key: K, value: V): V | undefined {
    let prev = this.get(key);
    if(prev === undefined) {
      this.set(key, value);
    }
    return prev;
  }

  /* Syntax Sugar :) */
  public put(key: K, value: V): V | undefined {
    let prev = this.get(key);
    this.set(key, value);
    return prev;
  }

  public containsKey(key: K): boolean {
    return this.has(key);
  }

  public remove(key: K): V | undefined {
    let prev = this.get(key);
    this.delete(key);
    return prev;
  }
}