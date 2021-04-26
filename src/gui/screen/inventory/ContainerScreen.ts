import ResourceLocation from "../../../resources/ResourceLocation";
import CanvasUtil from "../../../util/CanvasUtil";
import { TextComponent } from "../../../util/text/TextComponent";
import Screen from "../Screen";

export default abstract class ContainerScreen extends Screen {
  public static readonly INVENTORY_LOCATION: ResourceLocation = new ResourceLocation("textures/gui/container/inventory.png");
  protected imageWidth: number = 176;
  protected imageHeight: number = 166;
  protected titleLabelX: number;
  protected titleLabelY: number;
  protected inventoryLabelX: number;
  protected inventoryLabelY: number;
  protected leftPos: number = 0;
  protected topPos: number = 0;
  private lastClickTime: number = 0;
  private lastClickButton: number = 0;
  private doubleclick: boolean = false;

  public constructor(title: TextComponent) {
    super(title);
    this.titleLabelX = 8;
    this.titleLabelY = 6;
    this.inventoryLabelX = 8;
    this.inventoryLabelY = this.imageHeight - 94;
  }

  protected init(): void {
    super.init();
    this.leftPos = ~~(this.width - this.imageWidth) / 2;
    this.topPos = ~~(this.height - this.imageHeight) / 2;
  }

  public render(mouseX: number, mouseY: number, partialTicks: number) {
    let i = this.leftPos;
    let j = this.topPos;
    this.renderBg(partialTicks, mouseX, mouseY);
    super.render(mouseX, mouseY, partialTicks);

    let k = 240;
    let l = 240;
    this.renderLabels(mouseX, mouseY);
  }

  protected abstract renderBg(partialTicks: number, mouseX: number, mouseY: number): void;

  protected renderLabels(mouseX: number, mouseY: number): void {
    CanvasUtil.fillText(this.title.get(), this.titleLabelX, this.titleLabelY, 255, 255, 255);
    CanvasUtil.fillText('this.inventory.getDisplayName()', this.inventoryLabelX, this.inventoryLabelY, 255, 255, 255);
  }
}