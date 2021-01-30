// class CloudOptionEnum {
//   public id: number;
//   public key: string;
  
//   constructor(id: number, keyIn: string) {
//     this.id = id;
//     this.key = keyIn;
//  }

//   public getId(): number {
//     return this.id;
//   }

//   public getKey(): string {
//     return this.key;
//   }
// }

// export default class CloudOption {
//   static OFF = (new CloudOptionEnum(0, "options.clouds.off"));
//   static FAST = (new CloudOptionEnum(1, "options.clouds.fast"));
//   static FANCY = (new CloudOptionEnum(2, "options.clouds.fancy"));

//   public static byId(id: number) {
//     return Object.values(CloudOption).find(o => o.getId() === id);
//   }
// }

// const off: any = [0, 'options.clouds.off'];
// const fast: any = [1, "options.clouds.fast"];
// const fancy: any = [2, "options.clouds.fancy"];
// export enum CloudOption {
//  FANCY = fancy
// }

// export function byID(id: number) {
//   if(id == 0) return CloudOption.OFF;
//   if(id == 1) return CloudOption.FAST;
//   if(id == 1) return CloudOption.FANCY;
// }  OFF = off,
//   FAST = fast,
 

export const CloudOptions = {
  OFF: {
    id: 0,
    key: 'options.clouds.off',
    getKey() {
      return this.key;
    }
  },
  FAST: {
    id: 1,
    key: "options.clouds.fast",
    getKey() {
      return this.key;
    }
  },
  FANCY: {
    id: 2,
    key: "options.clouds.fancy",
    getKey() {
      return this.key;
    }
  }
}

class CloudOptionEnum {
  private id = -1;
  private key = '';

  public getId(): number {
    return this.id;
 }

  public getKey(): string {
    return this.key;
  }
  
  public setValue(value: any) {
    this.id = value.id;
    this.key = value.key;
    return this;
  }

  public getValue() {
    if(this.id === 0) return CloudOptions.OFF;
    if(this.id === 1) return CloudOptions.FAST;
    if(this.id === 2) return CloudOptions.FANCY;
  }
}

const CloudOption = new CloudOptionEnum();

export default CloudOption;