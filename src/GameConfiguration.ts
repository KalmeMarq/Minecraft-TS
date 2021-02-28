export default class GameConfiguration {
  public readonly userInfo: GameConfiguration.UserInformation;
  public readonly gameInfo: GameConfiguration.GameInformation;

  constructor(userInfo: GameConfiguration.UserInformation, gameInfo: GameConfiguration.GameInformation) {
    this.userInfo = userInfo;
    this.gameInfo = gameInfo;
  }

  public static GameInformation = (() => {
    class GameInformation {
      public readonly isDemo: boolean;
      public readonly version: string;
      public readonly versionType: string;
      public readonly disableMultiplayer: boolean;
      public readonly disableChat: boolean;

      constructor(isDemo: boolean, version: string, versionType: string, disableMultiplayer: boolean, disableChat: boolean) {
        this.isDemo = isDemo;
        this.version = version;
        this.versionType = versionType;
        this.disableMultiplayer = disableMultiplayer;
        this.disableChat = disableChat;
      }
    }
    return GameInformation;
  })();

  public static UserInformation = (() => {
    class UserInformation {
      public userName: string;
      
      constructor(userName: string) {
        this.userName = userName;
      }
    }
    return UserInformation;
  })();
}

module GameConfiguration {
  export type GameInformation = typeof GameConfiguration.GameInformation.prototype;
  export type UserInformation = typeof GameConfiguration.UserInformation.prototype;
}