import DirectorsService from "../services/directors.service"

const initialState = {
	directorsList: []
}

export const directors = {
	namespaced: true,
	state: initialState,
	actions: {
		getDirectors({ commit }) {
			return DirectorsService.getDirectors().then((directors) => {
				commit("setDirectors", directors)
				return Promise.resolve(directors)
			})
		}
	},
	mutations: {
		setDirectors(state, directors) {
			state.directorsList = directors
		}
	}
}
