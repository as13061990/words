import BoosterRandomLetter from "../components/BoosterRandomLetter";
import BoosterRandomWord from "../components/BoosterRandomWord";
import Button from "../components/Button";
import CurrentWord from "../components/CurrentWord";
import EndLevelRectangle from "../components/EndLevelRectangle";
import LetterButton from "../components/LetterButton";
import LettersCircle from "../components/LettersCircle";
import Word from "../components/Word";
import Zone from "../components/Zone";
import Session from "../data/Session";
import Settings from "../data/Settings";
import Game from "../scenes/Game";
import { currentWordType, solvedWord, screen, wordDirection } from "../types/enums";


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

    Session.startLevel()
    this._level = Session.getLevel()

    const btn = new Button(this._scene, centerX, centerY - 600, 'button-green')
    btn.text = this._scene.add.text(btn.x, btn.y, ('назад').toUpperCase(), {
      color: 'white',
      font: '40px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    btn.callback = this._back.bind(this)

    this._scene.title = this._scene.add.text(centerX, centerY - 500, `Уровень ${this._level}`, { color: 'white', fontSize: '80px', fontFamily: 'Triomphe' }).setOrigin(0.5, 0.5)

    this._createLettersCircle()
    this._createCurrentWord()
    this._createWords()
    this._createLetterButtons()
    this._addLogicToLetterButtons()
    this._scene.lettersCircle.shuffleLettersCallback = this._addLogicToShuffleButtonsBtn.bind(this)
    this._createEndLevelRectangle()
    this._createBoosters()
  }

  private _getWords(): { horizontal: any[], vertical: any[] } {
    const configLevel = Session.getLevelConfig()
    const words = Session.getLevelWords()
    console.log(configLevel)
    const verticalWords = [];

    for (let col = 0; col < configLevel[0].length; col++) {
      let word = '';
      let first = -1;
      for (let row = 0; row < configLevel.length; row++) {
        if (configLevel[row][col] !== 0) {
          if (first === -1) first = row + 1;
          word += configLevel[row][col];
        } else if (word !== '') {
          if (words.includes(word)) {
            verticalWords.push({ word: word, positionX: col + 1, positionY: first });
          }
          word = '';
          first = -1;
        }
      }
      if (word !== '') {
        if (words.includes(word)) {
          verticalWords.push({ word: word, positionX: col + 1, positionY: first });
        }
      }
    }

    const horizontalWords = [];
    let word = '';

    configLevel.forEach((row, i) => {
      let first = -1;

      row.forEach((letter, j) => {
        if (letter !== 0) {
          if (first === -1) first = j + 1;
          word += letter;
        } else {
          if (word.length > 0) {
            if (words.includes(word) && !horizontalWords.some(el => el.word === word)) {
              horizontalWords.push({ word: word, positionY: i + 1, positionX: first });
            }
            word = '';
            first = -1;
          }
        }
      });

      if (word.length > 0) {
        if (words.includes(word) && !horizontalWords.some(el => el.word === word)) {
          horizontalWords.push({ word: word, positionY: i + 1, positionX: first });
        }
        word = '';
      }
    });
    console.log({ horizontal: horizontalWords, vertical: verticalWords })
    return { horizontal: horizontalWords, vertical: verticalWords }
  }

  private _createWords(): void {
    const { centerX, width } = this._scene.cameras.main
    const configLevel = Session.getLevelConfig()

    if (configLevel.length > 0) {
      const { horizontal, vertical } = this._getWords()
      let scale = 1

      const space = width - 200;
      const length = configLevel[0].length
      scale = space / (Settings.WORD_STEP * length);

      const startY = this._scene.title.getBounds().bottom + 20
      const endY = this._scene.currentWord.y - 60 - (configLevel.length * 8)
      const centerY = endY - startY

      const spaceY = Math.abs(endY - startY)
      const lengthY = configLevel.length
      const scaleY = spaceY / (Settings.WORD_STEP * lengthY);

      if (scaleY < scale) {
        scale = scaleY
      }

      if (scale >= 1) {
        scale = 1
      }

      vertical.forEach((word, i) => {
        const newWord = new Word(this._scene, word.word,
          centerX - (configLevel[0].length / 2 * (Settings.WORD_STEP * scale)) + (Settings.WORD_STEP * scale * word.positionX) - Settings.WORD_STEP * scale / 2,
          centerY - (configLevel.length / 2 * (Settings.WORD_STEP * scale)) + (Settings.WORD_STEP * scale * word.positionY) - Settings.WORD_STEP * scale / 2,
          wordDirection.VERTICAL).setScale(scale)
        this._scene.words.push(newWord)
      })

      horizontal.forEach((word, i) => {
        const newWord = new Word(this._scene, word.word,
          centerX - (configLevel[0].length / 2 * (Settings.WORD_STEP * scale)) + (Settings.WORD_STEP * scale * word.positionX) - Settings.WORD_STEP * scale / 2,
          centerY - (configLevel.length / 2 * (Settings.WORD_STEP * scale)) + (Settings.WORD_STEP * scale * word.positionY) - Settings.WORD_STEP * scale / 2,
          wordDirection.HORIZONTAL).setScale(scale)
        this._scene.words.push(newWord)
      })
    } else {

      const wordsStringArr = Session.getLevelWords()
      wordsStringArr.sort((a, b) => {
        if (a.length !== b.length) {
          return a.length - b.length;
        }
        return a.localeCompare(b);
      });
      wordsStringArr.forEach((word, i) => {
        this._scene.words.push(new Word(this._scene, word, centerX - (Settings.WORD_STEP * (word.length / 2) - Settings.WORD_STEP / 2), this._scene.title.getBounds().bottom + 80 + (i * 110), wordDirection.HORIZONTAL))
      })

    }
  }

  private _createCurrentWord(): void {
    this._scene.currentWord = new CurrentWord(this._scene)
  }

  private _createLettersCircle(): void {
    const { centerX, height } = this._scene.cameras.main
    this._centerYLettersCircle = height - 240
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
        duration: Settings.DURATION_ANIMATION_SHUFFLE_STEP,
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
              duration: Settings.DURATION_ANIMATION_SHUFFLE_STEP,
              onComplete: () => this._shuffleAnimation = false
            });
          });
        }
      })
    }

  }



  private _addLogicToLetterButtons(): void {
    const graphicCircleStart = this._scene.add.graphics().setDepth(6);;
    const graphicCircleEnd = this._scene.add.graphics().setDepth(6);
    const graphicCircleMid = this._scene.add.graphics().setDepth(6);;
    const points = [];
    const pointsMouse = []
    this._scene.graphics = this._scene.add.graphics({ lineStyle: { width: 30, color: 0x568cbd } }).setDepth(6);;

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
          let type: wordDirection

          for (let word of this._scene.words) {
            if (word.getWord().toLowerCase() === Session.getCurrentWord().toLowerCase()) {
              if (word.getSolved()) {
                repeat = true
                word.repeatAnimation()
              }
              word.setSolved(solvedWord.STANDART)
              // функция для нахождения букв в перекрестиях 
              if (Session.getLevelConfig().length > 0) {
                const spritesOnlyArray = word.list.filter(el => el instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite[];
                const unsolvedWords = this._scene.words.filter(wordItem => !Session.getToCompletedWords().includes(wordItem.getWord()));

                unsolvedWords.forEach((wordItem, i) => {
                  const list = wordItem.list.filter(el => el instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite[];

                  for (let k = 0; k < spritesOnlyArray.length; k++) {
                    const currentSprite = spritesOnlyArray[k];

                    if (list.some(sprite => this._isMatchingSprite(sprite, currentSprite) && wordItem.getWord() !== word.getWord())) {
                      const solvedLetters = wordItem.getSolvedLetters();
                      const j = list.findIndex(sprite => this._isMatchingSprite(sprite, currentSprite));

                      solvedLetters[j] = 1;
                      wordItem.setSolvedLetters(solvedLetters);

                      if (wordItem.getSolvedLetters().filter(el => el === 0).length === 0) {
                        this._addCompletedWordWithBooster(wordItem);
                      }

                      break;
                    }
                  }
                });
              }
              // конец
              Session.setCurrentWordType(currentWordType.SOLVED)
              Session.addToCompletedWords(word.getWord().toLowerCase())
              solved = true
              solvedX = word.x
              solvedY = word.y
              type = word.getType()
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
              this._scene.currentWord.solvedAnimation(solvedX, solvedY, type)
              break;
          }
        }

      }
    })
  }

  private _createEndLevelRectangle(): void {
    const { centerX, centerY, height, width } = this._scene.cameras.main
    this._scene.endLevelRectangle = new EndLevelRectangle(this._scene, centerX, centerY, width, height, 0x2d344b)
    this._scene.endLevelRectangle.endAnimationCallback = this._complete.bind(this)
  }

  private _createBoosters(): void {
    const { x, y } = this._scene.lettersCircle.getPosition()
    const booster1 = this._scene.add.sprite(x - 240, y - 130, 'booster-circle').setTint(0x688ec4)

    this._scene.boosterRandomLetter = new BoosterRandomLetter(this._scene, x + 240, y - 130).setTint(0x688ec4)
    this._scene.boosterRandomWord = new BoosterRandomWord(this._scene, x + 240, y + 80).setTint(0x688ec4)

    const hummer = this._scene.add.sprite(booster1.getBounds().centerX, booster1.getBounds().centerY, 'hummer')

    const boosterRandomLetterZone = Zone.createFromSprite(this._scene.boosterRandomLetter)
    const boosterRandomWordZone = Zone.createFromSprite(this._scene.boosterRandomWord)

    boosterRandomWordZone.clickCallback = this._boosterRandomWordCallback.bind(this)
    boosterRandomLetterZone.clickCallback = this._boosterRandomLetterCallback.bind(this)
  }

  private _boosterRandomWordCallback(): void {
    let unsolvedWord = this._findUnsolvedWord()
    if (!unsolvedWord) return
    this._addCompletedWordWithBooster(unsolvedWord)
    this._scene.boosterRandomWord.setWord(unsolvedWord)
    unsolvedWord.setSolved(solvedWord.BOOSTER_WORD)

    // функция для нахождения букв в перекрестиях 
    if (Session.getLevelConfig().length > 0) {
      const spritesOnlyArray = unsolvedWord.list.filter(el => el instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite[];
      const unsolvedWords = this._scene.words.filter(word => !Session.getToCompletedWords().includes(word.getWord()));

      unsolvedWords.forEach((word, i) => {
        const list = word.list.filter(el => el instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite[];

        for (let k = 0; k < spritesOnlyArray.length; k++) {
          const currentSprite = spritesOnlyArray[k];

          if (list.some(sprite => this._isMatchingSprite(sprite, currentSprite) && word.getWord() !== unsolvedWord.getWord())) {
            const solvedLetters = word.getSolvedLetters();
            const j = list.findIndex(sprite => this._isMatchingSprite(sprite, currentSprite));

            solvedLetters[j] = 1;
            word.setSolvedLetters(solvedLetters);
            word.solveLetterAnimation(j);

            if (word.getSolvedLetters().filter(el => el === 0).length === 0) {
              this._addCompletedWordWithBooster(word);
            }

            break;
          }
        }
      });
    }
  }

  private _boosterRandomLetterCallback(): void {
    let unsolvedWord = this._findUnsolvedWord()
    if (!unsolvedWord) return
    const spritesOnlyArray = unsolvedWord.list.filter(el => el instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite[];

    const randomIndices = spritesOnlyArray.map((_, index) => index);
    const randomIndex = randomIndices.find(index => unsolvedWord.getSolvedLetters()[index] === 0);
    if (randomIndex === undefined) return

    const arr = unsolvedWord.getSolvedLetters()
    arr[randomIndex] = 1
    unsolvedWord.setSolvedLetters(arr)
    this._scene.boosterRandomLetter.setLetter(spritesOnlyArray[randomIndex])
    unsolvedWord.solveLetterAnimation(randomIndex)

    // функция для нахождения букв в перекрестиях 
    if (Session.getLevelConfig().length > 0) {
      const unsolvedWords = this._scene.words.filter(word => !Session.getToCompletedWords().includes(word.getWord()));

      unsolvedWords.forEach(word => {
        const list = word.list.filter(el => el instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite[];

        for (let j = 0; j < list.length; j++) {
          const currentSprite = list[j];
          const randomSprite = spritesOnlyArray[randomIndex];

          if (
            this._isMatchingSprite(currentSprite, randomSprite) &&
            word.getWord() !== unsolvedWord.getWord()
          ) {
            const solvedLetters = word.getSolvedLetters();
            solvedLetters[j] = 1;
            word.setSolvedLetters(solvedLetters);

            this._scene.boosterRandomLetter.setLetter(currentSprite);
            word.solveLetterAnimation(j);

            if (word.getSolvedLetters().filter(el => el === 0).length === 0) {
              this._addCompletedWordWithBooster(word);
            }

            break;
          }
        }
      });
    }
    // конец

    if (unsolvedWord.getSolvedLetters().filter(el => el === 0).length === 0) {
      this._addCompletedWordWithBooster(unsolvedWord)
    }
  }

  private _isMatchingSprite(spriteA, spriteB): boolean {
    return (
      Math.floor(spriteA.getBounds().centerX) === Math.floor(spriteB.getBounds().centerX) &&
      Math.floor(spriteA.getBounds().centerY) === Math.floor(spriteB.getBounds().centerY)
    );
  }

  private _addCompletedWordWithBooster(word: Word): void {
    Session.addToCompletedWords(word.getWord().toLowerCase())
    Session.setLastWordFromBooster(true)
    this._scene.time.addEvent({
      delay: Settings.DURATION_ANIMATION_BOOSTER, callback: (): void => { Session.setLastWordFromBooster(false) },
      loop: false
    })
  }

  private _findUnsolvedWord(): Word | undefined {
    const unsolvedWords = this._scene.words.filter(word => !Session.getToCompletedWords().includes(word.getWord()))
    const randomIndex = Phaser.Math.Between(0, unsolvedWords.length - 1)
    return unsolvedWords[randomIndex]
  }

  private _complete(): void {
    this._scene.scene.start('Menu')
    Settings.setScreen(screen.COMPLETE)
  }

  private _back(): void {
    this._scene.scene.start('Menu')
    Settings.setScreen(screen.MAIN)
  }
}

export default GameActions