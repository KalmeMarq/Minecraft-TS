import { readFileSync } from "original-fs"
import GuiScreen from "./gui/screen/GuiScreen"
import MainMenuScreen from "./gui/screen/MainMenuScreen"
import GameRenderer from "./renderer/GameRenderer"
import Texture from "./renderer/Texture"
import { useContext } from "./util/GL"
import Matrix4 from "./util/math/Matrix4"
import ResourceLocation from "./util/ResourceLocation"

export let positionAttributeLocation = -1
export let texcoordAttributeLocation = -1
export let matrixLocation: WebGLUniformLocation | null = null
export let textureLocation: WebGLUniformLocation | null = null
export let textureMatrixLocation: WebGLUniformLocation | null = null
export let colorLocation: WebGLUniformLocation | null = null
export let program: WebGLProgram | null = null

class TestDataStore {
  public pos: number[] = []
  public uvs: number[] = []
  public colors: number[] = []

  public constructor() {
  }

  public vertex() {}
  
  public uv() {}

  public color(r: number, g: number, b: number, a: number) {
    this.colors.push(r, g, b, a)
  }
}

export let gl: WebGL2RenderingContext
export class Main {
  public static texs: Map<string, Texture> = new Map()
  public static tex: Texture | null = null
  public static screen: GuiScreen | null = null
  public static xPos: number = 0
  public static yPos: number = 0
  public static delta: number = 0
  public static ortMt: number[] = Matrix4.identity()
  public static vao: WebGLVertexArrayObject | null = null

  public static bind(location: ResourceLocation): void {
    let t = this.texs.get(location.getPath())
    if(t === undefined) {
      t = new Texture(location.getPath()) 
      t.load()
      Main.texs.set(location.getPath(), t)
    } 
    Main.tex = t
    // if(t.height > 1) {
      t.bind()
    // }
  }
  
  public static async main(): Promise<void> {
    const canvas = document.createElement('canvas')
    let glc = canvas.getContext('webgl2')
    if(!glc) return
    gl = glc
    useContext(gl)
    document.getElementById('root')?.appendChild(canvas)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      Main.screen?.resize(gl.canvas.width / 3, gl.canvas.height / 3)
    })

    addEventListener('mousemove', (e) => {
      Main.xPos = e.clientX
      Main.yPos = e.clientY
    })

    let vsSource = readFileSync('./assets/shader/txtr.vsh', { encoding: 'utf-8' })
    let fsSource = readFileSync('./assets/shader/txtr.fsh', { encoding: 'utf-8' })
    let vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vsSource) as WebGLShader
    let fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fsSource) as WebGLShader
    program = this.createProgram(gl, vertexShader, fragmentShader) as WebGLProgram

    positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    texcoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord")

    matrixLocation = gl.getUniformLocation(program, "u_matrix")
    textureLocation = gl.getUniformLocation(program, "u_texture")
    textureMatrixLocation = gl.getUniformLocation(program, "u_textureMatrix")
    
    colorLocation = gl.getUniformLocation(program, "u_color")

    gl.useProgram(program)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    let gameRenderer = new GameRenderer()
    Main.screen = new MainMenuScreen()
    Main.screen.initScreen(gl.canvas.width / 3, gl.canvas.height / 3)
    Main.vao = gl.createVertexArray() as WebGLVertexArrayObject
    gl.bindVertexArray(Main.vao)

    let positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    var positions = [
      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    var texcoords = [
      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(texcoordAttributeLocation)
    gl.vertexAttribPointer(texcoordAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    
    // gl.enable(gl.CULL_FACE)
    gl.enable(gl.BLEND)
    gl.blendEquation(gl.FUNC_ADD)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    function loop(time: number) {
      time *= 0.001;
      Main.delta = time
  
      gameRenderer.render()

      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }

  public static createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
    let shader = gl.createShader(type) as WebGLShader
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if(success) return shader
   
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  public static createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    var program = gl.createProgram() as WebGLProgram
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    let success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if(success) return program
   
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }
}

Main.main()