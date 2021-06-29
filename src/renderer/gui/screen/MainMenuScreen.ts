import { Main } from '../..';
import RenderSkybox from '../../renderer/RenderSkybox';
import RenderSkyboxCube from '../../renderer/RenderSkyboxCube';
import MatrixStack from '../../util/MatrixStack';
import ResourceLocation from '../../util/ResourceLocation';
import Widget from '../widgets/Widget';
import GuiScreen from './GuiScreen';

export default class MainMenuScreen extends GuiScreen {
  private static readonly PANORAMA_OVERLAY: ResourceLocation = new ResourceLocation("./assets/background/panorama_overlay.png");
  private static readonly ACCESSIBILITY_TEXTURE: ResourceLocation = new ResourceLocation("./assets/accessibility.png");
  public static readonly CUBE_MAP: RenderSkyboxCube = new RenderSkyboxCube(new ResourceLocation("./assets/background/panorama"))
  private static readonly MINECRAFT_LOGO: ResourceLocation = new ResourceLocation('./assets/minecraft.png')
  private static readonly MINECRAFT_EDITION: ResourceLocation = new ResourceLocation("./assets/edition.png")
  private readonly panorama: RenderSkybox = new RenderSkybox(MainMenuScreen.CUBE_MAP)

  private copyrightWidth: number = 0
  private copyrightX: number = 0

  public constructor() {
    super();
  }

  protected init(): void {
    this.copyrightWidth = this.calcWidth('Copyright Mojang AB. Do not distribute!')
    this.copyrightX = this.width - this.copyrightWidth - 2

    let j = this.height / 4 + 48

    this.buttons.push(new Widget(this.width / 2 - 100, j, 200, 20, 'Singleplayer'))
    this.buttons.push(new Widget(this.width / 2 - 100, j + 24, 200, 20, 'Multiplayer'))
    this.buttons.push(new Widget(this.width / 2 - 100, j + 48, 200, 20, 'Minecraft Realms'))
    this.buttons.push(new Widget(this.width / 2 - 100, j + 72 + 12 + 5, 98, 20, 'Options...'))
    this.buttons.push(new Widget(this.width / 2 + 4, j + 72 + 12 + 5, 98, 20, 'Quit Game'))
  }

  public render(matrixStack: MatrixStack, mouseX: number, mouseY: number, deltaTime: number) {
    // this.panorama.render(matrixStack, deltaTime, MathHelper.clamp(1.0, 0.0, 1.0))
    
    let j = this.width / 2 - 137

    Main.bind(MainMenuScreen.MINECRAFT_LOGO)
    this.blitOutlineBlack(j, 30, (x, y) => {
      this.newBlit(matrixStack, x + 0, y, 0, 0, 155, 44)
      this.newBlit(matrixStack, x + 155, y, 0, 45, 155, 44)
    })

    Main.bind(MainMenuScreen.MINECRAFT_EDITION);
    this.newBlit(matrixStack, j + 88, 67, 0, 0, 98, 14, 128, 16)

    matrixStack.push()
    matrixStack.translate((this.width / 2 + 90), 70.0, 0.0)
    matrixStack.rotateZ(-20)
    let f2 = 1.8 - Math.abs(Math.sin((Date.now() % 1000) / 1000.0 * (Math.PI * 2)) * 0.1)
    f2 = f2 * 100 / (this.calcWidth('How are you mortals?') + 32);
    matrixStack.scale(f2, f2, f2)
    this.drawText(matrixStack, 'How are you mortals?', -this.calcWidth('How are you mortals?') / 2, -8, 1, 1, 0.1)
    matrixStack.pop()

    let s = "Minecraft 1.17"
    this.drawText(matrixStack, s, 2, this.height - 10, 1, 1, 1)
    this.drawText(matrixStack, "Copyright Mojang AB. Do not distribute!", this.copyrightX, this.height - 10, 1, 1, 1)

    super.render(matrixStack, mouseX, mouseY, deltaTime)
  }
}