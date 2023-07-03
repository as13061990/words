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

}

export default new Session();