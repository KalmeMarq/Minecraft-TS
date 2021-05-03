import MathHelper from "../../util/MathHelper";
import { TextComponent } from "../../util/text/TextComponent";
import Util from "../../util/Util";

export default class Difficulty {
  public static PEACEFUL = new Difficulty(0, "peaceful")
  public static EASY = new Difficulty(1, "easy")
  public static NORMAL = new Difficulty(2, "normal")
  public static HARD = new Difficulty(3, "hard")

  private static readonly BY_ID: Difficulty[] = Object.values(Difficulty).sort(Util.sortIteratable)
  private readonly id: number;
  private readonly key: string;

  private constructor(id: number, key: string) {
    this.id = id;
    this.key = key;
  }

  public getId(): number {
    return this.id;
  }

  public getDisplayName(): TextComponent {
    return new TextComponent(`options.difficulty.${this.key}`);
  }

  public static byId(id: number): Difficulty {
    return this.BY_ID[MathHelper.positiveModulo(id, this.BY_ID.length)];
  }

  public static byName(name: string): Difficulty | null {
    for(const difficulty of Object.values(Difficulty).slice(0, -1) as Difficulty[]) {
      if(Util.equals(difficulty.key, name)) return difficulty;
    }
    return null;
  }

  public getKey(): string {
    return this.key;
  }

  public nextById(): Difficulty {
    return Difficulty.BY_ID[MathHelper.positiveModulo((this.id + 1), Difficulty.BY_ID.length)];
  }
}