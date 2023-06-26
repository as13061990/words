import Button from "../components/Button";
import CurrentWord from "../components/CurrentWord";
import LetterButton from "../components/LetterButton";
import LettersCircle from "../components/LettersCircle";
import Word from "../components/Word";
import Zone from "../components/Zone";
import Session from "../data/Session";
import Settings from "../data/Settings";
import Game from "../scenes/Game";
import { currentWordType } from "../types/enums";

const WORD_STEP = 110
const SHUFFLE_ANIMATION_DURATION = 200

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }

  private _scene: Game;
  private _level: number
  private _centerYLettersCircle: number
  private _shuffleAnimation: boolean = false

  public build(): void {
    const { centerX, centerY } = this._scene.cameras.main

    this._level = Session.getLevel()
    Session.setLevelWords(Settings.getCurrentLevel().data.words)
    Session.setLevelLetters(Settings.getCurrentLevel().data.letters)

    const btn = new Button(this._scene, centerX, centerY - 600, 'button-green')
    btn.text = this._scene.add.text(btn.x, btn.y, ('назад').toUpperCase(), {
      color: 'white',
      font: '40px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    btn.callback = this._back.bind(this)

    this._scene.title = this._scene.add.text(centerX, centerY - 500, `Уровень ${this._level}`, { color: 'white', fontSize: '80px', fontFamily: 'Triomphe' }).setOrigin(0.5, 0.5)


    this._createWords()
    this._createCurrentWord()
    this._createLettersCircle()
    this._createLetterButtons()
    this._addLogicToLetterButtons()
    this._scene.lettersCircle.shuffleLettersCallback = this._addLogicToShuffleButtonsBtn.bind(this)
  }

  private _createWords(): void {
    const { centerX } = this._scene.cameras.main

    const wordsStringArr = Session.getLevelWords()

    wordsStringArr.sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }
      return a.localeCompare(b);
    });

    wordsStringArr.forEach((word, i) => {
      this._scene.words.push(new Word(this._scene, word, centerX - (WORD_STEP * (word.length / 2) - WORD_STEP / 2), this._scene.title.getBounds().bottom + 80 + (i * 110)))
    })
  }

  private _createCurrentWord(): void {
    this._scene.currentWord = new CurrentWord(this._scene)
  }

  private _createLettersCircle(): void {
    const { centerX } = this._scene.cameras.main
    this._centerYLettersCircle = this._scene.words[this._scene.words.length - 1].getBounds().bottom + 300
    this._scene.lettersCircle = new LettersCircle(this._scene, centerX, this._centerYLettersCircle)
  }

  private _createLetterButtons(): void {
    const letters = Session.getLevelLetters()
    const circle = this._scene.lettersCircle
    const { centerX } = this._scene.cameras.main

    letters.forEach((letter, i) => {
      let theta = -Math.PI / 2 + (i * 2 * Math.PI / letters.length)

      const x = centerX + circle.getRadius() * Math.cos(theta);
      const y = this._centerYLettersCircle + circle.getRadius() * Math.sin(theta);
      this._scene.letterButtons.push(new LetterButton(this._scene, x, y, letter));
    })
  }

  private _addLogicToShuffleButtonsBtn(): void {
    if (!this._shuffleAnimation) {
      const circle = this._scene.lettersCircle;
      const centerX = circle.getPosition().x;
      const letters = Session.getLevelLetters()
      this._shuffleAnimation = true
  
      this._scene.tweens.add({
        targets: [...this._scene.letterButtons],
        ease: 'Exponential.easeOut',
        x: this._scene.lettersCircle.getPosition().x,
        y: this._scene.lettersCircle.getPosition().y,
        duration: SHUFFLE_ANIMATION_DURATION,
        onComplete: () => {
          const shuffledButtons = Phaser.Utils.Array.Shuffle(this._scene.letterButtons.slice());
          shuffledButtons.forEach((button, i) => {
            let theta = -Math.PI / 2 + (i * 2 * Math.PI / letters.length)
            const x = centerX + circle.getRadius() * Math.cos(theta);
            const y = this._centerYLettersCircle + circle.getRadius() * Math.sin(theta);
  
            this._scene.tweens.add({
              targets: button,
              ease: 'Exponential.easeOut',
              x,
              y,
              duration: SHUFFLE_ANIMATION_DURATION,
              onComplete: () => this._shuffleAnimation = false
            });
          });
        }
      })
    }

  }



  private _addLogicToLetterButtons(): void {
    const graphicCircleStart = this._scene.add.graphics();
    const graphicCircleEnd = this._scene.add.graphics();
    const graphicCircleMid = this._scene.add.graphics();
    const points = [];
    const pointsMouse = []
    this._scene.graphics = this._scene.add.graphics({ lineStyle: { width: 30, color: 0x568cbd } });

    this._scene.input.on('pointermove', (pointer) => {

      if (this._scene.activeLetterButtons.length > 0) {
        pointsMouse.splice(0)
        graphicCircleEnd.clear()
        this._scene.graphics.clear();

        for (let i = 0; i < this._scene.activeLetterButtons.length; i++) {
          const preLastBtn = this._scene.activeLetterButtons[i].getBounds()
          const preLastBtnPoint = new Phaser.Math.Vector2(preLastBtn.centerX, preLastBtn.centerY);
          pointsMouse.push(preLastBtnPoint);
        }

        let circle = new Phaser.Geom.Circle(pointer.x, pointer.y, 1);
        graphicCircleEnd.lineStyle(28, 0x568cbd);
        graphicCircleEnd.strokeCircleShape(circle);

        const pointerPoint = new Phaser.Math.Vector2(pointer.x, pointer.y);
        pointsMouse.push(pointerPoint);
        const curve = new Phaser.Curves.Spline(pointsMouse);
        this._scene.graphics.strokePoints(curve.getPoints(200));
      }
    });

    this._scene.letterButtons.forEach((button, i) => {
      const zone = new Zone(this._scene, 0, 0, button.getSprite().width, button.getSprite().height)
      const letter = button.getLetter()

      button.add(zone)

      zone.downClickCallback = () => {
        if (this._shuffleAnimation) return

        this._scene.currentWord.destroyAll()
        Session.addLetterToCurrentWord(letter)
        button.setActivated(true)
        button.scaleTween()
        this._scene.activeLetterButtons.push(button)

        let circle = new Phaser.Geom.Circle(button.getBounds().centerX, button.getBounds().centerY, 1);
        graphicCircleStart.lineStyle(28, 0x568cbd);
        graphicCircleStart.strokeCircleShape(circle);

        const point = new Phaser.Math.Vector2(button.getBounds().centerX, button.getBounds().centerY);
        points.push(point);
        pointsMouse.push(point);
      }

      zone.hoverOn = () => {

        if (Session.getCurrentWord().length) {
          if (!button.getActivated()) {
            this._scene.currentWord.destroyAll()
            Session.addLetterToCurrentWord(letter)
            button.setActivated(true)
            button.scaleTween()
            this._scene.activeLetterButtons.push(button)

            pointsMouse.splice(0)

            graphicCircleMid.clear()
            let circle = new Phaser.Geom.Circle(button.getBounds().centerX, button.getBounds().centerY, 1);
            graphicCircleMid.lineStyle(29, 0x568cbd);
            graphicCircleMid.strokeCircleShape(circle);

          } else {
            if (Session.getCurrentWord().length > 1) {
              const activeBtnIndex = this._scene?.activeLetterButtons.findIndex(btn => btn === button)
              if (button.getActivated() === this._scene?.activeLetterButtons[activeBtnIndex + 1]?.getActivated() && !this._scene?.activeLetterButtons[activeBtnIndex + 2]?.getActivated()) {
                Session.minusCurrentWord()
                this._scene.activeLetterButtons[activeBtnIndex + 1].setActivated(false)
                this._scene.activeLetterButtons[activeBtnIndex + 1].normalTween()
                this._scene.activeLetterButtons = this._scene.activeLetterButtons.slice(0, -1)

                graphicCircleMid.clear()
                let circle = new Phaser.Geom.Circle(button.getBounds().centerX, button.getBounds().centerY, 1);
                graphicCircleMid.lineStyle(29, 0x568cbd);
                graphicCircleMid.strokeCircleShape(circle);
              }
            }
          }
        }
      }

      zone.upCallback = () => {

        
        if (button.getActivated()) {
          graphicCircleStart.clear()
          graphicCircleEnd.clear()
          graphicCircleMid.clear()
  
          this._scene?.graphics?.clear();
          points.splice(0)
          pointsMouse.splice(0)

          this._scene.letterButtons.forEach((btn) => {
            if (btn.getActivated()) {
              btn.setActivated(false)
              btn.normalTween()
            }
          })
          this._scene.activeLetterButtons = []

          let solved = false
          let repeat = false
          let solvedX: number, solvedY: number

          for (let word of this._scene.words) {
            if (word.getWord().toLowerCase() === Session.getCurrentWord().toLowerCase()) {
              if (word.getSolved()) {
                repeat = true
                word.repeatAnimation()
              }
              word.setSolved(true)
              Session.setCurrentWordType(currentWordType.SOLVED)
              solved = true
              solvedX = word.x
              solvedY = word.y
            }
          }

          if (!solved) Session.setCurrentWordType(currentWordType.WRONG)
          if (repeat) Session.setCurrentWordType(currentWordType.REPEAT)

          switch (Session.getCurrentWordType()) {
            case currentWordType.WRONG:
              Session.setCurrentWordType(currentWordType.DEFAULT)
              Session.resetCurrentWord()
              this._scene.currentWord.wrongAnimation()
              break;
            case currentWordType.REPEAT:
              Session.setCurrentWordType(currentWordType.DEFAULT)
              Session.resetCurrentWord()
              this._scene.currentWord.repeatAnimation()
              break;
            case currentWordType.SOLVED:
              Session.setCurrentWordType(currentWordType.DEFAULT)
              Session.resetCurrentWord()
              this._scene.currentWord.solvedAnimation(solvedX, solvedY)
              break;
          }
        }

      }
    })
  }

  private _back(): void {
    this._scene.scene.start('Menu')
  }
}

export default GameActions