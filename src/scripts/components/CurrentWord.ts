import Session from "../data/Session";
import Settings from "../data/Settings";
import Game from "../scenes/Game";
import { currentWordType, wordDirection } from "../types/enums";


class CurrentWord extends Phaser.GameObjects.Container {
  constructor(scene: Game) {
    const { centerX } = scene.cameras.main
    super(scene, centerX, scene.lettersCircle.getPosition().y - 200)
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

  public solvedAnimation(x: number, y: number, type: wordDirection): void {
    this._startToWordAnimation(x, y, type)
    this.destroyAll()
    this._startGreenAnimation()
  }

  public resetPosition(): void {
    const { centerX } = this._scene.cameras.main
    this.setPosition(centerX, this._scene.words[this._scene.words.length - 1].getBounds().bottom + 50)
  }

  private _startShakingAnimation = () => {
    const { centerX } = this._scene.cameras.main
    const x = centerX - (Settings.WORD_STEP * Settings.REDUCE_SCALE * (this.list.length / 4) - Settings.WORD_STEP * Settings.REDUCE_SCALE / 2)
    this._animations.push(this._scene.add.tween({
      targets: this,
      duration: Settings.DURATION_ANIMATION_CURRENTWORD_WRONG_STEP,
      x: x + 12,
      onComplete: () => {
        this._animations.push(this._scene.add.tween({
          targets: this,
          duration: Settings.DURATION_ANIMATION_CURRENTWORD_WRONG_STEP,
          x: x - 12,
          onComplete: () => {
            this._animations.push(this._scene.add.tween({
              targets: this,
              duration: Settings.DURATION_ANIMATION_CURRENTWORD_WRONG_STEP,
              x: x,
              onComplete: () => {
                this._animations.push(this._scene.add.tween({
                  targets: this,
                  duration: Settings.DURATION_ANIMATION_CURRENTWORD_DESTROY,
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
      duration: Settings.DURATION_ANIMATION_CURRENTWORD_COLOR_CHANGE,
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
      duration: Settings.DURATION_ANIMATION_CURRENTWORD_COLOR_CHANGE,
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
          duration: Settings.DURATION_ANIMATION_CURRENTWORD_DESTROY,
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
      duration: Settings.DURATION_ANIMATION_CURRENTWORD_COLOR_CHANGE,
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

  private _startToWordAnimation(x: number, y: number, type: wordDirection): void {
    this._copyContainer = this._scene.add.container(this.x, this.y).setDepth(2)
    this.list.forEach((el) => {
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
      duration: Settings.DURATION_ANIMATION_WORD_STANDART_RESOLVE,
      onComplete: () => {
        this._animations.push(this._scene.add.tween({
          targets: this,
          duration: Settings.DURATION_ANIMATION_CURRENTWORD_SOLVED_DESTOY,
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
    if (type === wordDirection.HORIZONTAL) {
      sprites.forEach((el, i) => {
        this._scene.add.tween({
          targets: [el, texts[i]],
          scale: this._scene.words[0].scale,
          ease: 'Power2',
          x: 0 + (i * Settings.WORD_STEP * this._scene.words[0].scale),
          duration: Settings.DURATION_ANIMATION_WORD_STANDART_RESOLVE,
        })
      })
    } else {
      sprites.forEach((el, i) => {
        this._scene.add.tween({
          targets: [el, texts[i]],
          scale: this._scene.words[0].scale,
          ease: 'Power2',
          y: 0 + (i * Settings.WORD_STEP * this._scene.words[0].scale),
          x: 0,
          duration: Settings.DURATION_ANIMATION_WORD_STANDART_RESOLVE,
        })
      })
    }
  }

  private _createWord(): void {
    const word =  Session.getCurrentWord()
    word.split('').forEach((letter, i) => {
      const sprite = this._scene.add.sprite(0 + (i * Settings.WORD_STEP * Settings.REDUCE_SCALE), 0, 'word-letter')
      sprite.setScale(Settings.REDUCE_SCALE)

      const text = this._scene.add.text(0 + (i * Settings.WORD_STEP * Settings.REDUCE_SCALE), 0, (letter).toUpperCase(), {
        color: 'rgb(44,52,75)',
        font: '60px Triomphe',
      }).setOrigin(0.5, 0.5)
      text.setScale(Settings.REDUCE_SCALE)

      this.add([sprite, text])
      const { centerX } = this._scene.cameras.main

      this.setPosition(centerX - (Settings.WORD_STEP * Settings.REDUCE_SCALE * (word.length / 2) - Settings.WORD_STEP * Settings.REDUCE_SCALE / 2),  this._scene.lettersCircle.getPosition().y - 230)
    })
  }


  protected preUpdate(time: number, delta: number): void {

    if (this._text !== Session.getCurrentWord()) {
      const word = Session.getCurrentWord()
      if (word > this._text) {
        this._text = word
        this._createWord()
      } else {
        this._text = word
        if (this._text.length === 0) return
        this.removeAll(true)
        this._createWord()
      }
    }
  }
}

export default CurrentWord