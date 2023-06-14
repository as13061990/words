import Session from "../data/Session"
import Game from "../scenes/Game"
import Zone from "./Zone"

class LetterButton extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number, letter: string) {
    super(scene, x, y, 'letter-empty')
    this._scene = scene
    this._letter = letter
    this._build()
  }

  private _scene: Game
  private _letter: string
  private _text: Phaser.GameObjects.Text
  private _activated: boolean = false

  private _build(): void {
    this._scene.add.existing(this)
    this._text = this._scene.add.text(this.getBounds().centerX, this.getBounds().centerY, (this._letter).toUpperCase(), {
      color: 'rgb(44,52,75)',
      font: '40px Triomphe',
    }).setOrigin(.5, .5)
  }

  public normalTween(): void {
    this._scene.add.tween({
      targets: [this, this._text],
      scaleX: 1,
      scaleY: 1,
      duration: 200,
      ease: 'Power2',
    })
  }

  public scaleTween(): void {
    this._scene.add.tween({
      targets: [this, this._text],
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      ease: 'Power2'
    })
  }

  public getActivated(): boolean {
    return this._activated
  }

  public setActivated(activated: boolean): void {
    this._activated = activated
  }

  public getLetter(): string {
    return this._letter
  }

}


export default LetterButton