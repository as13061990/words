import { currentWordType } from "../types/enums"
import Settings from "./Settings"

class Session {
  private _currentWord: string = ""
  private _currentWordType: currentWordType = currentWordType.DEFAULT
  private _levelComplete: boolean = false
  private _level: number = null
  private _levelWords: string[] = []
  private _levelCompletedWords: string[] = []
  private _levelLetters: string[] = []
  private _levelConfig: ((string | number)[])[] = []
  private _lastWordFromBooster: boolean = false

  private _isActiveBoosterRandomWord: boolean = false
  private _isActiveBoosterRandomLetter: boolean = false
  private _isActiveBoosterSpecificLetter: boolean = false

  private _boosterRandomWordTimer: number = 0
  private _boosterRandomLetterTimer: number = 0
  private _boosterSpecificLetterTimer: number = 0

  public startLevel(): void {
    this._levelWords = Settings.getCurrentLevel().data.words
    this._levelLetters = Settings.getCurrentLevel().data.letters
    if (Settings.getCurrentLevel().data?.config?.length > 0) {
      this._levelConfig = Settings.getCurrentLevel().data.config
    }
  }

  public clear(): void {
    this._levelConfig = []
    this._levelLetters = []
    this._levelWords = []
    this._levelComplete = false
    this._levelCompletedWords = []
    this._lastWordFromBooster = false
    this._isActiveBoosterRandomWord = false
    this._isActiveBoosterRandomLetter = false
    this._isActiveBoosterSpecificLetter = false
    this._boosterRandomWordTimer = 0
    this._boosterRandomLetterTimer = 0
    this._boosterSpecificLetterTimer = 0
  }

  public addLetterToCurrentWord(letter: string) {
    this._currentWord += letter
  }

  public getCurrentWord(): string {
    return this._currentWord
  }

  public minusCurrentWord(): void {
    this._currentWord = this._currentWord.slice(0, -1)
  }

  public resetCurrentWord(): void {
    this._currentWord = ""
  }

  public setLevel(level: number): void {
    this._level = level
  }

  public getLevel(): number {
    return this._level
  }

  public setLevelWords(levelWords: string[]): void {
    this._levelWords = levelWords
  }

  public getLevelWords(): string[] {
    return this._levelWords
  }

  public setLevelLetters(levelLetters: string[]): void {
    this._levelLetters = levelLetters
  }

  public getLevelLetters(): string[] {
    return this._levelLetters
  }

  public setLevelConfig(levelConfig: ((string | number)[])[]): void {
    this._levelConfig = levelConfig
  }

  public getLevelConfig(): ((string | number)[])[] {
    return this._levelConfig
  }

  public setCurrentWordType(type: currentWordType): void {
    this._currentWordType = type
  }

  public getCurrentWordType(): currentWordType {
    return this._currentWordType
  }

  public getLevelComplete(): boolean {
    return this._levelComplete
  }

  public addToCompletedWords(word: string) {
    if (this._levelCompletedWords.includes(word)) return
    this._levelCompletedWords.push(word)
    if (this._levelCompletedWords.length === this._levelWords.length) {
      this._levelComplete = true
    }
  }

  public getToCompletedWords(): string[] {
    return this._levelCompletedWords
  }

  public getLastWordFromBooster(): boolean {
    return this._lastWordFromBooster
  }

  public setLastWordFromBooster(booster: boolean): void {
    this._lastWordFromBooster = booster
  }

  public getIsActiveBoosterRandomWord(): boolean {
    return this._isActiveBoosterRandomWord
  }
  public getIsActiveBoosterRandomLetter(): boolean {
    return this._isActiveBoosterRandomLetter
  }
  public getIsActiveBoosterSpecificLetter(): boolean {
    return this._isActiveBoosterSpecificLetter
  }

  public setIsActiveBoosterRandomWord(active: boolean): void {
    if (active) this._boosterRandomWordTimer = Settings.BOOSTER_RANDOM_WORD_TIME
    this._isActiveBoosterRandomWord = active
  }
  public setIsActiveBoosterRandomLetter(active: boolean): void {
    if (active) this._boosterRandomLetterTimer = Settings.BOOSTER_RANDOM_LETTER_TIME
    this._isActiveBoosterRandomLetter = active
  }
  public setIsActiveBoosterSpecificLetter(active: boolean): void {
    if (active) this._boosterSpecificLetterTimer = Settings.BOOSTER_SPECIFIC_LETTER_TIME
    this._isActiveBoosterSpecificLetter = active
  }

  public minusBoosterRandomWordTimer(): void {
    if (this._boosterRandomWordTimer === 0) {
      this._isActiveBoosterRandomWord = false;
      return
    }
    this._boosterRandomWordTimer--
  }
  public minusBoosterRandomLetterTimer(): void {
    if (this._boosterRandomLetterTimer === 0) {
      this._isActiveBoosterRandomLetter = false;
      return
    }
    this._boosterRandomLetterTimer--
  }
  public minusBoosterSpecificLetterTimer(): void {
    if (this._boosterSpecificLetterTimer === 0) {
      this._isActiveBoosterSpecificLetter = false;
      return
    }
    this._boosterSpecificLetterTimer--
  }

  public getBoosterRandomWordTimer(): number {
    return this._boosterRandomWordTimer
  }
  public getBoosterRandomLetterTimer(): number {
    return this._boosterRandomLetterTimer
  }
  public getBoosterSpecificLetterTimer(): number {
    return this._boosterSpecificLetterTimer
  }
}

export default new Session();