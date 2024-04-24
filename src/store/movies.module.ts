import MoviesService from "../services/movies.service"

const initialState = {
	moviesList: []
}

export const movies = {
	namespaced: true,
	state: initialState,
	actions: {
		getMovies({ commit }) {
			return MoviesService.getMovies().then((movies) => {
				commit("setMovies", movies)
				return Promise.resolve(movies)
			})
		},

		createMovie({ commit }, movie) {
			return MoviesService.createMovie(movie).then((response) => {
				commit("addMovie", response.movie)
				return Promise.resolve(response.movie)
			})
		},

		updateMovie({ commit, getters }, movie) {
			return MoviesService.updateMovie(movie).then((response) => {
				response.movie.index = getters.getMovieStateIndexByMovieID(
					response.movie.id
				)
				commit("setMovie", response.movie)
				return Promise.resolve(response.movie)
			})
		},

		deleteMovie({ commit, getters }, movie) {
			return MoviesService.deleteMovie(movie).then((response) => {
				response.movie.index = getters.getMovieStateIndexByMovieID(
					response.movie.id
				)
				commit("removeMovie", response.movie)
				return Promise.resolve(response.movie)
			})
		},

		updateMoviePicture({ commit, getters }, movie) {
			return MoviesService.updateMoviePicture(movie).then((response) => {
				response.movie.index = getters.getMovieStateIndexByMovieID(
					response.movie.id
				)
				commit("updateMoviePicture", response.movie)
				return Promise.resolve(response.movie)
			})
		}
	},
	mutations: {
		setMovies(state, movies) {
			state.moviesList = movies
		},
		addMovie(state, movie) {
			state.moviesList.push(movie)
		},
		setMovie(state, movie) {
			state.moviesList[movie.index].title = movie.title
		},
		removeMovie(state, movie) {
			state.moviesList.splice(movie.index, 1)
		},
		updateMoviePicture(state, movie) {
			state.moviesList[movie.index].movie_cover_picture =
				movie.movie_cover_picture
		}
	},
	getters: {
		getMovieStateIndexByMovieID: (state) => (movieID) => {
			return state.moviesList.findIndex((movie) => {
				return movie.id === movieID
			})
		}
	}
}
