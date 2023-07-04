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

  readonly DELAY_ANIMATION_WORD_STANDART_RESOLVE = 650 // анимация решенного слова 
  readonly DURATION_ANIMATION_WORD_STANDART_RESOLVE = 600 // анимация решенного слова 
  readonly DURATION_ANIMATION_BOOSTER_RANDOM_WORD = 1000 // анимация от бустера к слову
  readonly DURATION_ANIMATION_WORD_BOOSTER_RESOLVE_STEP = 310  // 1 шаг (их 2) анимации решенного слова от бустера
  readonly DURATION_ANIMATION_SHUFFLE_STEP = 200 // 1 шаг (их 2) анимации перемешиванния слов
  readonly WORD_STEP = 110  // ширина и высота одной клетки с отступом


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