import { TextComponent } from "../../util/text/TextComponent";
import Util from "../../util/Util";

export default class GameType {
  public static NOT_SET = new GameType(-1, "")
  public static SURVIVAL = new GameType(0, "survival")
  public static CREATIVE = new GameType(1, "creative")
  public static ADVENTURE = new GameType(2, "adventure")
  public static SPECTATOR = new GameType(3, "spectator")

  private readonly id: number;
  private readonly name: string;

  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDisplayName(): TextComponent {
    return new TextComponent(`gameMode.${this.name}`);
  }

  public isBlockPlacingRestricted(): boolean {
    return this == GameType.ADVENTURE || this == GameType.SPECTATOR;
  }

  public isCreative(): boolean {
    return this == GameType.CREATIVE;
  }

  public isSurvival(): boolean {
    return this == GameType.SURVIVAL || this == GameType.ADVENTURE;
  }

  public static byId(id: number, type: GameType = GameType.SURVIVAL): GameType {
    for(const gametype of Object.values(GameType) as GameType[]) {
      if(gametype.id == id) return gametype;
    }
    return type;
  }

  public static byName(name: string, type: GameType = GameType.SURVIVAL): GameType {
    for(const gametype of Object.values(GameType) as GameType[]) {
      if(Util.equals(gametype.name, name)) return gametype;
    }
    return type;
  }
}