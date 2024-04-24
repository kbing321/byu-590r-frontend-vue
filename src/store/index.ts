import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { movies } from "./movies.module"
import { trailers } from "./trailers.module"
import { actors } from "./actors.module"
import { directors } from "./directors.module"

const store = createStore({
	modules: {
		auth,
		user,
		movies,
		trailers,
		actors,
		directors
	}
})

export default store
