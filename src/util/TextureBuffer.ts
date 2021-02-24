import Util from "./Util";

export default class TextureBuffer {
  private buffer= new Map<string, HTMLCanvasElement | HTMLImageElement>();

  constructor() {}

  public add(key: string, source: HTMLCanvasElement | HTMLImageElement) {
    if(!this.buffer.get(key)) {
      this.buffer.set(key, source)
    }
  }

  public get(key: string): HTMLCanvasElement | HTMLImageElement {
    try {
      if(!this.buffer.has(key)) {
        const c = document.createElement('canvas');
        c.width = c.height = 1;
        return c;
      } else {
        return this.buffer.get(key)!;
      }
    } catch(e) {
      const c = document.createElement('canvas');
      c.width = c.height = 1;
      return c;
    }
  }

  public has(key: string): boolean {
    return this.buffer.has(key);
  }

  public remove(key: string): HTMLCanvasElement | HTMLImageElement | void {
    try {
      if(this.buffer.has(key)) {
        let src = this.buffer.get(key);
        this.buffer.delete(key);
        return src;
      }
    } catch(e) {
      Util.createLog(`Failed to remove buffer of key ${key}`)
    }
  }

  public clearAll() {
    this.buffer.clear();
  }
}