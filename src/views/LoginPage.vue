<template>
    <v-app>
        <v-alert v-model="isAlert" type="error" transition="fade-transition" outline dismissible>
            Wrong Username or Password, maybe :)
        </v-alert>
        <v-dialog hide-overlay persistent width="300" v-if="isLoading" v-model="isLoading">
            <v-card color="primary" dark>
                <v-card-text>
                    Please stand by
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-content v-else>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Siapa Kamu ?!</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-img :src="require('@/assets/logo.svg')" alt="Icon Created By Twitter" max-width="30"></v-img>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" label="Username" type="text" v-model="username"></v-text-field>
                                    <v-text-field prepend-icon="lock" label="Password" type="password" v-model="password" autocomplete></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: "LoginPage",
    data() {
        return {
            username: "",
            password: "",
            isLoading: false,
            isAlert: false
        }
    },
    methods: {
        login() {
            const self = this;
            const data = {
                username: this.username,
                password: this.password
            }

            this.isLoading = true;
            this.isAlert = false;

            this.$store.dispatch("submitLogin", data)
                .then(res => {
                    if(res.status === 1) {
                        self.isLoading = false;
                        self.$router.push("/home");
                    } else {
                        self.isLoading = false;
                        self.isAlert = true;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
}
</script>