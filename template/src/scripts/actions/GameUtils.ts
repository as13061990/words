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
}

export default GameUtils;