import TrailersService from "../services/trailers.service"

const initialState = {
	trailersList: [],
	movie_trailer: ""
}

export const trailers = {
	namespaced: true,
	state: initialState,
	actions: {
		getTrailers({ commit }) {
			return TrailersService.getTrailers().then((trailers) => {
				commit("setTrailers", trailers)
				return Promise.resolve(trailers)
			})
		}
	},
	mutations: {
		setTrailers(state, trailers) {
			state.trailersList = trailers
		}
	}
}
