import Session from "../data/Session"
import Button from "./Button"
import LetterButton from "./LetterButton"
import Zone from "./Zone"

class LettersCircle {
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
  private _letterSprites: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[] = []
  private _x: number
  private _y: number

  private _build(): void {
    const circle = this._scene.add.graphics();
    circle.lineStyle(25, 0xffffff, 0.3);
    circle.strokeCircle(this._x, this._y, this._radius)

    const lettersLength = this._letters.length


    this._letters.forEach((letter, i) => {
      let theta = -Math.PI / 2 + (i * 2 * Math.PI / lettersLength)

      const x = this._x + this._radius * Math.cos(theta);
      const y = this._y + this._radius * Math.sin(theta);
      const sprite = new LetterButton(this._scene, x, y, letter);
    })
  }


}

export default LettersCircle