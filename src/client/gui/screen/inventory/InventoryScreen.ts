import PlayerContainer from "../../../../inventory/PlayerContainer";
import ResourceLocation from "../../../../resources/ResourceLocation";
import CanvasUtil from "../../../../util/CanvasUtil";
import { TextComponent } from "../../../../util/text/TextComponent";
import Player from "../../../../world/player/Player";
import ContainerScreen from "./ContainerScreen";

export default class InventoryScreen extends ContainerScreen<PlayerContainer> {
  private static readonly RECIPE_BUTTON_LOCATION: ResourceLocation = new ResourceLocation("textures/gui/recipe_button.png");
  private xMouse: number = 0;
  private yMouse: number = 0;
  private widthTooNarrow: boolean = false;
  private buttonClicked: boolean = false;

  public constructor(player: Player) {
    super(player.inventoryMenu, player.inventory, new TextComponent("container.crafting"));
    this.titleLabelX = 97;
  }

  protected init(): void {
    super.init();
    this.widthTooNarrow = this.width < 379;
  }

  protected renderLabels(mouseX: number, mouseY: number): void {
    CanvasUtil.fillText(this.title.get(), this.titleLabelX, this.titleLabelY, 0, 0, 0/* , 4210752 */);
  }

  public render(mouseX: number, mouseY: number, partialTicks: number): void {
    super.render(mouseX, mouseY, partialTicks);
    this.xMouse = mouseX;
    this.yMouse = mouseY;
  }

  protected renderBg(mouseX: number, mouseY: number, partialTicks: number): void {
    let i = (this.width - this.imageWidth) / 2;
    let j = (this.height - this.imageHeight) / 2;
    CanvasUtil.fillRect(i, j, i + this.imageWidth, j + this.imageHeight);
    CanvasUtil.fillRect(i, j, i + 1, j + this.imageHeight, 0, 0, 0);
    CanvasUtil.fillRect(i + this.imageWidth, j, i + this.imageWidth - 1, j + this.imageHeight, 0, 0, 0);
    CanvasUtil.fillRect(i, j, i + this.imageWidth, j + 1, 0, 0, 0);
    CanvasUtil.fillRect(i, j + this.imageHeight, i + this.imageWidth, j + this.imageHeight - 1, 0, 0, 0);
  }
}