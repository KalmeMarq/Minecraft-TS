interface IJSONElement {
  type: string,
  size: (number | string)[],
  offset: (number | string)[],
  text: string,
  active: boolean,
  ignored: boolean,
  texture: any
}

interface IGenJSONElement {
  type: string,
  size: { w: number, h: number },
  offset: { x: number, y: number },
  text: string,
  active: boolean,
  ignored: boolean,
  texture: any
}

interface I {
  [key: string]: any
}

export default class JSONUI {
  public static getObject(superObj: IJSONElement | null, obj: IJSONElement, fullWidth: number, fullHeight: number, hardcoded: I): IGenJSONElement {
    let newObj: any = {
      type: 'panel',
      size: { w: 0, h: 0 },
      offset: { x: 0, y: 0 },
      text: '',
      active: true,
      ignored: false,
      texture: {}
    }
    
    if(superObj === null) {
      Object.entries(obj).forEach(([key, value]) => {
        switch(key) {
          case 'size':
            newObj[key] = JSONUI.sizeConversion(value, fullWidth, fullHeight);
            break;
          case 'offset':
            newObj[key] = JSONUI.offsetConversion(value, fullWidth, fullHeight);
            break;
          case 'texture': JSONUI.getTexture(null, obj);
          default:
            newObj[key] = value;
            break;
          }
      });
    } else if(superObj !== null) {
      let props = new Map();

     /*  Object.entries(superObj).forEach(([key, value]) => {
        props.set(key, value);
      });

      Object.entries(obj).forEach(([key, value]) => {
        props.set(key, value);
      }) */
      
      Object.entries(superObj).forEach(([key, value]) => {
        switch(key) {
          case 'size':
            newObj[key] = JSONUI.sizeConversion(value, fullWidth, fullHeight);
            break;
          case 'offset':
            newObj[key] = JSONUI.offsetConversion(value, fullWidth, fullHeight);
            break;
          case 'texture': 
            newObj[key] = JSONUI.getTexture(null, obj);
          case 'ignored':
            newObj[key] = false;
            break;
          default:
            newObj[key] = value;
            break;
          }
      })

      Object.entries(obj).forEach(([key, value]) => {
        switch(key) {
          case 'size':
            newObj[key] = JSONUI.sizeConversion(value, fullWidth, fullHeight);
            break;
          case 'offset':
            newObj[key] = JSONUI.offsetConversion(value, fullWidth, fullHeight);
            break;
          case 'texture': 
            newObj[key] = JSONUI.getTexture(null, obj);
          case 'ignored':
            newObj[key] = false;
            break;
          default:
            newObj[key] = value;
            break;
          }
      })
    }

    return newObj!;
  }

  public static offsetConversion(offset: (number | string)[], fullWidth: number, fullHeight: number): { x: number, y: number } {
    if(offset.length > 2) throw new Error('Offset is invalid');

    let x: number | string = offset[0];
    let y: number | string = offset[1];
    let newX = '';
    let newY = '';

    if(typeof x === 'string') {
      x.split(' ').map((value: string) => {
        const isPx = value.slice(-2) === 'px';
        const isPer = value.slice(-1) === '%';

        if(isPx) newX += value.slice(0, -2);
        else if(isPer) newX += ~~(fullWidth! / (100 / Number(value.slice(0, -1))))
        else newX += value;
      });
    } else {
      newX += x;
    }

    if(typeof y === 'string') {
      y.split(' ').map((value: string) => {
        const isPx = value.slice(-2) === 'px';
        const isPer = value.slice(-1) === '%';

        if(isPx) newY += value.slice(0, -2);
        else if(isPer) newY += ~~(fullHeight! / (100 / Number(value.slice(0, -1))))
        else newY += value;
      });
    } else {
      newY += y;
    }

    return { x: eval(newX), y: eval(newY) }
  }

  public static sizeConversion(size: (number | string)[], fullWidth: number, fullHeight: number): { w: number, h: number } {
    if(size.length > 2) throw new Error('Size is invalid');

    let w: number | string = size[0];
    let h: number | string = size[1];
    let newW = '';
    let newH = '';

    if(typeof w === 'string') {
      w.split(' ').map((value: string) => {
        const isPx = value.slice(-2) === 'px';
        const isPer = value.slice(-1) === '%';

        if(isPx) newW += value.slice(0, -2);
        else if(isPer) newW += ~~(fullHeight! / (100 / Number(value.slice(0, -1))))
        else newW += value;
      });
    } else {
      newW += w;
    }

    if(typeof h === 'string') {
      h.split(' ').map((value: string) => {
        const isPx = value.slice(-2) === 'px';
        const isPer = value.slice(-1) === '%';

        if(isPx) newH += value.slice(0, -2);
        else if(isPer) newH += ~~(fullHeight! / (100 / Number(value.slice(0, -1))))
        else newH += value;
      });
    } else {
      newH += h;
    }

    return { w: eval(newW), h: eval(newH) }
  }

