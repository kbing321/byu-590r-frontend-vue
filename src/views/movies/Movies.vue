<template>
	<h1>Welcome to the Movie Library!</h1>

	<v-row>
		<v-col cols="3">
			<v-btn
				color="green"
				@click="openCreateDialog()"
				prepend-icon="mdi-plus"
				>Add Movie</v-btn
			>
		</v-col>
	</v-row>

	<v-row>
		<v-col
			v-for="movie in movies"
			:key="movie"
			class="d-flex child-flex"
			cols="12"
			sm="6"
			md="5"
			lg="4"
			xl="3"
			xxl="2"
		>
			<v-card>
				<v-card-item>
					<v-card-title>
						<v-row style="padding: 0px 0px 5px">
							<v-col cols="8">
								{{ movie.title }}
							</v-col>
							<v-col cols="4">
								<v-btn
									class="mx-1"
									round
									@click="openEditMovieDialog(movie)"
									icon="mdi-pencil"
									color="warning"
									size="small"
								></v-btn>
								<v-btn
									class="mx-1"
									round
									@click="openDeleteMovieDialog(movie)"
									icon="mdi-delete"
									color="error"
									size="small"
								></v-btn>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-subtitle>
						{{ movie.description }}
					</v-card-subtitle>
					<v-card-item>
						<v-img
							width="300"
							height="400"
							:src="movie.movie_cover_picture"
						></v-img>
					</v-card-item>
					<a :href="movie.trailer.trailer_url">Trailer</a>
					<h4>
						Director:
						<span style="font-weight: normal">
							{{ movie.director.first_name }}
							{{ movie.director.last_name }}
						</span>
					</h4>
					<div>
						<h4>Starring:</h4>
						<li v-for="actor in movie.actor" :key="actor">
							{{ actor.first_name }} {{ actor.last_name }}
						</li>
					</div>
				</v-card-item>
			</v-card>
		</v-col>
	</v-row>

	<v-dialog v-model="createMovieDialog">
		<v-card style="margin: auto; width: 50%" rounded="0">
			<v-card-title>Add a New Movie</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newMovie.title"
								label="Movie Title*"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newMovie.description"
								label="Movie Description*"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-select
								v-model="newMovie.trailer_id"
								:items="trailers"
								item-title="movie_trailer"
								item-value="id"
								label="Trailer"
							></v-select>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-select
								v-model="newMovie.director_id"
								:items="directors"
								:item-title="
									(director) =>
										`${director.last_name}, ${director.first_name}`
								"
								item-value="id"
								label="Director"
							></v-select>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-select
								v-model="newMovie.actor"
								:items="actors"
								:item-title="
									(actor) =>
										`${actor.last_name}, ${actor.first_name}`
								"
								item-value="id"
								label="Actors"
								multiple
							></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-file-input
								accept="image/*"
								@change="onNewMoviePictureChange($event)"
								label="Movie Image"
							></v-file-input>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates require field</small>

				<v-alert v-if="newMovieErrorMessage" type="error">{{
					newMovieErrorMessage
				}}</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue-darken-1"
					:disabled="newMovieErrorMessage"
					variant="text"
					@click="closeCreateDialog()"
					>Close</v-btn
				>
				<v-btn
					color="blue-darken-1"
					variant="text"
					@click="createMovie()"
					:loading="movieIsCreating"
					:disabled="movieIsCreating"
					>Save</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="editMovieDialog">
		<v-card style="margin: auto; width: 50%" rounded="0">
			<v-card-title>Edit {{ editMovie.title }}</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editMovie.title"
								label="Movie Title*"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editMovie.description"
								label="Movie Description*"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-select
								v-model="editMovie.trailer_id"
								:items="trailers"
								item-title="movie_trailer"
								item-value="id"
								label="Trailer"
							></v-select>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-select
								v-model="editMovie.director_id"
								:items="directors"
								:item-title="
									(director) =>
										`${director.last_name}, ${director.first_name}`
								"
								item-value="id"
								label="Director"
							></v-select>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-select
								v-model="editMovie.actor"
								:items="actors"
								:item-title="
									(actor) =>
										`${actor.last_name}, ${actor.first_name}`
								"
								item-value="id"
								label="Actors"
								multiple
							></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<div v-if="editFileChangeDialogBtn">
								<v-file-input
									accept="image/*"
									@change="
										onExistingMoviePictureChange($event)
									"
									label="Picture File Change"
								></v-file-input>
								<v-btn @click="editFileChangeDialogBtn = false"
									>Cancel Picture Change</v-btn
								>
							</div>
							<v-btn
								v-else
								@click="editFileChangeDialogBtn = true"
								>Change Picture</v-btn
							>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates require field</small>

				<v-alert v-if="newMovieErrorMessage" type="error">{{
					newMovieErrorMessage
				}}</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue-darken-1"
					:disabled="editMovieErrorMessage"
					variant="text"
					@click="editMovieDialog = false"
					>Close</v-btn
				>
				<v-btn
					color="blue-darken-1"
					variant="text"
					@click="updateMovie(), (editMovieDialog = false)"
					:loading="movieIsUpdating"
					:disabled="movieIsUpdating"
					>Save</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="deleteMovieDialog">
		<v-card style="margin: auto; width: 50%" rounded="0">
			<v-card-text>
				Are you sure you want to delete this movie? This can't be
				undone.
			</v-card-text>
			<v-card-actions>
				<v-btn color="red" @click="deleteMovieDialog = null">No</v-btn>
				<v-btn
					color="green"
					@click="deleteMovie()"
					:loading="movieIsDeleting"
					:disabled="movieIsDeleting"
					>Yes</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script src="./Movies.ts" />
<style src="./Movies.scss" />
