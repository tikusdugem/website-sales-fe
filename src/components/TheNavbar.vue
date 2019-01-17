<template>
    <v-toolbar dark color="primary">
        <v-img :src="require('@/assets/logo.svg')" max-width="30"></v-img>
        <v-toolbar-title>othem</v-toolbar-title>
        <v-toolbar-items class="hidden-sm-and-down ml-2">
            <v-btn to="/home" exact flat>Home</v-btn>
            <v-btn to="/users" exact flat>Users Management</v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-md-and-up ml-2">
            <v-btn to="/home" exact icon>
                <v-icon>home</v-icon>
            </v-btn>
            <v-btn to="/users" exact icon>
                <v-icon>people</v-icon>
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn depressed color="error" @click="logout">Logout</v-btn>
        <v-snackbar :value="toggleSnackbar" color="success" :timeout="timeout">
            {{ textSnackbar }}
            <v-btn flat @click="toggleSnackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-toolbar>
</template>

<script>
export default {
    name: "TheNavbar",
    data() {
        return {
            toggleSnackbar: false,
            textSnackbar: "Successfully to logout, thanks!",
            timeout: 3000
        }
    },
    methods: {
        logout() {
            const self = this;
            this.toggleSnackbar = true;

            setTimeout(() => {
                self.$router.push("/logout");
            }, 4000);
        }
    }
}
</script>
