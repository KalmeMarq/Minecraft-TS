export default class LSStore {
  public content = new Map();
  public lsItem = '';
  public itemData: any = '';
  constructor(lsItem: string, mode?: string) {
    if(mode?.toLowerCase() === 'create') {
      this.lsItem = lsItem;
      this.itemData = ''
    } else if(mode?.toLowerCase() === 'get') {
      const data = localStorage.getItem(lsItem)!.split("\n");
      data.forEach((line: any) => {
        if(line !== '') {
          this.content.set(line.split(':')[0], line.split(':')[1]);
        }
      });
    }
  }

  public addLine(text: any): void {
    this.itemData += (this.itemData === '' ? text : '\n' + text);
  }

  public saveToLS(): void {
    localStorage.setItem(this.lsItem, this.itemData)
  }

  public keySet() {
    return this.content.keys();
  }

  public getString(key: any) {
    return this.content.get(key);
  }
}