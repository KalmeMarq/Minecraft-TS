import { colorLocation, gl, Main, matrixLocation, textureMatrixLocation } from "..";
import Matrix4 from "../util/math/Matrix4";
import MatrixStack from "../util/MatrixStack";
import ResourceLocation from "../util/ResourceLocation";

let cs: { [key: string]: any } = {
  ' ': { a: 4 },
  '@': { w: 7, h: 8, u: 0, v: 32, a: 3 },
  '!': { w: 7, h: 8, u: 8, v: 16, a: 2 },
  '"': { w: 7, h: 8, u: 16, v: 16, a: 2 },
  '#': { w: 7, h: 8, u: 24, v: 16, a: 2 },
  '$': { w: 7, h: 8, u: 32, v: 16, a: 2 },
  '%': { w: 7, h: 8, u: 40, v: 16, a: 2 },
  '&': { w: 7, h: 8, u: 48, v: 16, a: 2 },
  '\'': { w: 7, h: 8, u: 56, v: 16, a: 2 },
  '(': { w: 7, h: 8, u: 64, v: 16, a: 2 },
  ')': { w: 7, h: 8, u: 72, v: 16, a: 2 },
  '*': { w: 7, h: 8, u: 80, v: 16, a: 2 },
  '+': { w: 7, h: 8, u: 88, v: 16, a: 2 },
  ',': { w: 7, h: 8, u: 96, v: 16, a: 2 },
  '-': { w: 7, h: 8, u: 104, v: 16, a: 2 },
  '.': { w: 7, h: 8, u: 112, v: 16, a: 2 },
  '/': { w: 7, h: 8, u: 120, v: 16, a: 2 },
  '0': { w: 7, h: 8, u: 0, v: 24, a: 6 },
  '1': { w: 7, h: 8, u: 8, v: 24, a: 6 },
  '2': { w: 7, h: 8, u: 16, v: 24, a: 6 },
  '3': { w: 7, h: 8, u: 24, v: 24, a: 6 },
  '4': { w: 7, h: 8, u: 32, v: 24, a: 6 },
  '5': { w: 7, h: 8, u: 40, v: 24, a: 6 },
  '6': { w: 7, h: 8, u: 48, v: 24, a: 6 },
  '7': { w: 7, h: 8, u: 56, v: 24, a: 6 },
  '8': { w: 7, h: 8, u: 64, v: 24, a: 6 },
  '9': { w: 7, h: 8, u: 72, v: 24, a: 6 },
  ':': { w: 7, h: 8, u: 80, v: 24, a: 6 },
  ';': { w: 7, h: 8, u: 88, v: 24, a: 6 },
  '<': { w: 7, h: 8, u: 96, v: 24, a: 6 },
  '=': { w: 7, h: 8, u: 104, v: 24, a: 6 },
  '>': { w: 7, h: 8, u: 112, v: 24, a: 6 },
  '?': { w: 7, h: 8, u: 120, v: 24, a: 6 },
  'A': { w: 7, h: 8, u: 8, v: 32, a: 6 },
  'B': { w: 7, h: 8, u: 16, v: 32, a: 6 },
  'C': { w: 7, h: 8, u: 24, v: 32, a: 6 },
  'D': { w: 7, h: 8, u: 32, v: 32, a: 6 },
  'E': { w: 7, h: 8, u: 40, v: 32, a: 6 },
  'F': { w: 7, h: 8, u: 48, v: 32, a: 6 },
  'G': { w: 7, h: 8, u: 56, v: 32, a: 6 },
  'H': { w: 7, h: 8, u: 64, v: 32, a: 6 },
  'I': { w: 7, h: 8, u: 72, v: 32, a: 6 },
  'J': { w: 7, h: 8, u: 80, v: 32, a: 6 },
  'K': { w: 7, h: 8, u: 88, v: 32, a: 6 },
  'L': { w: 7, h: 8, u: 96, v: 32, a: 6 },
  'M': { w: 7, h: 8, u: 104, v: 32, a: 6 },
  'N': { w: 7, h: 8, u: 112, v: 32, a: 6 },
  'O': { w: 7, h: 8, u: 120, v: 32, a: 6 },
  'P': { w: 7, h: 8, u: 0, v: 40, a: 6 },
  'Q': { w: 7, h: 8, u: 8, v: 40, a: 6 },
  'R': { w: 7, h: 8, u: 16, v: 40, a: 6 },
  'S': { w: 7, h: 8, u: 24, v: 40, a: 6 },
  'T': { w: 7, h: 8, u: 32, v: 40, a: 6 },
  'U': { w: 7, h: 8, u: 40, v: 40, a: 6 },
  'V': { w: 7, h: 8, u: 48, v: 40, a: 6 },
  'W': { w: 7, h: 8, u: 56, v: 40, a: 6 },
  'X': { w: 7, h: 8, u: 64, v: 40, a: 6 },
  'Y': { w: 7, h: 8, u: 72, v: 40, a: 6 },
  'Z': { w: 7, h: 8, u: 80, v: 40, a: 6 },
  '[': { w: 7, h: 8, u: 88, v: 40, a: 6 },
  '\\': { w: 7, h: 8, u: 96, v: 40, a: 6 },
  ']': { w: 7, h: 8, u: 104, v: 40, a: 6 },
  '^': { w: 7, h: 8, u: 112, v: 40, a: 6 },
  '_': { w: 7, h: 8, u: 120, v: 40, a: 6 },
  'a': { w: 7, h: 8, u: 8, v: 48, a: 6 },
  'b': { w: 7, h: 8, u: 16, v: 48, a: 6 },
  'c': { w: 7, h: 8, u: 24, v: 48, a: 6 },
  'd': { w: 7, h: 8, u: 32, v: 48, a: 6 },
  'e': { w: 7, h: 8, u: 40, v: 48, a: 6 },
  'f': { w: 7, h: 8, u: 48, v: 48, a: 5 },
  'g': { w: 7, h: 8, u: 56, v: 48, a: 6 },
  'h': { w: 7, h: 8, u: 64, v: 48, a: 6 },
  'i': { w: 7, h: 8, u: 72, v: 48, a: 2 },
  'j': { w: 7, h: 8, u: 80, v: 48, a: 6 },
  'k': { w: 7, h: 8, u: 88, v: 48, a: 6 },
  'l': { w: 7, h: 8, u: 96, v: 48, a: 3 },
  'm': { w: 7, h: 8, u: 104, v: 48, a: 6 },
  'n': { w: 7, h: 8, u: 112, v: 48, a: 6 },
  'o': { w: 7, h: 8, u: 120, v: 48, a: 6 },
  'p': { w: 7, h: 8, u: 0, v: 56, a: 6 },
  'q': { w: 7, h: 8, u: 8, v: 56, a: 6 },
  'r': { w: 7, h: 8, u: 16, v: 56, a: 6 },
  's': { w: 7, h: 8, u: 24, v: 56, a: 6 },
  't': { w: 7, h: 8, u: 32, v: 56, a: 4 },
  'u': { w: 7, h: 8, u: 40, v: 56, a: 6 },
  'v': { w: 7, h: 8, u: 48, v: 56, a: 6 },
  'w': { w: 7, h: 8, u: 56, v: 56, a: 6 },
  'x': { w: 7, h: 8, u: 64, v: 56, a: 6 },
  'y': { w: 7, h: 8, u: 72, v: 56, a: 6 },
  'z': { w: 7, h: 8, u: 80, v: 56, a: 6 },
  '{': { w: 7, h: 8, u: 88, v: 56, a: 6 },
  '|': { w: 7, h: 8, u: 96, v: 56, a: 6 },
  '}': { w: 7, h: 8, u: 104, v: 56, a: 6 },
  '~': { w: 7, h: 8, u: 112, v: 56, a: 6 }
}

