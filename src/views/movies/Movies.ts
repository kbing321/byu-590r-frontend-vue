import { mapState } from "vuex"
import { useDisplay } from "vuetify"

export default {
	name: "MoviesView",
	computed: {
		...mapState({
			movies() {
				return this.$store.state.movies.moviesList
			},
			trailers() {
				return this.$store.state.trailers.trailersList
			},
			actors() {
				return this.$store.state.actors.actorsList
			},
			directors() {
				return this.$store.state.directors.directorsList
			},
			director() {
				return this.$store.state.movies.director_id
			}
		})
	},
	setup() {
		const { xs, mdAndUp } = useDisplay()

		return { xs, mdAndUp }
	},
	data: function () {
		return {
			editMovie: {},
			selectedDeleteMovie: null,
			newMovie: {
				title: "",
				description: "",
				movie_cover_picture: "",
				trailer_id: 0,
				director_id: 0,
				actor: []
			},

			editMovieErrorMessage: null,
			newMovieErrorMessage: null,

			createMovieDialog: false,
			deleteMovieDialog: false,
			editMovieDialog: false,

			editFileChangeDialogBtn: false,

			movieIsUpdating: false,
			movieIsDeleting: false,
			movieIsCreating: false,
			isLoadingMovies: true
		}
	},
	created() {
		this.getMovies(),
			this.getTrailers(),
			this.getActors(),
			this.getDirectors()
	},
	methods: {
		getMovies() {
			this.$store.dispatch("movies/getMovies").then(() => {
				this.isLoadingMovies = false
			})
		},

		getTrailers() {
			this.$store.dispatch("trailers/getTrailers").then(() => {})
		},

		getActors() {
			this.$store.dispatch("actors/getActors").then(() => {})
		},

		getDirectors() {
			this.$store.dispatch("directors/getDirectors").then(() => {})
		},

		openDeleteMovieDialog(movie) {
			this.selectedDeleteMovie = movie
			this.deleteMovieDialog = true
		},

		openEditMovieDialog(movie) {
			this.editMovie = movie
			this.editMovieDialog = true
		},

		openCreateDialog() {
			this.newMovie = {
				title: "",
				description: "",
				movie_cover_picture: "",
				trailer_id: "",
				director_id: "",
				actor: []
			}
			this.createMovieDialog = true
		},

		closeCreateDialog() {
			this.newMovie = {
				title: "",
				description: "",
				movie_cover_picture: "",
				trailer_id: 0,
				director_id: 0,
				actor: []
			}
			this.createMovieDialog = false
		},

		createMovie() {
			this.movieIsCreating = true
			this.newMovieErrorMessage = null
			this.$store
				.dispatch("movies/createMovie", this.newMovie)
				.then(() => {
					this.closeCreateDialog()
					this.movieIsCreating = false
				})
				.catch((error) => {
					this.newMovieErrorMessage = error.response.data.data
					this.movieIsCreating = false
				})
		},

		updateMovie() {
			this.movieIsUpdating = true
			this.editMovieErrorMessage = null
			this.$store
				.dispatch("movies/updateMovie", this.editMovie)
				.then(() => {
					this.editMovieDialog = false
					this.editPictureChangeDialogBtn = false
					this.editMovie = {}
					this.movieIsUpdating = false
				})
				.catch((error) => {
					this.editMovieErrorMessage = error.response.data.data
					this.movieIsUpdating = false
				})
		},

		deleteMovie() {
			this.movieIsDeleting = true
			this.deleteMovieErrorMessage = null
			this.$store
				.dispatch("movies/deleteMovie", this.selectedDeleteMovie)
				.then(() => {
					this.selectedDeleteMovie = false
					this.movieIsDeleting = false
					this.deleteMovieDialog = false
				})
				.catch((error) => {
					this.deleteMovieErrorMessage = error.response.data.data
					this.movieIsDeleting = false
				})
		},

		onExistingMoviePictureChange(e) {
			var image = e.target.files || e.dataTransfer.files
			if (!image.length) return

			this.editMovie.movie_cover_picture = image[0]
			this.movieIsUpdating = true
			this.$store
				.dispatch("movies/updateMoviePicture", this.editMovie)
				.then(() => {
					this.movieIsUpdating = false
				})
				.catch((error) => {
					this.editMovieErrorMessage = error.response.data.data
					this.movieIsUpdating = false
				})
		},

		onNewMoviePictureChange(e) {
			this.newMovie.movie_cover_picture = null
			var image = e.target.files || e.dataTransfer.files

			if (!image.length) return

			this.newMovie.movie_cover_picture = image[0]
		}
	}
}
