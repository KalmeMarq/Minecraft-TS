import Util from '../Util'
import Style from './Style'

export class TextComponent {
  static pattern = /%(?:(\d+)\$)?([A-Za-z%]|$)/g
  key: string
  args: any[]
  parts: string[] = []
  style = Style.EMPTY

  constructor (key: string, ...args: any[]) {
    this.key = key
    this.args = args
  }

  decompose (): void {
    this.parts = [];
    const s = /* lang[this.key] ??  */this.key
    this.decomposeTemplate(s)
  }

  decomposeTemplate (s: string): void {
    const matches = s.match(TextComponent.pattern)
    if (matches !== null) {
      let j = 0
      for (let i = 0; i < matches.length; i++) {
        const s1 = matches[i]
        j = s1.length - 1

        const s2 = s1.substring(0, j)

        if (Util.equals(s2, '%') && Util.equals(s1, '%%')) {
          this.parts.push('%')
        } else {
          this.parts.push(this.args[i])
        }
      }
    }

    this.parts.push(s)
  }

  get (): string {
    this.decompose()

    let s = this.parts[this.parts.length - 1]
    s.match(TextComponent.pattern)?.forEach((part: any, idx) => {
      const p = part
      let p1: any = this.parts[idx]
      if (p1 instanceof TextComponent) {
        p1 = p1.get()
      }

      s = s.replace(p, p1)
    })

    return s
  }

  append(component: TextComponent | string) {
    this.args.push(component)
    return this;
  }

  getString() {
    return this.get();
  }

/*   accept(consumer: CharacterRenderer) {
    let con = consumer;

    for (let i = 0; i < this.get().length; i++) {
      const element = this.get()[i].codePointAt(0) ?? 0;
      con.accept(element, this.style, con.x, con.y);
    }
  } */
}
