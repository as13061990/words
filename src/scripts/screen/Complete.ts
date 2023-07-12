import Button from "../components/Button";
import Session from "../data/Session";
import Settings from "../data/Settings";
import Menu from "../scenes/Menu";




class Complete {
  constructor(scene: Menu) {
    this._scene = scene
    this._build();
  }

  private _scene: Menu;
  private _btn: Button
  private _nextLevelIndex: number
  private _nextLevel: number

  private _build(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const title = this._scene.add.text(centerX, centerY - 500, 'Поздравляем!', { color: 'white', fontSize: '80px', fontFamily: 'Triomphe' }).setOrigin(0.5, 0.5)

    this._btn = new Button(this._scene, centerX, centerY + 400, 'button-green')


    const index = Settings.getLevels().findIndex(el => el.id === Settings.getCurrentLevel().id)

    if (index === Settings.getLevels().length - 1) {
      this._nextLevelIndex = 0
      this._nextLevel = Settings.getLevels()[0].data.level
    } else {
      this._nextLevelIndex = index + 1
      this._nextLevel = Settings.getLevels()[index + 1].data.level
    }


    const text = (this._nextLevel + ' уровень').toUpperCase()
    this._btn.text = this._scene.add.text(this._btn.x, this._btn.y, text, {
      color: 'white',
      font: '40px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    this._btn.callback = this._next.bind(this)

 
    const lvlProgress = Math.floor((index + 1) / 8)
    const lvlProgressPrecent = Math.floor((index % 8 + 1) * 100 / 8)
    const lvlProgressPrecentPrev = Math.floor((index % 8) * 100 / 8)

    const lvlProgressPrev = Math.floor((index) / 8)
    switch (lvlProgressPrev) {
      case 0:
        break;
      case 1:
        this._scene.cameras.main.setBackgroundColor('#543964')
        break;
      case 2:
        this._scene.cameras.main.setBackgroundColor('#320a18')
        break;
      case 3:
        this._scene.cameras.main.setBackgroundColor('#320a18')
        break;
    }


    const circleY = centerY - 200

    const image = this._scene.add.sprite(centerX, circleY, 'avatar').setOrigin(0.5, 0.5)
    const lvlProgressPrecentText = this._scene.add.text(centerX, centerY - 380, `${lvlProgressPrecentPrev} %`.toUpperCase(), {
      color: 'white',
      font: '30px Triomphe',
      align: 'center'
    }).setOrigin(.5, .5)

    const circle = this._scene.add.graphics()
    const circleProgress = this._scene.add.graphics()


    const targetProgress = lvlProgressPrecent; // Целевой прогресс (в процентах)
    let currentProgress = lvlProgressPrecentPrev; // Текущий прогресс (в процентах)

    const timerEvent = this._scene.time.addEvent({
      delay: 10, // Задержка между обновлениями анимации (в миллисекундах)
      callback: () => {
        // Постепенно увеличиваем текущий прогресс
        currentProgress += 0.1;

        // Ограничиваем текущий прогресс значением целевого прогресса
        if (currentProgress > targetProgress) {
          currentProgress = targetProgress;
        }

        // Очищаем графику круга
        circle.clear();
        circleProgress.clear()

        // Рисуем основной контур круга
        const circleRadius = 150
        circle.lineStyle(15, 0x3f4a68, 1);
        circle.strokeCircle(centerX, circleY, circleRadius);

        // Меняем текст
        lvlProgressPrecentText.setText(`${ Math.floor(currentProgress)} %`.toUpperCase())

        // Рассчитываем прогресс в долях от 0 до 1
        const ratio = currentProgress / 100;
        // Конвертируем угол в радианы
        const angle = Phaser.Math.DegToRad(-90 + 360 * ratio)
        // Рисуем заполняющийся контур
        circle.lineStyle(15, 0xeff1ef, 1);
        circle.beginPath();
        circle.arc(centerX, circleY, circleRadius, Phaser.Math.DegToRad(-90), angle, false);
        circle.strokePath();


        const x = centerX + circleRadius * Math.cos(angle); // Рассчитываем X-координату второго круга
        const y = circleY + circleRadius * Math.sin(angle); // Рассчитываем Y-координату второго круга

        // Рисование второго круга
        circleProgress.fillStyle(0xeff1ef);
        circleProgress.fillCircle(x, y, 15);

        // Если достигнут целевой прогресс, останавливаем анимацию
        if (currentProgress >= targetProgress) {
          if (currentProgress >= 100) {
            circleProgress.clear()
            switch (lvlProgress) {
              case 0:
                break;
              case 1:
                this._scene.cameras.main.setBackgroundColor('#543964')
                break;
              case 2:
                this._scene.cameras.main.setBackgroundColor('#320a18')
                break;
              case 3:
                this._scene.cameras.main.setBackgroundColor('#320a18')
                break;
            }
          }

          timerEvent.remove()
        }
      },
      callbackScope: this,
      loop: true // Повторяем анимацию до достижения целевого прогресса
    });


  }

  private _next(): void {
    this._scene.scene.start('Game');
    Settings.setCurrentLevel(Settings.getLevels()[this._nextLevelIndex])
    Session.setLevel(Settings.getCurrentLevel().data.level)
  }
}

export default Complete;