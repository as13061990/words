import Session from "../data/Session"
import Settings from "../data/Settings"
import Game from "../scenes/Game"

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
    let moreDelay = 0
    if (Session.getLastWordFromBooster()) moreDelay = this._scene.config.durations.animationBooster
    this._scene.tweens.add({
      targets: this,
      duration: this._scene.config.durations.animationEndLevelRectangle,
      ease: 'Power2',
      alpha: 1,
      delay: this._scene.config.delays.animationEndLevelRectangle + moreDelay,
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