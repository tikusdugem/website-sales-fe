<template>
    <div class="container-fluid my-2">
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                </tr>
            </thead>
            <tbody v-for="(user, index) in users" :key="user.id">
                <tr>
                    <th scope="row">{{index}}</th>
                    <td>{{user.name}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.password}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        this.$store.dispatch("listingUsers")
            .then(res => {
                this.users = res.data;
            })
            .catch(err => {
                console.error(err);
            });
    }
}
</script>
