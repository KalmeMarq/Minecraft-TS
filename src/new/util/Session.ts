export default class Session {
  private readonly username: string;
  private readonly playerID: string;

  constructor(usernameIn: string, playerIDIn: string) {
    this.username = usernameIn;
    this.playerID = playerIDIn;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPlayerID(): string {
    return this.playerID;
  }
}