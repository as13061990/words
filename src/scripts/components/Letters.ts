import Button from "./Button"
import Zone from "./Zone"

class Letters {
  constructor(scene: Phaser.Scene, letters: string[], x: number, y: number) {
    this._scene = scene
    this._letters = letters
    this._x = x
    this._y = y
    this._build()
  }

  private _scene: Phaser.Scene
  private _letters: string[]
  private _radius: number = 150
  private _x: number
  private _y: number

  private _build(): void {
    const circle = this._scene.add.graphics();
    circle.lineStyle(25, 0xffffff, 0.3);
    circle.strokeCircle(this._x, this._y, this._radius)

    const lettersLength = this._letters.length

    this._letters.forEach((letter, i)=>{
      let theta = -Math.PI/2  + (i * 2 * Math.PI / lettersLength)

      const x = this._x + this._radius * Math.cos(theta);
      const y = this._y + this._radius * Math.sin(theta);
      const sprite = this._scene.add.sprite(x, y, 'letter-empty');
      this._scene.add.text(sprite.getBounds().centerX, sprite.getBounds().centerY, (letter).toUpperCase(), {
        color: 'rgb(44,52,75)',
        font: '40px Triomphe',
      }).setOrigin(.5, .5).setDepth(11);
      Zone.createFromSprite(sprite)
    })
  }


}

export default Letters