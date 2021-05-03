import BetterMap from "./BetterMap"

export default class BiBetterMap<K, V> extends BetterMap<K, V> {
  reverse() {
    return new BiBetterMap<V, K>(Array.from(this, a => a.reverse()) as any[])
  }

  /**
   * Returns a Set with the map values
   */
  values(): any {
    return new Set(super.values())
  }
}