import Minecraft from './Minecraft'
import AmbientOcclusionStatus from './settings/AmbientOcclusionStatus'
import SoundCategory from './settings/SoundCategory'
import Util from './util/Util'

class Main {
  public static main (): void {
    console.log(':(')
    const mc = new Minecraft()
    mc.run()
  }
}

Main.main()