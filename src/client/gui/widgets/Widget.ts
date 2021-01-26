export default abstract class Widget {
  protected width: number;
  protected height: number;
  public x: number;
  public y: number;
  protected message: string;
  private wasHovered: boolean = false;
  protected isHovered: boolean = false;
  public active = true;
  public visible = true;
  protected focused: boolean;

  constructor(x: number, y: number, width: number, height: number, title: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.message = title;
    this.focused = false;
  }
}