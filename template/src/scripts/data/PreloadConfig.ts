import buttonGreen from '../../assets/images/button-green.png';
import wordLetter from '../../assets/images/word-letter.png';
import letterEmpty from '../../assets/images/letter-empty.png';
import restartButtons from '../../assets/images/restart-buttons.png';

import BoosterSpecificLetter from '../../assets/images/booster-specific-letter.png';
import BoosterSpecificLetterInactive from '../../assets/images/booster-specific-letter-inactive.png';
import BoosterRandomWord from '../../assets/images/booster-random-word.png';
import BoosterRandomWordInactive from '../../assets/images/booster-random-word-inactive.png';
import BoosterRandomLetter from '../../assets/images/booster-random-letter.png';
import BoosterRandomLetterInactive from '../../assets/images/booster-random-letter-inactive.png';

import boosterCircle from '../../assets/images/booster-circle.png';
import star from '../../assets/images/star.png';
import modal from '../../assets/images/modal.png';
import blackPixel from '../../assets/images/black-pixel.png';
import close from '../../assets/images/close.png';
import avatar from '../../assets/images/avatar.jpg';


class PreloadConfig {
  private _data: IpreloadConfig = {
    "scene": "Game",
    "images": {
      buttonGreen: buttonGreen,
      wordLetter: wordLetter,
      letterEmpty: letterEmpty,
      restartButtons: restartButtons,
      boosterSpecificLetter: BoosterSpecificLetter,
      boosterSpecificLetterInactive: BoosterSpecificLetterInactive,
      boosterRandomWord: BoosterRandomWord,
      boosterRandomWordInactive: BoosterRandomWordInactive,
      boosterRandomLetter: BoosterRandomLetter,
      boosterRandomLetterInactive: BoosterRandomLetterInactive,
      boosterCircle: boosterCircle,
      star: star,
      modal: modal,
      blackPixel: blackPixel,
      close: close,
      avatar: avatar,
    },
    "sounds": {
    }
  }

  public get(): IpreloadConfig {
    return this._data;
  }

  public set(config: IpreloadConfig): void {
    this._data = config;
  }
}
export default new PreloadConfig;