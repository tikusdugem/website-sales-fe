<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border">
            <a class="navbar-brand" href="/home">
                <img src="@/assets/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="Icon Created By Twitter">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/home">Home</a>
                    <a class="nav-item nav-link" href="/users">User Management</a>
                </div>
            </div>
            <form class="form-inline">
                <span class="navbar-text mr-sm-2">User</span>
                <button class="btn btn-outline-danger my-2 my-sm-0" type="button">Logout</button>
            </form>
        </nav>
    </div>
</template>