import Blocks from "../block/Blocks";
import { TextComponent } from "../util/text/TextComponent";
import ItemStack from "./ItemStack";

export default abstract class ItemGroup {
  public static readonly TABS: ItemGroup[] = new Array(12);

  public static readonly TAB_BUILDING_BLOCKS: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(1, "buildingBlocks"));
  public static readonly TAB_DECORATIONS: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(1, "decorations"))
  public static readonly TAB_REDSTONE: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(2, "redstone"))
  public static readonly TAB_TRANSPORTATION: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(3, "transportation"))
  public static readonly TAB_MISC: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(6, "misc"))
  public static readonly TAB_SEARCH: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(5, "search"))
  public static readonly TAB_FOOD: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(7, "food"))
  public static readonly TAB_TOOLS: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(8, "tools"))
  public static readonly TAB_COMBAT: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(9, "combat"))
  public static readonly TAB_BREWING: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(10, "brewing"))
  public static readonly TAB_MATERIALS: ItemGroup = ItemGroup.TAB_MISC;

  public static readonly TAB_HOTBAR: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
       return new ItemStack(Blocks.AIR);
    }
  }(4, "hotbar"))
  public static readonly TAB_INVENTORY: ItemGroup = (new class extends ItemGroup {
    public makeIcon(): ItemStack {
      return new ItemStack(Blocks.AIR);
   }
  }(11, "inventory"));

  private readonly id: number;
  private readonly langId: string;
  private readonly displayName: TextComponent;
  private backgroundSuffix: string = "items.png";
  private canScroll: boolean = true;
  private showTitle: boolean = true;

  public constructor(id: number, key: string) {
    this.id = id;
    this.langId = key;
    this.displayName = new TextComponent("itemGroup." + key);
    ItemGroup.TABS[id] = this;
  }

  public abstract makeIcon(): ItemStack;
}