import axios from "axios"
import authHeader from "./auth-header"
import API_URL from "./env"

class DirectorsService {
	getDirectors() {
		return axios
			.get(API_URL + "directors", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}
}

export default new DirectorsService()
