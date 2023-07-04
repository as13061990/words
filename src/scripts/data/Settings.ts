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

  readonly DURATION_ANIMATION_WORD_STANDART_SOLVED = 600 // анимация решенного слова 
  readonly DURATION_ANIMATION_BOOSTER = 1000 // анимация от бустера к слову
  readonly DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP = 310  // 1 шаг (их 2) анимации решенного слова от бустера
  readonly DURATION_ANIMATION_SHUFFLE_STEP = 200 // 1 шаг (их 2) анимации перемешиванния слов
  readonly DURATION_ANIMATION_LETTER_BUTTON = 280 // анимация кнопки с буквой
  readonly DURATION_ANIMATION_SHUFFLE_BUTTON = 100 // анимация кнопки перемешки
  readonly DURATION_ANIMATION_WORD_REPEAT_STEP = 310 // 1 шаг(их2) анимации повторения у слова
  readonly DURATION_ANIMATION_ENDLEVELRECTANGLE = 800 // анимация завршения уровня
  readonly DURATION_ANIMATION_CURRENTWORD_WRONG_STEP = 60 // 1 шаг(их3) анимации неправильного слова у текущего слова
  readonly DURATION_ANIMATION_CURRENTWORD_COLOR_CHANGE = 130 //  анимация изменения цвета у текущего слова
  readonly DURATION_ANIMATION_CURRENTWORD_SOLVED_DESTOY = 100 //  анимация разрушения решенного у текущего слова
  
  readonly DELAY_ANIMATION_CURRENTWORD_DESTROY = 500 //  анимация разрушения у текущего слова
  readonly DELAY_ANIMATION_WORD_STANDART_SOLVED = 650 // задержка анимации решенного слова 
  readonly DELAY_ANIMATION_ENDLEVELRECTANGLE = 1200 // задержка анимации завершения уровня

  readonly WORD_STEP = 110  // ширина и высота одной клетки с отступом
  readonly REDUCE_SCALE = 0.4  // уменьшение у текущего слова

  readonly WHITE = [255, 255, 255]
  readonly GREEN = [110, 190, 104]
  readonly ORANGE = [222, 153, 85]
  readonly PINK = [227, 109, 162]
  readonly DARK_BLUE = [45,52,75]
  readonly RED = [240, 85, 87]



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