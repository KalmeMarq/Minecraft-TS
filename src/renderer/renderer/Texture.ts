import { gl } from ".."
import { glBindTexture, glTexParameteri, GL_CLAMP_TO_EDGE, GL_NEAREST, GL_RGBA, GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_TEXTURE_MIN_FILTER, GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T, GL_UNSIGNED_BYTE } from "../util/GL"

export default class Texture {
  public texture: WebGLTexture | null = null
  private path: string
  public width: number = 1
  public height: number = 1

  public constructor(path: string) {
    this.path = path
  }

  public load(): void {
    this.prepare()

    let img = new Image()
    img.addEventListener('load', () => {
      this.width = img.width
      this.height = img.height

      glBindTexture(GL_TEXTURE_2D, this.texture)
      gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, GL_RGBA, GL_UNSIGNED_BYTE, img)
      gl.generateMipmap(GL_TEXTURE_2D)
    })
    img.src = this.path
  }

  public bind(): void {
    gl.bindTexture(GL_TEXTURE_2D, this.texture)
  }

  public prepare(): void {
    this.texture = gl.createTexture() as WebGLTexture
    glBindTexture(GL_TEXTURE_2D, this.texture)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST)
    gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 1, 1, 0, GL_RGBA, GL_UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
  }
}