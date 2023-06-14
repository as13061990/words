import Game from "../scenes/Game"

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

  private _build(): void {
    this._scene.add.existing(this)
    this.lineStyle(25, 0xffffff, 0.3);
    this.strokeCircle(this._x, this._y, this._radius)
  }

  public getRadius(): number {
    return this._radius
  }

}

export default LettersCircle