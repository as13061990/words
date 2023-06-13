import Button from "../components/Button";
import CurrentWord from "../components/CurrentWord";
import LettersCircle from "../components/LettersCircle";
import Word from "../components/Word";
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
    

    this._generateWords()
    new CurrentWord(this._scene)
    this._generateLetters()
  }

  private _generateWords(): void {
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

  private _generateLetters(): void {
    const { centerX } = this._scene.cameras.main
    const lettersStringArr = levels[this._level - 1].letters
    new LettersCircle(this._scene, lettersStringArr, centerX, this._scene.words[this._scene.words.length - 1].sprite.getBounds().bottom + 270, )
  }

  private _back(): void {
    this._scene.scene.start('Menu')
  }
}

export default GameActions