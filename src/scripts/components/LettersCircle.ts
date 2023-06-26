import Game from "../scenes/Game"
import Zone from "./Zone"

const BTN_ANIMATION_DURATION = 100

class LettersCircle extends Phaser.GameObjects.Graphics {
  constructor(scene: Game, x: number, y: number) {
    super(scene)
    this._scene = scene
    this._x = x
    this._y = y
    this._build()
  }

  private _scene: Game
  private _radius: number = 150
  private _x: number
  private _y: number
  private _btnSprite: Phaser.GameObjects.Sprite

  public shuffleLettersCallback: () => void = () => {}

  private _build(): void {
    this._scene.add.existing(this)
    this.lineStyle(25, 0x3f4a68, 1);
    this.strokeCircle(this._x, this._y, this._radius)
    this._btnSprite = this._scene.add.sprite(this._x, this._y, 'restart-buttons')
    const zone = Zone.createFromSprite(this._btnSprite)

    zone.downClickCallback = () => {
      this.shuffleLettersCallback()
      this._reduceAnimation()
    }
  }

  private _reduceAnimation(): void {
    this._scene.tweens.add({
      targets: this._btnSprite,
      scale: 0.9,
      ease: 'Power2',
      duration: BTN_ANIMATION_DURATION,
      onComplete: this._scaleAnimation.bind(this)
    })
  }

  private _scaleAnimation(): void {
    this._scene.tweens.add({
      targets: this._btnSprite,
      scale: 1,
      ease: 'Power2',
      duration: BTN_ANIMATION_DURATION,
    })
  }

  public getPosition(): {x: number, y: number} {
    return {x: this._x, y: this._y}
  }

  public getRadius(): number {
    return this._radius
  }

}

export default LettersCircle