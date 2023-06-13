import Interval from '../actions/Interval';
import { screen } from '../types/enums';

class Settings {

  public readonly sizes = {
    width: 1080,
    minHeight: 1367,
    maxHeight: 2500
  }
  private _screen: screen = screen.MAIN;
  private _mobile: boolean = false;
  public sounds: Isounds;
  public interval: Interval;

  public setScreen(screen: screen): screen {
    this._screen = screen;
    return this._screen;
  }

  public getScreen(): screen {
    return this._screen;
  }

  public isMobile(): boolean {
    return this._mobile;
  }

  public setMobile(mobile: boolean): void {
    this._mobile = mobile;
  }
}

export default new Settings();