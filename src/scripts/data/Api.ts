import axios from "axios";

class Api {

  public async getLevels(): Promise<any> {
    try {
      const response = await axios.get(process.env.API + '/levels/list')
      return response.data.data.map((el: IlevelResponse) => {
        return {
          id: el.id,
          data: JSON.parse(el.data)
        }
      })
    } catch (error) {
      console.log(error)
      return null
    }
  }



  public getRatings(): Iratings {
    try {
      // const response = await axios.get(process.env.API + '/ratings')
      return {
        rating: {
          dayLevels: [
            { place: 1, name: 'user 1', score: 50, self: false },
            { place: 2, name: 'user 3 (me)', score: 30, self: true },
            { place: 3, name: 'user 2', score: 4, self: false }
          ],
          allLevels: [
            { place: 1, name: 'user 1', score: 300, self: false },
            { place: 2, name: 'user 2', score: 200, self: false },
            { place: 3, name: 'user 3 (me)', score: 100, self: true }
          ],
          dayWords: [
            { place: 1, name: 'user 1', score: 266, self: false },
            { place: 2, name: 'user 3 (me)', score: 141, self: true },
            { place: 3, name: 'user 2', score: 23, self: false }
          ],
          allWords: [
            { place: 1, name: 'user 1', score: 1300, self: false },
            { place: 2, name: 'user 2', score: 700, self: false },
            { place: 3, name: 'user 3 (me)', score: 450, self: true }
          ],
        }
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

}

export default new Api();