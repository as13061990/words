import Session from "../data/Session"
import Settings from "../data/Settings"
import Game from "../scenes/Game"

class BoosterSpecificLetter extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number,) {
    super(scene, x, y, 'booster-circle')
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _letter: Phaser.GameObjects.Sprite = null
  private _isActive: boolean = false

  private _build(): void {
    this._scene.add.existing(this)
    this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'hummer')
  }

  private _startAnimation(): void {

    if (this._letter instanceof Phaser.GameObjects.Sprite) {
      const star = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'star').setDepth(6)
      this._scene.tweens.add({
        targets: star,
        x: this._letter.getBounds().centerX,
        y: this._letter.getBounds().centerY,
        duration: Settings.DURATION_ANIMATION_BOOSTER,
        ease: 'Power1',
        onComplete: () => star.destroy()
      })
    }
  }

  public getIsActive(): boolean {
    return this._isActive
  }

  public setIsActive(active: boolean): void {
    this._isActive = active
  }

  public setLetter(letter: Phaser.GameObjects.Sprite) {
    this._letter = letter
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._letter?.scene) {
      this._startAnimation()
      this._letter  = null
    }
  }
}

export default BoosterSpecificLetter 
