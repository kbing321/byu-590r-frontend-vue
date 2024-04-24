<template>
	<div class="login-page-content">
		<div class="login-box">
			<h1 class="logo-area">Sign In Here</h1>
			<div class="input-container">
				<v-form v-model="isFormValid">
					<div class="input-container">
						<v-text-field
							v-model="email"
							label="Email"
							:rules="loginRules.emailRules"
							hide-details="auto"
							variant="solo"
						></v-text-field>

						<v-text-field
							v-model="password"
							label="Password"
							type="password"
							:rules="loginRules.passwordRules"
							hide-details="auto"
							variant="solo"
							@keyup.enter="submitLogin"
						/>

						<v-alert
							v-if="errorMsg !== ''"
							:type="alertType"
							@click="errorMsg = ''"
							>{{ errorMsg }}</v-alert
						>
					</div>
				</v-form>

				<div class="button-container">
					<v-btn
						class="btn-text"
						v-if="!isAuthenticated"
						:loading="isLoading"
						:disabled="!isFormValid"
						@click="submitLogin()"
					>
						Sign In
						<div></div>
						<div></div>
					</v-btn>
					<v-btn class="btn-text" @click="registerDialog = true">
						Register
					</v-btn>
					<v-btn @click="dialog = true"> Forgot Password </v-btn>
					<v-dialog v-model="dialog" :scrim="false" persistant>
						<v-card class="popup-card">
							<v-card-text>
								<v-text-field
									v-model="email"
									label="Password Reset Email"
									:rules="emailRules"
									hide-details="auto"
									variant="solo"
								></v-text-field>
							</v-card-text>
							<v-card-actions>
								<v-btn variant="text" @click="dialog = false">
									Close
								</v-btn>
								<v-btn variant="text"> Submit </v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="registerDialog">
						<v-form v-model="isRegisterFormValid">
							<v-card class="popup-card">
								<v-card-title>
									<span class="text-h5">Register User</span>
								</v-card-title>
								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field
													label="Full Name"
													v-model="register.name"
													:rules="registerRules.name"
													variant="solo"
												></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field
													label="Email"
													v-model="register.email"
													:rules="registerRules.email"
													variant="solo"
												></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field
													label="Password"
													type="password"
													v-model="register.password"
													:rules="
														registerRules.password
													"
													variant="solo"
												></v-text-field>
											</v-col>
											<v-col cols="12">
												<v-text-field
													label="Password Confirmation"
													type="password"
													v-model="
														register.c_password
													"
													:rules="
														registerRules.c_password
													"
													variant="solo"
												></v-text-field>
											</v-col>
										</v-row>
									</v-container>
									<small>*indicates required field</small>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn
										variant="text"
										@click="registerDialog = false"
										>Close</v-btn
									>
									<v-btn
										variant="text"
										:disabled="!isRegisterFormValid"
										:loading="registerFormIsLoading"
										@click="submitRegister()"
										>Save</v-btn
									>
								</v-card-actions>
							</v-card>
						</v-form>
					</v-dialog>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./LoginView.ts" />

<style src="./LoginView.scss" />
