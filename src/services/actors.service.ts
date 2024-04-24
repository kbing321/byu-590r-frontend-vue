import axios from "axios"
import authHeader from "./auth-header"
import API_URL from "./env"

class ActorsService {
	getActors() {
		return axios
			.get(API_URL + "actors", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}
}

export default new ActorsService()
