<template>
    <div class="content text-center">
        <div class="form-signin">
            <img class="mb-4" src="@/assets/logo.svg" alt="Icon Created By Twitter" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal"> Siapa Kamu ? </h1>
            <label for="inputUsername" class="sr-only"> Username </label>
            <input type="text" class="form-control" placeholder="Username" v-model="username" required autofocus>
            <label for="inputPassword" class="sr-only"> Password </label>
            <input type="password" class="form-control" placeholder="Password" v-model="password" required>
            <button class="btn btn-lg btn-primary btn-block" @click="login"> Sign in </button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel"> Attention! </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p> <!-- Dynamic --></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            const data = {
                "username": this.username,
                "password": this.password
            }

            this.$store.dispatch("submitLogin", data)
                .then((res) => {
                    if(res.status === 1) {
                        $("#loginModal").on("shown.bs.modal", function (e) {
                            const modal = $(this);
                            modal.find(".modal-body p").text("Congrats! You successful login!");
                        });
                        $("#loginModal").modal("show");
                    } else {
                        $("#loginModal").on("shown.bs.modal", function (e) {
                            const modal = $(this);
                            modal.find(".modal-body p").text("Sorry! You failed login");
                        });
                        $("#loginModal").modal("show");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
}
</script>

<style scoped>
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}

.form-signin .form-control:focus {
    z-index: 2;
}

.form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>
