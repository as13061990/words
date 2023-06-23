import { currentWordType } from "../types/enums"

class Session {
  private _currentWord: string = ""
  private _currentWordType: currentWordType = currentWordType.DEFAULT
  private _level: number = null
  private _levelWords: string[] = []
  private _levelLetters: string[] = []

  addLetterToCurrentWord(letter: string) {
    this._currentWord += letter
  }

  getCurrentWord(): string {
    return this._currentWord
  }

  minusCurrentWord(): void {
    this._currentWord =  this._currentWord.slice(0, -1)
  }

  resetCurrentWord(): void {
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

  public setCurrentWordType(type: currentWordType): void {
    this._currentWordType = type
  }

  public getCurrentWordType(): currentWordType {
    return this._currentWordType
  }

}

export default new Session();