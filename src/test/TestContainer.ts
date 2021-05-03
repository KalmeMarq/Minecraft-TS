// import ContainerScreen from "../client/gui/screen/inventory/ContainerScreen";
// import IInventory from "../client/interfaces/IInventory";
// import BasicChestContainer from "../inventory/BasicChestContainer";
// import Inventory from "../inventory/Inventory";
// import Slot from "../inventory/Slot";
// import CanvasUtil from "../util/CanvasUtil";
// import { TextComponent } from "../util/text/TextComponent";
// import Player from "../world/player/Player";
// import PlayerInventory from "../world/player/PlayerInventory";

// export class TestContainer extends ContainerScreen<BasicChestContainer> {
//    private readonly container: IInventory;
//    public containerRows: number;

//   public constructor(title: TextComponent) {
//     super(title, new PlayerInventory(new Player()));

//     this.container = new Inventory(9 * 3)
//     this.containerRows = 3;
    
//     let i = (this.containerRows - 4) * 18;

//     for(let j = 0; j < this.containerRows; ++j) {
//       for(let k = 0; k < 9; ++k) {
//          this.addSlot(new Slot(this.container, k + j * 9, 8 + k * 18, 18 + j * 18));
//       }
//     }

//     for(let i = 0; i < 3; ++i) {
//       for(let j = 0; j < 9; ++j) {
//          this.addSlot(new Slot(this.inventory, j + i * 9 + 9, 8 + j * 18, 84 + i * 18));
//       }
//     }

//     for(let i1 = 0; i1 < 9; ++i1) {
//       this.addSlot(new Slot(this.inventory, i1, 8 + i1 * 18, 142));
//     }
//   }

//   protected renderBg(partialTicks: number, mouseX: number, mouseY: number): void {
//     CanvasUtil.fillRect(this.leftPos, this.topPos, this.leftPos + this.imageWidth, this.topPos + this.imageHeight)
//   }
// }