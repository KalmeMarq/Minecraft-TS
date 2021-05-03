import BasicChestContainer from "../../../../inventory/BasicChestContainer";
import CanvasUtil from "../../../../util/CanvasUtil";
import { TextComponent } from "../../../../util/text/TextComponent";
import PlayerInventory from "../../../../world/player/PlayerInventory";
import ContainerScreen from "./ContainerScreen";

export default class BasicChestScreen extends ContainerScreen<BasicChestContainer> {
  public constructor(type: BasicChestContainer, inventory: PlayerInventory, title: TextComponent) {
     super(type, inventory, title);
  }

  public render(mouseX: number, mouseY: number, partialTicks: number) {
     super.render(mouseX, mouseY, partialTicks);
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