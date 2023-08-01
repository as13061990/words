import axios from 'axios';
//@ts-ignore
import * as Webfont from 'webfontloader';
import loading from '../../assets/images/loading.png';
import Interval from '../actions/IntervalExample';
import Settings from '../data/Settings';
import Session from '../data/Session';
import PreloadConfig from '../data/PreloadConfig';
import GameConfig from '../data/GameConfig';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  private _fonts: boolean = false;
  private _user: boolean = false;
  private _levels: boolean = false;

  public init(): void {
    Webfont.load({
      custom: {
        families: ['Triomphe']
      },
      active: (): void => {
        this._fonts = true;
      }
    });

    Settings.interval = new Interval(this);

    this._checkUser();
    this._initLevels()
    this._setupConfigs()
  }

  public preload(): void {
    this.load.image('loading', loading);
  }

  private _setupConfigs(): void {
    Settings.setPreloadConfig(PreloadConfig.get())
    Settings.setGameConfig(GameConfig.get())
  }


  public update(): void {
    if (!this._fonts) return;
    if (!this._user) return;
    if (!this._levels) return;
    this._fonts = false;
    this._user = false;
    this._levels = false;
    this.scene.launch('Loading');
  }

  private async _checkUser(): Promise<void> {
    this._user = true;
  }

  private async _initLevels(): Promise<void> {
    const exampleData: Ilevel[] = [
      {
        id: '1',
        data:
        {
          level: 1,
          words: ['тест', 'тост', 'сто', 'тесто'],
          letters: ['т', 'е', 'с', 'о', 'т'],
          config: [[0, 'т', 0, 0, 0, 0],
          ['т', 'е', 'с', 'т', 0, 0],
          [0, 'с', 0, 'о', 0, 0],
          [0, 'т', 0, 'с', 'т', 'о'],
          [0, 'о', 0, 'т', 0, 0]]
        }
      },
      {
        id: '2',
        data:
        {
          level: 21,
          words: ['тест', 'тост', 'сто', 'тесто'],
          letters: ['т', 'е', 'с', 'о', 'т'],
        }
      }
    ]
    Settings.setLevels(exampleData)
    if (exampleData) {
      Settings.setCurrentLevel(exampleData[0])
      this._levels = true
    }
  }
}

export default Boot;