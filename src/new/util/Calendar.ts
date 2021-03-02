export default class Calendar {
  private dateObj: Date = new Date();

  constructor(date: Date) {
    this.dateObj = date;
  }

  public setTime(date: any) {
    this.dateObj = date;
  }

  public get(index: number) {
    switch(index) {
      case 0:
        return this.dateObj.getFullYear();
      case 1:
        return this.dateObj.getMonth();
      case 2:
        return this.dateObj.getDate();
      case 4:
        return this.dateObj.getHours();
      case 5:
        return this.dateObj.getMinutes();
      case 6:
        return this.dateObj.getSeconds();
      case 7:
        return this.dateObj.getMilliseconds();
      case 8:
      default:
        return this.dateObj.getTime();
    }
  }
}