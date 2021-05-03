// npx ts-node src/test/TestNodemon.ts -q
// npx tsnd --respawn --quiet src/test/TestNodemon.ts
import { int } from "binary-nbt";
import MathHelper from "../util/MathHelper";
import KM from "../util/useless/KM";

console.clear();

let arr = ['a', 'b', 'c'];

// console.log(MathHelper.positiveModulo(4, arr.length));

let test = `
# version 1.0.0

String supp = 'text'
Array legalages = [18, 19, 20, 21, 22]
`;

// console.log(KM.toJSON(test));
// console.log('---------------');
// console.log(KM.toKM(KM.toJSON(test)));

// ----------------------------------------------------------

class BetterMap<K, V> extends Map<K, V> {
  getOrDefault(key: K, defaultValue: V): V {
    return this.get(key) ?? defaultValue;
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  computeIfAbsent(key: K, callback: (key: K) => V): V {
    if(!this.has(key)) {
      this.set(key, callback(key))
      return this.get(key) as V;
    } else {
      return this.get(key) as V;
    }
  }

  containsValue(value: V): boolean {
    return [...this.values()].includes(value);
  }

  get(key: K): V | undefined {
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

  has(key: K): boolean {
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

  putAll(m: Map<K, V>): void {
    for(let [k, v] of m) {
      this.set(k, v);
    }
  }

  keySet(): Set<K> {
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

  /* Syntax Sugar :) */
  put(key: K, value: V): V | undefined {
    let prev = this.get(key);
    this.set(key, value);
    return prev;
  }

  putIfAbsent(key: K, value: V): V | undefined {
    let prev = this.get(key);
    if(prev === undefined) {
      this.set(key, value);
    }
    return prev;
  }

  containsKey(key: K): boolean {
    return this.has(key);
  }

  remove(key: K): V | undefined {
    let prev = this.get(key);
    this.delete(key);
    return prev;
  }
}


class BetterBiMap<K, V> extends BetterMap<K, V> {
  reverse() {
    return new BetterMap<K, V>(Array.from(this, a => a.reverse()) as any[])
  }

  /**
   * Returns a Set with the map values
   */
  values(): any {
    return new Set(super.values())
  }
}

let a = (x: number, y: number) => {
  return x + y
}

// export interface BiConsumer<T, U> extends FunctionConstructor {

//   andThen(arg0: BiConsumer<any, any>): BiConsumer<T, U>;

//   accept(arg0: T, arg1: U): void;
// }

// export interface Type<T = any> extends Function {
//   new (...args: any[]): T;
// }

// let b: BiConsumer<string, string> = BiConsumer('s' + 's')

// class BiConsumer

// let b: Type<string> = () => {
//   return 's'
// }

// console.log(b);

let hyeMan = '10'

function conv(text: string) {
var hash = 0;
  for (var i = 0; i < text.length; i++) {
      var character = text.charCodeAt(i);
      hash = ((hash<<5)-hash)+character;
      hash = hash & hash;
  }
  return hash;
}

// console.log(conv(hyeMan))