import Session from "../data/Session";
import Game from "../scenes/Game";
import { currentWordType } from "../types/enums";

const REDUCE_SCALE = 0.7
const WORD_STEP = 110
const WRONG_ANIMATION_STEP_DURATION = 60
const COLOR_CHANGE_ANIMATION_DURATION = 130
const SOLVED_ANIMATION_DURATION = 600
const SOLVED_ANIMATION_DESTROY_DURATION = 100
const DESTROY_ANIMATION_DURATION = 500


class CurrentWord extends Phaser.GameObjects.Container {
  constructor(scene: Game) {
    const { centerX } = scene.cameras.main
    super(scene, centerX, scene.words[scene.words.length - 1].getBounds().bottom + 50)
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _text: string = ''
  private _animations: Phaser.Tweens.Tween[] = []
  private _copyContainer: Phaser.GameObjects.Container = null

  private _build(): void {
    this._scene.add.existing(this)
  }
  
  public destroyAll(): void {
    if (this._animations.length > 0) {
      this._animations.forEach((animation) => {
        animation.stop()
      })
    }
    this._animations = []
    this.removeAll(true)
    this.resetPosition()
  }

  public wrongAnimation(): void {
    this._startShakingAnimation()
    this._startRedAnimation()
  }

  public repeatAnimation(): void {
    this._startOrangeAnimation()
  }

  public solvedAnimation(x: number, y: number): void {
    this._startToWordAnimation(x, y)
    this.destroyAll()
    this._startGreenAnimation()
  }

  public resetPosition(): void {
    const { centerX } = this._scene.cameras.main
    this.setPosition(centerX, this._scene.words[this._scene.words.length - 1].getBounds().bottom + 50)
  }

  private _startShakingAnimation = () => {
    const { centerX } = this._scene.cameras.main
    const x = centerX - (WORD_STEP * REDUCE_SCALE * (this.list.length / 4) - WORD_STEP * REDUCE_SCALE / 2)
    this._animations.push(this._scene.add.tween({
      targets: this,
      duration: WRONG_ANIMATION_STEP_DURATION,
      x: x + 12,
      onComplete: () => {
        this._animations.push(this._scene.add.tween({
          targets: this,
          duration: WRONG_ANIMATION_STEP_DURATION,
          x: x - 12,
          onComplete: () => {
            this._animations.push(this._scene.add.tween({
              targets: this,
              duration: WRONG_ANIMATION_STEP_DURATION,
              x: x,
              onComplete: () => {
                this._animations.push(this._scene.add.tween({
                  targets: this,
                  duration: DESTROY_ANIMATION_DURATION,
                  x: x,
                  onComplete: () => {
                    this.destroyAll()
                  }
                }))
              }
            }))
          }
        }))
      }
    }))
  }

  private _startRedAnimation = () => {
    const startPhaserColor = new Phaser.Display.Color(255, 255, 255)
    const startTextColor = new Phaser.Display.Color(45, 52, 75)
    const endTextColor = new Phaser.Display.Color(255, 255, 255)
    const endPhaserColor = new Phaser.Display.Color(240, 85, 87)
    this._animations.push(this._scene.add.tween({
      targets: this,
      duration: COLOR_CHANGE_ANIMATION_DURATION,
      scale: 1,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress + 0.1;

        const interpolatedColorText = Phaser.Display.Color.Interpolate.ColorWithColor(startTextColor, endTextColor, 100, interpolationValue * 100);
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);


        const colorObjectText = new Phaser.Display.Color(Math.round(interpolatedColorText.r), Math.round(interpolatedColorText.g), Math.round(interpolatedColorText.b));
        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));

        const colorText = `#${colorObjectText.color.toString(16)}`
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)

        this.list.forEach((el) => {
          if (el instanceof Phaser.GameObjects.Sprite) {
            el.setTint(colorSprite);
          } else if (el instanceof Phaser.GameObjects.Text) {
            el.setColor(colorText)
          }
        });
      },
    }))
  }

  private _startOrangeAnimation = () => {
    const startPhaserColor = new Phaser.Display.Color(255, 255, 255)
    const startTextColor = new Phaser.Display.Color(45, 52, 75)
    const endTextColor = new Phaser.Display.Color(255, 255, 255)
    const endPhaserColor = new Phaser.Display.Color(222, 153, 85)
    this._animations.push(this._scene.add.tween({
      targets: this,
      duration: COLOR_CHANGE_ANIMATION_DURATION,
      scale: 1,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress + 0.1

        const interpolatedColorText = Phaser.Display.Color.Interpolate.ColorWithColor(startTextColor, endTextColor, 100, interpolationValue * 100);
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);


        const colorObjectText = new Phaser.Display.Color(Math.round(interpolatedColorText.r), Math.round(interpolatedColorText.g), Math.round(interpolatedColorText.b));
        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));

        const colorText = `#${colorObjectText.color.toString(16)}`
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)

        this.list.forEach((el) => {
          if (el instanceof Phaser.GameObjects.Sprite) {
            el.setTint(colorSprite);
          } else if (el instanceof Phaser.GameObjects.Text) {
            el.setColor(colorText)
          }
        });
      },
      onComplete: () => {
        this._animations.push(this._scene.add.tween({
          targets: this,
          duration: DESTROY_ANIMATION_DURATION,
          scale: 1,
          onComplete: () => {
            this.destroyAll()
          }
        }))
      }
    }))
  }

  private _startGreenAnimation = () => {
    const startPhaserColor = new Phaser.Display.Color(255, 255, 255)
    const startTextColor = new Phaser.Display.Color(45, 52, 75)
    const endTextColor = new Phaser.Display.Color(255, 255, 255)
    const endPhaserColor = new Phaser.Display.Color(110, 190, 104)
    this._animations.push(this._scene.add.tween({
      targets: this._copyContainer,
      duration: COLOR_CHANGE_ANIMATION_DURATION,
      scale: 1,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress + 0.1

        const interpolatedColorText = Phaser.Display.Color.Interpolate.ColorWithColor(startTextColor, endTextColor, 100, interpolationValue * 100);
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);


        const colorObjectText = new Phaser.Display.Color(Math.round(interpolatedColorText.r), Math.round(interpolatedColorText.g), Math.round(interpolatedColorText.b));
        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));

        const colorText = `#${colorObjectText.color.toString(16)}`
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)

        this._copyContainer.list.forEach((el) => {
          if (el instanceof Phaser.GameObjects.Sprite) {
            el.setTint(colorSprite);
          } else if (el instanceof Phaser.GameObjects.Text) {
            el.setColor(colorText)
          }
        });
      },
    }))
  }

  private _startToWordAnimation(x: number, y: number): void {
    this._copyContainer = this._scene.add.container(this.x, this.y).setDepth(5)
    this.list.forEach((el)=>{
      if (el instanceof Phaser.GameObjects.Text) {
        const text = this._scene.add.text(el.x, el.y, el.text, el.style).setOrigin(el.originX, el.originY).setScale(el.scale)
        this._copyContainer.add(text)
      } else if (el instanceof Phaser.GameObjects.Sprite) {
        const sprite = this._scene.add.sprite(el.x, el.y, el.texture.key).setScale(el.scale)
        this._copyContainer.add(sprite)
      }
    })

    this._scene.add.tween({
      targets: this._copyContainer,
      x: x,
      y: y,
      ease: 'Power2',
      duration: SOLVED_ANIMATION_DURATION,
      onComplete: () => {
        this._animations.push(this._scene.add.tween({
          targets: this,
          duration: SOLVED_ANIMATION_DESTROY_DURATION,
          scale: this.scale,
          onComplete: () => {
            this._copyContainer.removeAll(true)
            this._copyContainer.destroy()
            this._copyContainer = null
          }
        }))
      }
    })

    const texts = this._copyContainer.list.filter((el) => el instanceof Phaser.GameObjects.Text)
    const sprites = this._copyContainer.list.filter((el) => el instanceof Phaser.GameObjects.Sprite)
    sprites.forEach((el, i) => {
      this._scene.add.tween({
        targets: [el, texts[i]],
        scale: 1,
        ease: 'Power2',
        x: 0 + (i * WORD_STEP),
        duration: SOLVED_ANIMATION_DURATION,
      })
    })
  }


  protected preUpdate(time: number, delta: number): void {

    if (this._text !== Session.getCurrentWord()) {

      const word = Session.getCurrentWord()
      this._text = word

      word.split('').forEach((letter, i) => {

        const sprite = this._scene.add.sprite(0 + (i * WORD_STEP * REDUCE_SCALE), 0, 'word-letter')
        sprite.setScale(REDUCE_SCALE)

        const text = this._scene.add.text(0 + (i * WORD_STEP * REDUCE_SCALE), 0, (letter).toUpperCase(), {
          color: 'rgb(44,52,75)',
          font: '60px Triomphe',
        }).setOrigin(0.5, 0.5)
        text.setScale(REDUCE_SCALE)

        this.add([sprite, text])
        const { centerX } = this._scene.cameras.main
        this.setPosition(centerX - (WORD_STEP * REDUCE_SCALE * (word.length / 2) - WORD_STEP * REDUCE_SCALE / 2), this.y)
      })
    }
  }
}

export default CurrentWord