<template>
    <v-app>
        <v-toolbar dark color="primary">
            <v-img :src="require('@/assets/logo.svg')" max-width="30"></v-img>
            <v-toolbar-title>othem</v-toolbar-title>
            <v-toolbar-items class="hidden-sm-and-down ml-2">
                <v-btn to="/home" exact flat>Home</v-btn>
                <v-btn to="/users" exact flat>Users Management</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-btn depressed color="error">Logout</v-btn>
        </v-toolbar>
    </v-app>
</template>