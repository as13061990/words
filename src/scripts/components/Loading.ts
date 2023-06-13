import buttonGreen from '../../assets/images/button-green.png';
import wordLetter from '../../assets/images/word-letter.png';
import letterEmpty from '../../assets/images/letter-empty.png';

// import sound from '../../assets/images/sound.mp3';

class Loading {
  constructor(scene: Phaser.Scene) {
    this._scene = scene;
    this._build();
  }

  private _scene: Phaser.Scene;

  private _build(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const sprite = this._scene.add.sprite(centerX, centerY, 'loading');
    this._scene.add.tween({
      targets: sprite,
      rotation: Math.PI * 2,
      repeat: -1
    });
    const bounds = sprite.getBounds();
    const text = this._scene.add.text(centerX, bounds.bottom + 50, 'Loading...0%', {
      font: '40px Triomphe',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);

    const build = this._scene.add.text(10, 10, 'build: ' + process.env.BUILD_TIME, {
      font: '25px Triomphe',
      color: '#FFFFFF'
    });

    this._scene.load.on('progress', (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText('Loading...' + percent + '%');
    }, this);
    this._scene.load.on('complete', (): void => {
      this._scene.load.removeAllListeners();
      sprite.destroy();
      text.destroy();
      build.destroy();
    }, this);

    this._loadImages();
    this._loadSounds();
  }

  private _loadImages(): void {
    this._scene.load.image('button-green', buttonGreen);
    this._scene.load.image('word-letter', wordLetter);letterEmpty
    this._scene.load.image('letter-empty', letterEmpty);
  }

  private _loadSounds(): void {
    // this._scene.load.audio('sound', sound);
  }
}

export default Loading;