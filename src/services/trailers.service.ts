import axios from "axios"
import authHeader from "./auth-header"
import API_URL from "./env"

class TrailersService {
	getTrailers() {
		return axios
			.get(API_URL + "trailers", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}
}

export default new TrailersService()
