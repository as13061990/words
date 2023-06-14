import Button from "../components/Button";
import CurrentWord from "../components/CurrentWord";
import LetterButton from "../components/LetterButton";
import LettersCircle from "../components/LettersCircle";
import Word from "../components/Word";
import Zone from "../components/Zone";
import Session from "../data/Session";
import Game from "../scenes/Game";


const levels = [
  {
    letters: ['М', 'А', 'Х', 'У'],
    words: ['Муха', 'Хам', 'Ум', 'Уха']
  },
  {
    letters: ['Р', 'Т', 'С', 'О'],
    words: ['Рот', 'Рост', 'Сто', 'Сорт', 'Трос']
  },
  {
    letters: ['Т', 'Е', 'Р', 'Н', 'О'],
    words: ['Рот', 'Енот', 'Тон', 'Тенор', 'Трон']
  }
]


class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }

  private _scene: Game;
  private _level: number
  private _centerYLettersCircle: number

  public build(): void {
    const { centerX, centerY } = this._scene.cameras.main

    this._level = Session.getLevel()
    Session.setLevelWords(levels[this._level - 1].words)
    Session.setLevelLetters(levels[this._level - 1].letters)

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
  }

  private _createWords(): void {
    const { centerX } = this._scene.cameras.main

    const wordsStringArr = levels[this._level - 1].words

    wordsStringArr.sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }
      return a.localeCompare(b);
    });

    wordsStringArr.forEach((word, i) => {
      this._scene.words.push(new Word(this._scene, word, centerX, this._scene.title.getBounds().bottom + 80 + (i * 110)))
    })
  }

  private _createCurrentWord(): void {
    new CurrentWord(this._scene)
  }

  private _createLettersCircle(): void {
    const { centerX } = this._scene.cameras.main
    this._centerYLettersCircle = this._scene.words[this._scene.words.length - 1].getBounds().bottom + 270
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

  private _addLogicToLetterButtons(): void {

    for (let button of this._scene.letterButtons) {

      const zone = Zone.createFromSprite(button)
      const letter = button.getLetter()

      zone.downClickCallback = () => {
        Session.addLetterToCurrentWord(letter)
        button.setActivated(true)
        button.scaleTween()
      }

      zone.hoverOn = () => {
        if (Session.getCurrentWord().length > 0 && !button.getActivated()) {
          Session.addLetterToCurrentWord(letter)
          button.setActivated(true)
          button.scaleTween()
        }
      }

      zone.upCallback = () => {
        if (button.getActivated()) {
          for (let word of this._scene.words) {
            if (word.getWord().toLowerCase() === Session.getCurrentWord().toLowerCase()) {
              word.setSolved(true)
            }
          }
          Session.resetCurrentWord()
          button.setActivated(false)
          button.normalTween()
        }

      }
    }
  }

  private _back(): void {
    this._scene.scene.start('Menu')
  }
}

export default GameActions