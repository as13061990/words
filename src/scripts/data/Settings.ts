import Interval from '../actions/Interval';
import { modal, screen } from '../types/enums';
import { IgameConfig } from './GameConfig';

class Settings {

  public readonly sizes = {
    width: 800,
    minHeight: 1367,
    maxHeight: 2500
  }
  
  public sounds: Isounds;
  public interval: Interval;

  private _modal: modal = null;
  private _screen: screen = screen.MAIN;
  private _mobile: boolean = false;
  private _levels: Ilevel[] = []
  private _currentLevel: Ilevel = null

  private _preloadConfig: IpreloadConfig;
  private _gameConfig: IgameConfig;

  public setGameConfig(config: IgameConfig): void {
    this._gameConfig = config;
  }

  public getGameConfig(): IgameConfig {
    return this._gameConfig;
  }

  public setPreloadConfig(config: IpreloadConfig): void {
    this._preloadConfig = config;
  }

  public getPreloadConfig(): IpreloadConfig {
    return this._preloadConfig;
  }

  public setScreen(screen: screen): screen {
    this._screen = screen;
    return this._screen;
  }

  public getScreen(): screen {
    return this._screen;
  }

  public setModal(modal: modal): modal {
    this._modal = modal;
    return this._modal;
  }

  public getModal(): modal {
    return this._modal;
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