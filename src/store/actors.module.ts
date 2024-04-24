import ActorsService from "../services/actors.service"

const initialState = {
	actorsList: []
}

export const actors = {
	namespaced: true,
	state: initialState,
	actions: {
		getActors({ commit }) {
			return ActorsService.getActors().then((actors) => {
				commit("setActors", actors)
				return Promise.resolve(actors)
			})
		}
	},
	mutations: {
		setActors(state, actors) {
			state.actorsList = actors
		}
		// addMovie(state, movie) {
		// 	state.moviesList.push(movie)
		// },
		// setMovie(state, movie) {
		// 	state.moviesList[movie.index].title = movie.title
		// },
		// removeMovie(state, movie) {
		// 	state.moviesList.splice(movie.index, 1)
		// },
		// updateMoviePicture(state, movie) {
		// 	state.moviesList[movie.index].movie_cover_picture =
		// 		movie.movie_cover_picture
		// }
	}
	// getters: {
	// 	getTrailerStateIndexByTrailerID: (state) => (trailerID) => {
	// 		return state.trailersList.findIndex((trailer) => {
	// 			return trailer.id === trailerID
	// 		})
	// 	}
	// }
}
