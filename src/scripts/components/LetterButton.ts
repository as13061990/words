import Session from "../data/Session"
import Game from "../scenes/Game"
import Zone from "./Zone"

const ANIMATION_DURATION = 280

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
    const startTextColor = new Phaser.Display.Color(255,255,255)
    const endTextColor = new Phaser.Display.Color(45,52,75 )
    const endPhaserColor = new Phaser.Display.Color(255, 255, 255)
    const startPhaserColor = new Phaser.Display.Color(227, 109, 162)
    this._scene.add.tween({
      targets: [this, this._text],
      scaleX: 1,
      scaleY: 1,
      duration: ANIMATION_DURATION,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress;
        
        const interpolatedColorText = Phaser.Display.Color.Interpolate.ColorWithColor(startTextColor, endTextColor, 100, interpolationValue * 100);
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);

        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));
        const colorObjectText = new Phaser.Display.Color(Math.round(interpolatedColorText.r), Math.round(interpolatedColorText.g), Math.round(interpolatedColorText.b));
        

        const colorText = `#${colorObjectText.color.toString(16)}`
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)

        this._text.setColor(colorText);
        this.setTint(colorSprite);
      },
    })
  }

  public scaleTween(): void {
    const startPhaserColor = new Phaser.Display.Color(255, 255, 255)
    const startTextColor = new Phaser.Display.Color(45,52,75)
    const endTextColor = new Phaser.Display.Color(255,255,255)
    const endPhaserColor = new Phaser.Display.Color(227, 109, 162)
    this._scene.add.tween({
      targets: [this, this._text],
      scaleX: 1.2,
      scaleY: 1.2,
      duration: ANIMATION_DURATION,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress;

        const interpolatedColorText = Phaser.Display.Color.Interpolate.ColorWithColor(startTextColor, endTextColor, 100, interpolationValue * 100);
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);
        
        
        const colorObjectText = new Phaser.Display.Color(Math.round(interpolatedColorText.r), Math.round(interpolatedColorText.g), Math.round(interpolatedColorText.b));
        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));

        const colorText = `#${colorObjectText.color.toString(16)}`
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)
        console.log(colorObjectText.color.toString(16))
        this._text.setColor(colorText);
        this.setTint(colorSprite);
      },
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