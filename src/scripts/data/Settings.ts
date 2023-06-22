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
  private _levels: Ilevel[] = []
  private _currentLevel: Ilevel = null

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

  public setLevels(levels: Ilevel[]): void {
    this._levels = levels
  }

  public getLevels(): Ilevel[] {
    return this._levels
  }

  public setCurrentLevel(level: Ilevel): void {
    this._currentLevel = level
  }

  public getCurrentLevel(): Ilevel {
    return this._currentLevel
  }
}

export default new Settings();