export default abstract class AbstractGui {
  public static color: number[] = [1, 1, 1, 1]
  private static readonly FONT: ResourceLocation = new ResourceLocation('./assets/ascii.png')

  // this.blit(stack, x, y, u, v, uSize, vSize);
  public setColor(r: number = 1, g: number = 1, b: number = 1, a: number = 1) {
    AbstractGui.color = [r, g, b, a]
  }

  public newBlit(matrixStack: MatrixStack, x: number, y: number, u: number, v: number, uSize: number, vSize: number, srcWidth: number = 256, srcHeight: number = 256): void {

    let matrix = /* Main.ortMt  */Matrix4.multiply(Main.ortMt, matrixStack.getCurrentMatrix());
    
    matrix = Matrix4.translate(matrix, x, y, 0);
  
    matrix = Matrix4.scale(matrix, uSize, vSize, 1);
    gl.uniform4fv(colorLocation, [1, 1, 1, 1])

    gl.uniformMatrix4fv(matrixLocation, false, matrix);
  
    let texMatrix = Matrix4.translation(u / srcWidth, v / srcHeight, 0);
    texMatrix = Matrix4.scale(texMatrix, uSize / srcWidth, vSize / srcHeight, 1);
    gl.uniform4fv(colorLocation, AbstractGui.color)
  
    gl.uniformMatrix4fv(textureMatrixLocation, false, texMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, 6)

    this.setColor(1, 1, 1, 1)
  }

