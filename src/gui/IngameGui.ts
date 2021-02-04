import Minecraft from "../Minecraft.js";
import MathHelper from "../utils/MathHelper.js";
import { getResourceLocation } from "../utils/Resources.js";
import AbstractGui from "./AbstractGui.js";

export default class IngameGui extends AbstractGui {
  private mc!: Minecraft;
  private ticks!: number;
  private scaledWidth!: number;
  private scaledHeight!: number;
  private healthUpdateCounter!: number;
  private playerHealth: number = 20;
  private lastPlayerHealth!: number;
  private lastSystemTime!: number;

  constructor(mcIn: Minecraft) {
    super();
    this.mc = mcIn;
  }

  public renderIngameGui(context: CanvasRenderingContext2D): void {
    this.scaledWidth = this.mc.canvasWidth / this.mc.getScaleFactor();
    this.scaledHeight = this.mc.canvasHeight / this.mc.getScaleFactor();

    this.fill(context, 0, 0, window.innerWidth, window.innerHeight, 3355443)

    this.drawCenteredString(context, 'hey hey', this.scaledWidth / 2, this.scaledHeight / 2, -1);


    let i = this.scaledWidth / 2;
    let j = -90;
    let k = 182;
    let l = 91;

    this.blit(context, getResourceLocation('textures', 'gui/widgets'), i - 91, this.scaledHeight - 22, 0, 0, 182, 22);
    this.blit(context, getResourceLocation('textures', 'gui/widgets'), i - 91 - 1 + 0 * 20, this.scaledHeight - 22 - 1, 0, 22, 24, 22);

    this.func_238457_e_(context);
    
  }

  private func_238457_e_(context: CanvasRenderingContext2D) {
       let i = 20;
       let flag = this.healthUpdateCounter > this.ticks && (this.healthUpdateCounter - this.ticks) / 3 % 2 == 1;
       let j = new Date().getMilliseconds();
       if (i < this.playerHealth && 0 > 0) {
          this.lastSystemTime = j;
          this.healthUpdateCounter = (this.ticks + 20);
       } else if (i > this.playerHealth && 0 > 0) {
          this.lastSystemTime = j;
          this.healthUpdateCounter = (this.ticks + 10);
       }

       if (j - this.lastSystemTime > 1000) {
          this.playerHealth = i;
          this.lastPlayerHealth = i;
          this.lastSystemTime = j;
       }

       this.playerHealth = i;
       let k = this.lastPlayerHealth;
      //  this.rand.setSeed((long)(this.ticks * 312871));
      //  FoodStats foodstats = playerentity.getFoodStats();
       let l = 20;
       let i1 = this.scaledWidth / 2 - 91;
       let j1 = this.scaledWidth / 2 + 91;
       let k1 = this.scaledHeight - 39;
       let f = 20;
       let l1 = MathHelper.ceil(0);
       let i2 = MathHelper.ceil((f + l1) / 2.0 / 10.0);
       let j2 = Math.max(10 - (i2 - 2), 3);
       let k2 = k1 - (i2 - 1) * j2 - 10;
       let l2 = k1 - 10;
       let i3 = l1;
       let j3 = 20;
       let k3 = -1;

       for(let l3 = 0; l3 < 10; ++l3) {
        if (j3 > 0) {
           let i4 = i1 + l3 * 8;
           if (l3 * 2 + 1 < j3) {
              this.blit(context, getResourceLocation('textures', 'gui/icons'), i4, k2, 34, 9, 9, 9);
           }

           if (l3 * 2 + 1 == j3) {
              this.blit(context, getResourceLocation('textures', 'gui/icons'), i4, k2, 25, 9, 9, 9);
           }

           if (l3 * 2 + 1 > j3) {
              this.blit(context, getResourceLocation('textures', 'gui/icons'), i4, k2, 16, 9, 9, 9);
           }
        }
     }


     for(let l5 = MathHelper.ceil((f + l1) / 2.0) - 1; l5 >= 0; --l5) {
      let i6 = 16;
      // if (playerentity.isPotionActive(Effects.POISON)) {
      //    i6 += 36;
      // } else if (playerentity.isPotionActive(Effects.WITHER)) {
      //    i6 += 72;
      // }

      let j4 = 0;
      if (flag) {
         j4 = 1;
      }

      let k4 = MathHelper.ceil((l5 + 1) / 10.0) - 1;
      let l4 = i1 + l5 % 10 * 8;
      let i5 = k1 - k4 * j2;
      /* if (i <= 4) {
         i5 += this.rand.nextInt(2);
      } */

      if (i3 <= 0 && l5 == k3) {
         i5 -= 2;
      }

      let j5 = 0;
      if (/* playerentity.world.getWorldInfo().isHardcore() */true) {
         j5 = 5;
      }

      this.blit(context, getResourceLocation('textures', 'gui/icons'), l4, i5, 16 + j4 * 9, 9 * j5, 9, 9);
      if (flag) {
         if (l5 * 2 + 1 < k) {
            this.blit(context, getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 54, 9 * j5, 9, 9);
         }

         if (l5 * 2 + 1 == k) {
            this.blit(context, getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 63, 9 * j5, 9, 9);
         }
      }

      if (i3 > 0) {
         if (i3 == l1 && l1 % 2 == 1) {
            this.blit(context, getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 153, 9 * j5, 9, 9);
            --i3;
         } else {
            this.blit(context, getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 144, 9 * j5, 9, 9);
            i3 -= 2;
         }
      } else {
         if (l5 * 2 + 1 < i) {
            this.blit(context, getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 36, 9 * j5, 9, 9);
         }

         if (l5 * 2 + 1 == i) {
            this.blit(context, getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 45, 9 * j5, 9, 9);
         }
      }
   }


     for(let k6 = 0; k6 < 10; ++k6) {
      let i7 = k1;
      let k7 = 16;
      let i8 = 0;
      /* if (playerentity.isPotionActive(Effects.HUNGER)) {
         k7 += 36;
         i8 = 13;
      } */

      /* if (playerentity.getFoodStats().getSaturationLevel() <= 0.0F && this.ticks % (l * 3 + 1) == 0) {
         i7 = k1 + (this.rand.nextInt(3) - 1);
      } */

      let k8 = j1 - k6 * 8 - 9;
      this.blit(context, getResourceLocation('textures', 'gui/icons'), k8, i7, 16 + i8 * 9, 27, 9, 9);
      if (k6 * 2 + 1 < l) {
         this.blit(context, getResourceLocation('textures', 'gui/icons'), k8, i7, k7 + 36, 27, 9, 9);
      }

      if (k6 * 2 + 1 == l) {
         this.blit(context, getResourceLocation('textures', 'gui/icons'), k8, i7, k7 + 45, 27, 9, 9);
      }
   }

   l2 -= 10;
  }
}
