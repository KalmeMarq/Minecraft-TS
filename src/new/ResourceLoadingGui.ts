import AbstractGui from '@mcsrc/gui/AbstractGui';
import Minecraft from '@mcsrc/Minecraft';
import MathHelper from '@mcsrc/util/MathHelper';
import Util from '@mcsrc/util/Util';
import ResourceLocation from './ResourceLocation';

export default class ResourceLoadingGui {
  private mc: Minecraft;
  private static MOJANG_LOGO_TEXTURE: ResourceLocation = new ResourceLocation('textures/gui/title/mojangstudios.png');
  private fadeOutStart: number = -1;
  private fadeInStart: number = -1;
  private reloading;

  constructor(mcIn: Minecraft) {
    this.mc = mcIn;
    this.reloading = true;
  }

  public changeReloading(a: boolean) {
    this.reloading =  a;
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    let width = this.mc.getMainCanvas().getScaledWidth();
    let height = this.mc.getMainCanvas().getScaledHeight();

    context.fillStyle = 'rgb(220, 0, 0)';
    context.fillRect(0, 0, width, height);

    const mojangLogoTexture = this.mc.getTextureManager().getTexture(ResourceLoadingGui.MOJANG_LOGO_TEXTURE);

  /*   context.setTransform(1, 0, 0, 1, 0, 0);
    context.save();
    AbstractGui.blit(context, mojangLogoTexture, 0, height / 2 - 20, 0, 0, 512, 165);
    AbstractGui.blit(context, mojangLogoTexture, (width) / 2 + 512, height / 2 - 20, 0, 258, 512, 165);
    context.restore();
    context.setTransform(this.mc.getMainCanvas().getGuiScaleFactor(), 0, 0, this.mc.getMainCanvas().getGuiScaleFactor(), 0, 0); */

   /*  let k = Util.milliTime();
    if(this.fadeInStart == -1) {
      this.fadeInStart = k;
    }

    let f = this.fadeOutStart > -1 ? (k - this.fadeOutStart) / 1000.0 : -1.0;
    let f1 = this.fadeInStart > -1 ? (k - this.fadeInStart) / 500.0 : -1.0;
    let f2: number = 0;
      if (f >= 1.0) {
         if (this.mc.currentScreen != null) {
            this.mc.currentScreen.render(context, 0, 0, partialTicks);
         }
         f2 = 1.0 - MathHelper.clamp(f - 1.0, 0.0, 1.0);
      } else if (this.reloading) {
         if (this.mc.currentScreen != null && f1 < 1.0) {
            this.mc.currentScreen.render(context, mouseX, mouseY, partialTicks);
         }

         let i2 = MathHelper.ceil(MathHelper.clamp(f1, 0.15, 1.0) * 255.0);
         f2 = MathHelper.clamp(f1, 0.0, 1.0);
      } else {
         f2 = 1.0;
      }

    context.globalAlpha = f2;

    let width = this.mc.getMainCanvas().getScaledWidth();
    let height = this.mc.getMainCanvas().getScaledHeight();

    let halfWidth = Math.ceil(this.mc.getMainCanvas().getScaledWidth() * 0.5);
    let halfHeight = Math.ceil(this.mc.getMainCanvas().getScaledHeight() * 0.5);

    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);

    let d0 = Math.min(this.mc.getMainCanvas().getScaledWidth() * 0.75, this.mc.getMainCanvas().getScaledHeight()) * 0.25;
    let j1 = Math.ceil(d0 * 0.5);
    let d1 = d0 * 4.0;
    let k1 = Math.ceil(d1 * 0.5);

    context.setTransform(1, 0, 0, 1, 0, 0);
    const mojangLogoTexture = this.mc.getTextureManager().getTexture(ResourceLoadingGui.MOJANG_LOGO_TEXTURE);
    
    AbstractGui.blit(context, mojangLogoTexture, (width) / 2, halfHeight - j1, 0, 0, 512, 165);
    AbstractGui.blit(context, mojangLogoTexture, (width) / 2 + 512, halfHeight - j1, 0, 258, 512, 165);

    context.setTransform(this.mc.getMainCanvas().getGuiScaleFactor(), 0, 0, this.mc.getMainCanvas().getGuiScaleFactor(), 0, 0);
    context.globalAlpha = 1;

    if(f >= 2.0) {
      this.mc.setLoadingGui(null);
    }
    
    if (this.fadeOutStart == -1 && (!this.reloading || f1 >= 2.0)) {
      this.fadeOutStart = Util.milliTime();
      if (this.mc.currentScreen != null) {
         this.mc.currentScreen.initScreen(this.mc, this.mc.getMainCanvas().getScaledWidth(), this.mc.getMainCanvas().getScaledHeight());
      }
    } */
  }
}