  public blit(matrixStack: MatrixStack, srcX: number, srcY: number, srcWidth?: number, srcHeight?: number, dstX?: number, dstY?: number, r?: number, g?: number, b?: number, a?: number, dstWidth?: number, dstHeight?: number) {
    if(Main.tex !== null) {
      if (dstX === undefined) {
        dstX = srcX;
      }
      if (dstY === undefined) {
        dstY = srcY;
      }
      if (srcWidth === undefined) {
        srcWidth = 256;
      }
      if (srcHeight === undefined) {
        srcHeight = 256;
      }
      if (dstWidth === undefined) {
        dstWidth = srcWidth;
      }
      if (dstHeight === undefined) {
        dstHeight = srcHeight;
      }
    
      // gl.bindVertexArray(Main.vao);
      // let textureUnit = 0;
      //  gl.uniform1i(textureLocation, textureUnit)
      // gl.activeTexture(gl.TEXTURE0 + textureUnit)
      // gl.bindTexture(GL_TEXTURE_2D, Main.tex.texture)
    
      let matrix = /* Main.ortMt  */Matrix4.multiply(Main.ortMt, matrixStack.getCurrentMatrix());
    
      matrix = Matrix4.translate(matrix, dstX, dstY, 0);
    
      matrix = Matrix4.scale(matrix, dstWidth, dstHeight, 1);
      gl.uniform4fv(colorLocation, [r ?? 1, g ?? 1, b ?? 1, a ?? 1])

      gl.uniformMatrix4fv(matrixLocation, false, matrix);
    
      var texMatrix = Matrix4.translation(srcX / 256, srcY / 256, 0);
      texMatrix = Matrix4.scale(texMatrix, srcWidth / 256, srcHeight / 256, 1);
    
      gl.uniformMatrix4fv(textureMatrixLocation, false, texMatrix);

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
  }

  public blitOutlineBlack(c: number, d: number, consumer: (a: number, b: number) => void) {
    gl.blendFuncSeparate(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    consumer(c + 1, d);
    consumer(c - 1, d);
    consumer(c, d + 1);
    consumer(c, d - 1);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    consumer(c, d);
  }

  public calcWidth(text: string): number {
    let t = text.split('')
    let total = 0

    for(let i = 0; i < t.length; i++) {
      let c = t[i]
      let b = cs[c]
      total += b.a
    }

    return total
  }

  public drawText(matrixStack: MatrixStack, text: string, x: number, y: number, r: number = 1, g: number = 1, b: number = 1) {
    let t = text.split('')
    let pos = x

    Main.bind(AbstractGui.FONT)
    for(let i = 0; i < t.length; i++) {
      let c = t[i]
     
      let cb = cs[c]
      if(cb !== undefined) {
        if(c !== ' ') {
          this.setColor(0.2, 0.2, 0.2)
          this.newBlit(matrixStack, pos + 1, y + 1, cb.u, cb.v, cb.w, cb.h, 128, 128)
          
          this.setColor(r, g, b)
          this.newBlit(matrixStack, pos, y, cb.u, cb.v, cb.w, cb.h, 128, 128)
        }
        pos += cb.a
      }
    }
  }
}