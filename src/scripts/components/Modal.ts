import Settings from "../data/Settings"
import Zone from "./Zone"

class Modal extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    const { centerX, centerY } = scene.cameras.main
    super(scene, centerX, -1500)
    this._scene = scene
    this._build()
  }

  private _scene: Phaser.Scene
  private _letter: string
  private _text: Phaser.GameObjects.Text
  private _sprite: Phaser.GameObjects.Sprite
  private _overlay: Phaser.GameObjects.Sprite
  public closeModalCallback: () => void = () => { }

  private _build(): void {
    this._scene.add.existing(this)
    const { width, height, centerX, centerY } = this._scene.cameras.main
    this.setDepth(10)
    this._overlay = this._scene.add.sprite(centerX, centerY, 'black-pixel').setDisplaySize(width, height).setAlpha(0)
    this._sprite = this._scene.add.sprite(0, 0, 'modal').setOrigin(.5, .5)

    const btn = this._scene.add.sprite(this._sprite.getBounds().right - 40, this._sprite.getBounds().top + 40, 'close').setOrigin(.5, .5)
    const btnZone = Zone.createFromSprite(btn)
    btnZone.downClickCallback = () => {
      this._closeModalAnimation()
      this._closeOverlayAnimation()
    }

    this.add([this._sprite, btn, btnZone])
    this._startOverlayAnimation()
    this._startModalAnimation()
  }

  private _startOverlayAnimation(): void {
    this._scene.add.tween({
      targets: this._overlay,
      alpha: 0.7,
      ease: 'Power2',
      duration: Settings.DURATION_ANIMATION_MODAL_STEP_1 + Settings.DURATION_ANIMATION_MODAL_STEP_2,
    })
  }

  private _closeOverlayAnimation(): void {
    this._scene.add.tween({
      targets: this._overlay,
      alpha: 0,
      ease: 'Power2',
      duration: Settings.DURATION_ANIMATION_MODAL_STEP_1 + Settings.DURATION_ANIMATION_MODAL_STEP_2,
      onComplete: () => {
        this._overlay.destroy()
      }
    })
  }

  private _startModalAnimation(): void {
    const { centerX, centerY } = this._scene.cameras.main
    this._scene.add.tween({
      targets: this,
      x: centerX,
      y: centerY + 100,
      ease: 'Power1',
      duration: Settings.DURATION_ANIMATION_MODAL_STEP_1,
      onComplete: () => {
        this._scene.add.tween({
          targets: this,
          x: centerX,
          y: centerY,
          ease: 'Power1',
          duration: Settings.DURATION_ANIMATION_MODAL_STEP_2,
        })
      }
    })
  }

  private _closeModalAnimation(): void {
    const { centerX, centerY } = this._scene.cameras.main
    this._scene.add.tween({
      targets: this,
      x: centerX,
      y: centerY + 100,
      ease: 'Power1',
      duration: Settings.DURATION_ANIMATION_MODAL_STEP_2,
      onComplete: () => {
        this._scene.add.tween({
          targets: this,
          x: centerX,
          y: -1000,
          ease: 'Power1',
          duration: Settings.DURATION_ANIMATION_MODAL_STEP_1,
          onComplete: () => {
            this.removeAll(true)
            this.destroy()
            this.closeModalCallback()
          }
        })
      }
    })
  }


}


export default Modal