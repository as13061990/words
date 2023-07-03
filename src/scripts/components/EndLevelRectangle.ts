import Session from "../data/Session"
import Game from "../scenes/Game"

const ANIMATION_VISABLE_DURATION = 800
const ANIMATION_VISABLE_DELAY = 1200

class EndLevelRectangle extends Phaser.GameObjects.Rectangle {
  constructor(scene: Game, x: number, y: number, width: number, height: number, color: number) {
    super(scene, x, y, width, height, color)
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _check: boolean = false
  public endAnimationCallback: () => void = () => { }


  private _build(): void {
    this._scene.add.existing(this)
    this.setDepth(11)
    this.setAlpha(0)
  }

  private _startVisableAnimation(): void {
    this._scene.tweens.add({
      targets: this,
      duration: ANIMATION_VISABLE_DURATION,
      ease: 'Power2',
      alpha: 1,
      delay: ANIMATION_VISABLE_DELAY,
      onComplete: this.endAnimationCallback
    })
  }

  protected preUpdate(time: number, delta: number): void {
    if (Session.getLevelComplete() && !this._check) {
      this._check = true
      this._startVisableAnimation()
    }
  }

}

export default EndLevelRectangle