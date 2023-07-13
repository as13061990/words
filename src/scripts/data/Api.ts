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

}

export default new Api();