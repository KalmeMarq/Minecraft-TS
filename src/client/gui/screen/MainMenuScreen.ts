import BasicChestContainer from '../../../inventory/BasicChestContainer'
import ContainerType from '../../../inventory/ContainerType'
import { TextComponent } from '../../../util/text/TextComponent'
import Player from '../../../world/player/Player'
import PlayerInventory from '../../../world/player/PlayerInventory'
import Button from '../widgets/Button'
import BasicChestScreen from './inventory/BasicChestScreen'
import InventoryScreen from './inventory/InventoryScreen'
import LoginScreen from './LoginScreen'
import OptionsScreen from './OptionsScreen'
import Screen from './Screen'

export default class MainMenuScreen extends Screen {
  private readonly splash: string = ''
  private readonly resetDemoButton!: Button
  private readonly copyrightWidth: number = 0
  private readonly copyrightX: number = 0
  private readonly fading: boolean
  private readonly fadeInStart: number = 0
  private readonly titleEasterEgg: boolean

  public constructor (fade = false) {
    super(new TextComponent(''))
    this.fading = fade
    this.titleEasterEgg = ~~(Math.random()) < 1.0E-4
  }

  public shouldCloseOnEsc (): boolean {
    return false
  }

  protected init (): void {
    const y = this.height / 4 + 48;

    this.addButton(new Button(this.width / 2 - 100, y, 200, 20, new TextComponent('test'), (button) => {
      this.mc.setScreen(new InventoryScreen(new Player()))
    }))

    this.addButton(new Button(this.width / 2 - 100, y + 24, 200, 20, new TextComponent('test'), (button) => {
      this.mc.setScreen(new LoginScreen(this))
    }))
  
    this.addButton(new Button(this.width / 2 - 100, y + 48, 200, 20, new TextComponent('test'), (button) => {
    }))

    this.addButton(new Button(this.width / 2 - 100, y + 84, 98, 20, new TextComponent('test'), (button) => {
      this.mc.setScreen(new OptionsScreen(this));
    }))

    this.addButton(new Button(this.width / 2 + 2, y + 84, 98, 20, new TextComponent('test'), (button) => {
      window.location.href = window.location.href
    }))
  }

  public render (mouseX: number, mouseY: number, partialTicks: number): void {
    super.render(mouseX, mouseY, partialTicks)
  }
}
