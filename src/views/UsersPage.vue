<template>
    <v-app>
        <TheNavbar></TheNavbar>
        <v-container fluid>
            <v-toolbar flat color="white" class="elevation-1">
                <v-toolbar-title>User Management</v-toolbar-title>
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md3>
                    <v-text-field v-if="toggleSearch" v-model="search" label="Search" hide-details clearable color="primary" class="mb-2"></v-text-field>
                </v-flex>
                <v-btn color="primary" icon @click="toggleSearch = !toggleSearch">
                    <v-icon>search</v-icon>
                </v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-btn color="primary" slot="activator" icon>
                        <v-icon>add</v-icon>
                    </v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-data-table :headers="headers" :items="users" :search="search" :loading="isLoading" class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.username }}</td>
                    <td>{{ props.item.password }}</td>
                    <td class="justify-center align-center layout px-0">
                        <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                        <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                    </td>
                </template>
                <v-alert slot="no-data" outline :value="true" color="error" icon="warning">
                    Sorry, nothing to display here :)
                </v-alert>
                <v-alert slot="no-results" outline :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-container>
    </v-app>
</template>

</<script>
import TheNavbar from "@/components/TheNavbar.vue"

export default {
    name: "UsersPage",
    components: {
        TheNavbar
    },
    created() {
        this.init();
    },
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Username', value: 'username' },
                { text: 'Password', value: 'password' },
                { text: "Action" , value: "action", align: "center", sortable: false }
            ],
            users: [],
            dialog: false,
            editedIndex: -1,
            editedItem: {
                name: "",
                username: "",
                password: ""
            },
            defaultItem: {
                name: "",
                username: "",
                password: ""
            },
            search: "",
            toggleSearch: false,
            isLoading: false
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New User" : "Edit User";
        }
    },
    methods: {
        init() {
            this.users = [
                {
                    value: false,
                    name: 'Nakya Santini',
                    username: "Rothem",
                    password: "hellothere",
                },
                {
                    value: false,
                    name: 'Jelly Heramawan',
                    username: "Jell",
                    password: "whooopss",
                },
                {
                    value: false,
                    name: 'Kirun',
                    username: "Kiruners",
                    password: "therehello",
                }
            ]
        },
        close() {
            this.dialog = false;
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
        },
        save() {
            if(this.editedIndex > -1) Object.assign(this.users[this.editedIndex], this.editedItem);
                else this.users.push(this.editedItem);

            this.close();
        },
        editItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            const index = this.users.indexOf(item);
            confirm('Are you sure you want to delete ' + item.name + ' data?') && this.users.splice(index, 1);
        }
    }
}
</script>
