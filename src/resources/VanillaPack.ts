import JSZip from 'jszip'

export default class VanillaPack {
  private readonly indexPath: string
  private readonly objects: Map<string, any> = new Map()
  private clientFile: Blob | undefined

  public constructor (index: string) {
    this.indexPath = index
  }

  public async addPaths (): Promise<void> {
    await fetch(this.indexPath).then(async res => await res.json()).then(data => {
      const objects = Object.entries(data.objects)

      for (let i = 0; i < objects.length; i++) {
        this.objects.set(objects[i][0], (objects[i][1] as any).hash)
      }
    })

    const res = await fetch('public/assets/client.jar')
    const data = await res.blob()
    this.clientFile = new File([data], 'idk')
  }

  public async getResource (path: string): Promise<Blob> {
    if (this.objects.has(path)) {
      const hash: string = this.objects.get(path)
      return await fetch(`public/assets/objects/${hash.slice(0, 2)}/${hash}`).then(async ress => await ress.blob()).then(daata => {
        return daata
      })
    } else {
      return await JSZip.loadAsync(await (this.clientFile as Blob).arrayBuffer() as ArrayBuffer).then(async (zip) => {
        const a: any = await zip.file('public/assets/' + path)?.async('arraybuffer')
        const b = new Blob([a])
        return b
      })
    }
  }
}