  public static getType = (superObj: any, obj: any) => {
    if(superObj === null) {
      if(obj.type) {
        return obj.type;
      } else {
        return new Error('Type not specified');
      }
    } else {
      if((obj.type && superObj.type) || (obj.type && !superObj.type)) {
        return obj.type;
      } else if(!obj.type && superObj.type) {
        return superObj.type;
      } else {
        throw new Error('Type not specified')
      } 
    }
  }

   public static  convertOffset = (obj: any, arr: []) => {
    let y = arr.map((o: any) => {
      if(typeof o !== "number") {
        if(o.includes('px')) {
          return o.replace('px', '')
        } else if(o.slice(-1) === '%') {
          let u = o.replace('%', '');
          let p = 'this.width / ' + (100 / Number(u)).toString();
          return p
        }
      }

      return o
    })

    return y.join('')
  }

   public static  getOffsetX = (superObj: any, obj: any) => {
    if(superObj === null) {
      if(obj.offset) {
        return JSONUI.convertOffset(obj, obj.offset[0].split(' '));
      } else {
        return new Error('Offset not specified');
      }
    } else {
      if((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
        return obj.offset[0].replace(/px/g, '').replace(/100%/g, 'this.width').replace(/50%/g, 'this.width / 2');
      } else if(!obj.offset && superObj.offset) {
        return superObj.offset[0].replace(/px/g, '').replace(/100%/g, 'this.width').replace(/50%/g, 'this.width / 2');
      } else {
        throw new Error('Offset not specified')
      } 
    }
  }

   public static getOffsetY = (superObj: any, obj: any) => {
    if(superObj === null) {
      if(obj.offset) {
        return obj.offset[1].replace(/px/g, '').replace(/100%/g, 'this.height');
      } else {
        return new Error('Offset not specified');
      }
    } else {
      if((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
        return obj.offset[1].replace(/px/g, '').replace(/100%/g, 'this.height');
      } else if(!obj.offset && superObj.offset) {
        return superObj.offset[1].replace(/px/g, '').replace(/100%/g, 'this.height');
      } else {
        throw new Error('Offset not specified')
      } 
    }
  }

   public static getWidth = (superObj: any, obj: any) => {
    if(superObj === null) {
      if(obj.size) {
        return obj.size[0];
      } else {
        return new Error('Size not specified');
      }
    } else {
      if((obj.size && superObj.size) || (obj.size && !superObj.size)) {
        return obj.size[0];
      } else if(!obj.size && superObj.size) {
        return superObj.size[0];
      } else {
        throw new Error('Size not specified')
      } 
    }
  }

   public static getHeight = (superObj: any, obj: any) => {
    if(superObj === null) {
      if(obj.size) {
        return obj.size[1];
      } else {
        return new Error('Size not specified');
      }
    } else {
      if((obj.size && superObj.size) || (obj.size && !superObj.size)) {
        return obj.size[1];
      } else if(!obj.size && superObj.size) {
        return superObj.size[1];
      } else {
        throw new Error('Size not specified')
      } 
    }
  }

   public static getText = (superObj: any, obj: any) => {
    if(superObj === null) {
      if(obj.text) {
        return obj.text;
      } else {
        return new Error('Text not specified');
      }
    } else {
      if((obj.text && superObj.text) || (obj.text && !superObj.text)) {
        return obj.text;
      } else if(!obj.text && superObj.text) {
        return superObj.text;
      } else {
        throw new Error('Text not specified')
      } 
    }
  }

   public static getTexture = (superObj: any, obj: any) => {
    if(superObj === null) {
      if(obj.texture) {
        return obj.texture;
      } else {
        return new Error('Texture not specified');
      }
    } else {
      if((obj.texture && superObj.texture) || (obj.texture && !superObj.texture)) {
        return obj.texture;
      } else if(!obj.texture && superObj.texture) {
        return superObj.texture;
      } else {
        throw new Error('Texture not specified')
      } 
    }
  }
}

export enum Type {
  PANEL = 'panel',
  STACK_PANEL = 'stack_panel',
  LABEL = 'label',
  IMAGE = 'image',
  BUTTON = 'button',
  BUTTON_IMAGE = 'button_image'
}