<template>
    <v-app>
        <TheNavbar></TheNavbar>
        <v-container fluid>
            <v-toolbar flat color="white" class="elevation-1">
                <v-toolbar-title>User Management</v-toolbar-title>
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
            <v-data-table :headers="headers" :items="users" :pagination.sync="pagination" :total-items="totalUsers" :loading="isLoading" class="elevation-1">
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
        <v-snackbar :value="toggleSnackbar" :color="colorSnackbar" :timeout="timeout" top>
            {{ textSnackbar }}
            <v-btn flat @click="toggleSnackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

</<script>
import TheNavbar from "@/components/TheNavbar.vue"

export default {
    name: "UsersPage",
    components: {
        TheNavbar
    },
    mounted () {
        this.getDataFromApi()
            .then(data => {
                this.users = data.items
                this.totalUsers = data.total
            })
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
            isLoading: false,
            totalUsers: 0,
            pagination: {},

            toggleSnackbar: false,
            colorSnackbar: "",
            timeout: 3000,
            textSnackbar: ""
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New User" : "Edit User";
        }
    },
    watch: {
        pagination: {
            handler () {
                this.getDataFromApi()
                    .then(data => {
                        this.users = data.items
                        this.totalUsers = data.total
                    })
            },
            deep: true
        },
        search: {
            handler() {
                this.search === null ? this.search = "" : null;
                this.getDataFromApi()
                    .then(data => {
                        this.users = data.items
                        this.totalUsers = data.total
                    })
            },
            deep: true
        }
    },
    methods: {
        getDataFromApi () {
            this.isLoading = true
            return new Promise(async (resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = this.pagination

                let items = await this.$store.dispatch("listingUsers");
                items = items.filter(i => i.name.toLowerCase().startsWith(this.search))
                let total = items.length

                if (this.pagination.sortBy) {
                    items = items.sort((a, b) => {
                        const sortA = a[sortBy]
                        const sortB = b[sortBy]

                        if (descending) {
                            if (sortA < sortB) return 1
                            if (sortA > sortB) return -1
                            return 0
                        } else {
                            if (sortA < sortB) return -1
                            if (sortA > sortB) return 1
                            return 0
                        }
                    })
                }

                if (rowsPerPage > 0) {
                    items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                }

                if(this.search && total === 0) {
                    total = -1;
                }

                setTimeout(() => {
                    this.isLoading = false
                    resolve({
                        items,
                        total
                    })
                }, 1000)
            })
        },
        close() {
            this.dialog = false;
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
        },
        async save() {
            if(this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedItem);
            } else {
                await this.$store.dispatch("addUser", this.editedItem)
                    .then(res => {
                        if(res === "Saved!") {
                            this.toggleSnackbar = false;
                            setTimeout(() => {
                                this.textSnackbar = "Successfuly add user!";
                                this.colorSnackbar = "success";
                                this.toggleSnackbar = true;
                                this.getDataFromApi().then(res => {
                                    this.users = res.items;
                                    this.totalUsers = res.total;
                                });
                            }, 100);
                        } else {
                            this.toggleSnackbar = false;
                            setTimeout(() => {
                                this.textSnackbar = "Failed add user!";
                                this.colorSnackbar = "error";
                                this.toggleSnackbar = true;
                            }, 100);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }

            this.close();
        },
        editItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            const answer = confirm('Are you sure you want to delete ' + item.name + ' data?');

            if(answer) {
                this.$store.dispatch("deleteUser", item.id)
                    .then(res => {
                        if(res === "Deleted!") {
                            this.toggleSnackbar = false;
                            setTimeout(() => {
                                this.textSnackbar = "Successfully delete user!";
                                this.colorSnackbar = "success";
                                this.toggleSnackbar = true;
                                this.getDataFromApi().then(res => {
                                    this.users = res.items
                                    this.totalUsers = res.total
                                });
                            }, 100);
                        } else {
                            this.toggleSnackbar = false;
                            setTimeout(() => {
                                this.textSnackbar = "Failed delete user!";
                                this.colorSnackbar = "error"
                                this.toggleSnackbar = true;
                            }, 100);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    }
}
</script>
