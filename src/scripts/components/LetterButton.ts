import Session from "../data/Session"
import Settings from "../data/Settings"
import Utils from "../data/Utils"
import Game from "../scenes/Game"
import Zone from "./Zone"

class LetterButton extends Phaser.GameObjects.Container {
  constructor(scene: Game, x: number, y: number, letter: string) {
    super(scene, x, y)
    this._scene = scene
    this._letter = letter
    this._build()
  }

  private _scene: Game
  private _letter: string
  private _text: Phaser.GameObjects.Text
  private _activated: boolean = false
  private _sprite: Phaser.GameObjects.Sprite
  private _check: boolean = false

  private _build(): void {
    this._scene.add.existing(this)
    this._sprite = this._scene.add.sprite(0, 0, 'letterEmpty').setOrigin(.5, .5)
    this._text = this._scene.add.text(0, 0, (this._letter).toUpperCase(), {
      color: 'rgb(44,52,75)',
      font: '40px Triomphe',
    }).setOrigin(.5, .5)
    this.add([this._sprite, this._text])
  }

  public inactiveTween(): void {
    this._scene.add.tween({
      targets: [this, this._text],
      scaleX: 1,
      scaleY: 1,
      duration: Settings.DURATION_ANIMATION_LETTER_BUTTON,
      ease: 'Power2',
    })

    Utils.createChangeColorAnimation(
      this._scene,
      [this._text, this._sprite],
      Settings.DURATION_ANIMATION_LETTER_BUTTON,
      this._scene.config.colors.letterButtonActive, this._scene.config.colors.letterButtonInactive,
      this._scene.config.colors.letterButtonActiveText, this._scene.config.colors.letterButtonInactiveText
    )
  }

  public activeTween(): void {

    this._scene.add.tween({
      targets: [this, this._text],
      scaleX: 1.2,
      scaleY: 1.2,
      duration: Settings.DURATION_ANIMATION_LETTER_BUTTON,
      ease: 'Power2',
    })

    Utils.createChangeColorAnimation(
      this._scene,
      [this._text, this._sprite],
      Settings.DURATION_ANIMATION_LETTER_BUTTON,
      this._scene.config.colors.letterButtonInactive, this._scene.config.colors.letterButtonActive,
      this._scene.config.colors.letterButtonInactiveText, this._scene.config.colors.letterButtonActiveText,
    )
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

  public getText(): Phaser.GameObjects.Text {
    return this._text
  }

  public getSprite(): Phaser.GameObjects.Sprite {
    return this._sprite
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._activated && !this._check) {
      this.activeTween()
      this._check = true
    }
    if (!this._activated && this._check) {
      this.inactiveTween()
      this._check = false
    }
  }

}


export default LetterButton