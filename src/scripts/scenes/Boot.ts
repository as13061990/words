import axios from 'axios';
//@ts-ignore
import * as Webfont from 'webfontloader';
import loading from '../../assets/images/loading.png';
import Interval from '../actions/Interval';
import Sounds from '../actions/Sounds';
import Settings from '../data/Settings';
import User from '../data/User';
import Api from '../data/Api';

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
    Settings.sounds = new Sounds(this);
    Settings.interval = new Interval(this);

    this._checkUser();
    this._initLevels()
  }

  public preload(): void {
    this.load.image('loading', loading);
  }

  public update(): void {
    if (!this._fonts) return;
    if (!this._user) return;
    if (!this._levels) return;
    this._fonts = false;
    this._user = false;
    this._levels = false;
    this.scene.launch('Menu');
  }

  private async _checkUser(): Promise<void> {
    User.setID('0')
    this._user = true;
  }

  private async _initLevels(): Promise<void> {
    const data = await Api.getLevels()
    Settings.setLevels(data)
    if (data) {
      Settings.setCurrentLevel(data[0])
      this._levels = true
    }
  }
}

export default Boot;