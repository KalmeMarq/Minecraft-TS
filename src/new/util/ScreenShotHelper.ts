import DateFormat from "@mcsrc/util/DateFormat";

export default class ScreenShotHelper {
  private static DATE_FORMAT: DateFormat = new DateFormat("yyyy-MM-dd_HH.mm.ss");
  public static lastTaken: string = '';

  public static saveScreenshot(canvas: HTMLCanvasElement) {
    const screenshot = ScreenShotHelper.createScreenshot(canvas);
    const downladLink = document.createElement('a');
    downladLink.setAttribute('download', ScreenShotHelper.getTimestampedForPNGFile());
    downladLink.setAttribute('href', screenshot);
    downladLink.click();
    downladLink.remove();
  }

  public static createScreenshot(canvas: HTMLCanvasElement) {
    return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  }

  public static getTimestampedForPNGFile() {
    let formatedDate = ScreenShotHelper.DATE_FORMAT.format(new Date());
    let i = 1;

    while(true) {
      let fileName = formatedDate + (i == 1 ? '' : '_' + i) + '.png';

      if(ScreenShotHelper.lastTaken != fileName) {
        ScreenShotHelper.lastTaken = fileName;
        return fileName;
      }

      i++;
    }
  }
}