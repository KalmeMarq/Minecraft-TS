export default class GameConfiguration {
  public userInfo: GameConfiguration.UserInformation;
  public gameInfo: GameConfiguration.GameInformation;

  constructor(userInfo: GameConfiguration.UserInformation, gameInfo: GameConfiguration.GameInformation) {
    this.userInfo = userInfo;
    this.gameInfo = gameInfo;
  }

  public static GameInformation = (() => {
    class GameInformation {
      public isDemo: boolean;
      public version: string;
      public versionType: string;
      public clientName: string;

      constructor(isDemo: boolean, version: string, versionType: string, clientName: string) {
        this.isDemo = isDemo;
        this.version = version;
        this.versionType = versionType;
        this.clientName = clientName;
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

namespace GameConfiguration {
  export type GameInformation = typeof GameConfiguration.GameInformation.prototype;
  export type UserInformation = typeof GameConfiguration.UserInformation.prototype;
}