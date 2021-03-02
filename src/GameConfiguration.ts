import Session from './new/util/Session';

class FolderInformation {
  public readonly assetsDir: string;
  
  constructor(assetsDirIn: string) {
    this.assetsDir = assetsDirIn;
  }
}

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

class UserInformation {
  public session: Session;
  
  constructor(sessionIn: Session) {
    this.session = sessionIn;
  }
}

export default class GameConfiguration {
  public readonly userInfo: UserInformation;
  public readonly folderInfo: FolderInformation;
  public readonly gameInfo: GameInformation;

  constructor(userInfo: UserInformation, folderInfo: FolderInformation, gameInfo: GameInformation) {
    this.userInfo = userInfo;
    this.folderInfo = folderInfo;
    this.gameInfo = gameInfo;
  }

  public static GameInformation = GameInformation;
  public static FolderInformation = FolderInformation;
  public static UserInformation = UserInformation;
}
