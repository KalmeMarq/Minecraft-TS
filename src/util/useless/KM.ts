export default class KM {
  public static toKM (json: { [key: string]: string | number | (string | number)[] }): string {
    const obj = json
    let testTest = '# version 1.0.0'

    const entries = Object.entries(obj)

    entries.forEach(v => {
      if (typeof v[1] === 'string') {
        testTest += `\nString ${v[0]} = '${v[1]}'`
      } else if (typeof v[1] === 'number') {
        if (Number.isInteger(v[1])) {
          testTest += `\nInt ${v[0]} = ${v[1]}`
        } else {
          testTest += `\nFloat ${v[0]} = ${v[1]}`
        }
      } else if (Array.isArray(v[1])) {
        const items = v[1]
        let itemsText = ''

        for (let i = 0; i < items.length; i++) {
          itemsText += `'${items[i]}'${(i + 1 === items.length ? '' : ', ')}`
        }

        testTest += `\nArray ${v[0]} = [${itemsText}]`
      }
    })

    return testTest
  }

  public static toJSON (text: string): { [key: string]: any } {
    const test = text
    const testJSON: { [key: string]: string | number | (string | number)[] } = {}

    test.split('\n').forEach(line => {
      const l = line.split(' ')
      if (l[0] !== '#' && l.length > 0) {
        if (l[0] === 'String') {
          testJSON[l[1]] = l[3].replace(/'/g, '')
        } else if (l[0] === 'Array') {
          testJSON[l[1]] = []

          for (let i = 3; i < l.length; i++) {
            (testJSON[l[1]] as string[]).push(l[i].replace(',', '').replace(']', '').replace('[', '').replace(/'/g, ''))
          }
        } else if (l[0] === 'Int') {
          testJSON[l[1]] = parseInt(l[3])
        } else if (l[0] === 'Float') {
          testJSON[l[1]] = parseFloat(l[3])
        }
      }
    })

    return testJSON
  }
}
