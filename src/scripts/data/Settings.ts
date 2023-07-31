import Interval from '../actions/Interval';
import { modal, screen } from '../types/enums';

class Settings {

  public readonly sizes = {
    width: 800,
    minHeight: 1367,
    maxHeight: 2500
  }
  private _modal: modal = null;
  private _screen: screen = screen.MAIN;
  private _mobile: boolean = false;
  private _levels: Ilevel[] = []
  private _currentLevel: Ilevel = null

  public readonly DURATION_ANIMATION_WORD_STANDART_SOLVED = 600 // анимация решенного слова 
  public readonly DURATION_ANIMATION_BOOSTER = 1000 // анимация от бустера к слову
  public readonly DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP = 310  // 1 шаг (их 2) анимации решенного слова от бустера
  public readonly DURATION_ANIMATION_SHUFFLE_STEP = 200 // 1 шаг (их 2) анимации перемешиванния слов
  public readonly DURATION_ANIMATION_LETTER_BUTTON = 280 // анимация кнопки с буквой
  public readonly DURATION_ANIMATION_SHUFFLE_BUTTON = 100 // анимация кнопки перемешки
  public readonly DURATION_ANIMATION_WORD_REPEAT_STEP = 310 // 1 шаг(их2) анимации повторения у слова
  public readonly DURATION_ANIMATION_ENDLEVELRECTANGLE = 800 // анимация завршения уровня
  public readonly DURATION_ANIMATION_CURRENTWORD_WRONG_STEP = 60 // 1 шаг(их3) анимации неправильного слова у текущего слова
  public readonly DURATION_ANIMATION_CURRENTWORD_COLOR_CHANGE = 130 //  анимация изменения цвета у текущего слова
  public readonly DURATION_ANIMATION_CURRENTWORD_SOLVED_DESTOY = 100 //  анимация разрушения решенного у текущего слова

  public readonly DELAY_ANIMATION_CURRENTWORD_DESTROY = 500 //  анимация разрушения у текущего слова
  public readonly DELAY_ANIMATION_WORD_STANDART_SOLVED = 650 // задержка анимации решенного слова 
  public readonly DELAY_ANIMATION_ENDLEVELRECTANGLE = 1200 // задержка анимации завершения уровня

  public readonly DURATION_ANIMATION_MODAL_STEP_1 = 400  // 1 шаг(их2) анимации модалки
  public readonly DURATION_ANIMATION_MODAL_STEP_2 = 100  // 2 шаг(их2) анимации модалки


  public readonly WORD_STEP = 110  // ширина и высота одной клетки с отступом
  public readonly REDUCE_SCALE = 0.4  // уменьшение у текущего слова


  // rgb цвета
  public readonly WHITE = [255, 255, 255]
  public readonly GREEN = [110, 190, 104]
  public readonly ORANGE = [222, 153, 85]
  public readonly PINK = [227, 109, 162]
  public readonly DARK_BLUE = [45, 52, 75]
  public readonly RED = [240, 85, 87]

  // rgb16 цвета для бустеров
  public readonly PINK_16 = 0xe36da2
  public readonly BOOSTER_ACTIVE = 0x688ec4
  public readonly BOOSTER_INACTIVE = 0x898989

  // кд бустеров
  public readonly BOOSTER_RANDOM_LETTER_TIME = 5
  public readonly BOOSTER_RANDOM_WORD_TIME = 5
  public readonly BOOSTER_SPECIFIC_LETTER_TIME = 5


  public sounds: Isounds;
  public interval: Interval;
  private _preloadConfig: IpreloadConfig;

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