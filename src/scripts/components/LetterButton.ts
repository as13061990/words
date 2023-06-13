import Session from "../data/Session"
import Zone from "./Zone"

class LetterButton extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, letter: string) {
    super(scene, x, y, 'letter-empty')
    this._scene = scene
    this._letter = letter
    this._build()
  }

  private _scene: Phaser.Scene
  private _letter: string
  private _text: Phaser.GameObjects.Text
  private _active: boolean = false

  private _build(): void {
    this._scene.add.existing(this)
    this._text = this._scene.add.text(this.getBounds().centerX, this.getBounds().centerY, (this._letter).toUpperCase(), {
      color: 'rgb(44,52,75)',
      font: '40px Triomphe',
    }).setOrigin(.5, .5)


    const zone = Zone.createFromSprite(this)

    zone.downClickCallback = () => {
      Session.addLetterToCurrentWord(this._letter)
      this._active = true
      this.scaleTween()
    }

    zone.hoverOn = () => {
      if (Session.getCurrentWord().length > 0 && !this._active) {
        Session.addLetterToCurrentWord(this._letter)
        this._active = true
        this.scaleTween()
      }
    }

    zone.upCallback = () => {
      if (this._active) {
        Session.resetCurrentWord()
        this._active = false
      }
      this.normalTween()
    }
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
}


export default LetterButton