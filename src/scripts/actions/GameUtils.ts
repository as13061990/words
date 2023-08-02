import Session from "../data/Session";

class GameUtils {

  public static createChangeSpriteColorAnimation(
    scene: Phaser.Scene,
    targets: (Phaser.GameObjects.Sprite)[],
    duration: number,
    rgbStartColor: number[],
    rgbEndColor: number[],
    onComplete?: () => void
  ): Phaser.Tweens.Tween {
    const startPhaserColor = new Phaser.Display.Color(...rgbStartColor)
    const endPhaserColor = new Phaser.Display.Color(...rgbEndColor)
    return scene.add.tween({
      targets: targets,
      alpha: 1,
      duration: duration,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress + 0.1;

        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);

        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));


        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)

        targets.forEach((el) => {
          if (el instanceof Phaser.GameObjects.Sprite) {
            el.setTint(colorSprite);
          }
        });
      },
      onComplete: onComplete
    })
  }

  public static createChangeColorAnimation(
    scene: Phaser.Scene,
    targets: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[],
    duration: number,
    rgbStartColor: number[],
    rgbEndColor: number[],
    rgbStartColorText: number[],
    rgbEndColorText: number[],
    onComplete?: () => void
  ): Phaser.Tweens.Tween {
    const startPhaserColorText = new Phaser.Display.Color(...rgbStartColorText)
    const endPhaserColorText = new Phaser.Display.Color(...rgbEndColorText)
    const startPhaserColor = new Phaser.Display.Color(...rgbStartColor)
    const endPhaserColor = new Phaser.Display.Color(...rgbEndColor)
    return scene.add.tween({
      targets: targets,
      alpha: 1,
      duration: duration,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress + 0.1;

        const interpolatedColorText = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColorText, endPhaserColorText, 100, interpolationValue * 100);
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);

        const colorObjectText = new Phaser.Display.Color(Math.round(interpolatedColorText.r), Math.round(interpolatedColorText.g), Math.round(interpolatedColorText.b));
        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));

        const colorText = `#${colorObjectText.color.toString(16)}`
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)

        targets.forEach((el) => {
          if (el instanceof Phaser.GameObjects.Text) {
            el.setColor(colorText);
          } else {
            el.setTint(colorSprite);
          }
        });
      },
      onComplete: onComplete
    })
  }

  public static getWords(): IwordsFromConfig {
    const configLevel = Session.getLevelConfig()
    const words = Session.getLevelWords()
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
    return { horizontal: horizontalWords, vertical: verticalWords }
  }
}

export default GameUtils;