class Utils {

  public static getStretchPoint(height: number, rows: number, position: number): number {
    const piece = height / rows;
    return piece * position - piece / 2;
  }

  public static convertTime(time: number): string {
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time - (hours * 60 * 60)) / 60);
    const seconds = time - (hours * 60 * 60) - minutes * 60;
    return hours + ':' + (minutes.toString().length === 1 ? '0' + minutes : minutes) + ':' + (seconds.toString().length === 1 ? '0' + seconds : seconds);
  }

  public static link(link: string): void {
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.href = link;
    a.click();
    document.body.removeChild(a);
  }

  public static gcd(num1: number, num2: number): number {
    while (num1 && num2) num1 > num2 ? num1 %= num2 : num2 %= num1;
    num1 += num2;
    return num1;
  }

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

export default Utils;