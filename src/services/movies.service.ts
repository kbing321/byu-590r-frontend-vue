import axios from "axios"
import authHeader from "./auth-header"
import API_URL from "./env"

class MoviesService {
	getMovies() {
		return axios
			.get(API_URL + "movies", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}
	createMovie(movie) {
		let formData = new FormData()
		formData.append("movie_cover_picture", movie.movie_cover_picture)
		formData.append("title", movie.title)
		formData.append("description", movie.description)
		formData.append("trailer_id", movie.trailer_id)
		formData.append("director_id", movie.director_id)
		formData.append("actor[]", movie.actor)
		return axios
			.post(API_URL + "movies", formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}
	updateMovie(movie) {
		return axios
			.put(API_URL + "movies/" + movie.id, movie, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}
	deleteMovie(movie) {
		return axios
			.delete(API_URL + "movies/" + movie.id, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}
	updateMoviePicture(movie) {
		let formData = new FormData()
		formData.append("movie_cover_picture", movie.movie_cover_picture)
		return axios
			.post(
				API_URL + "movies/" + movie.id + "/update_movie_picture",
				formData,
				{ headers: authHeader() }
			)
			.then((response) => {
				return response.data.data
			})
	}
}

export default new MoviesService()
