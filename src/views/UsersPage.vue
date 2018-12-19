<template>
    <div>
        <TheNavbar></TheNavbar>
        <TheUsersTable></TheUsersTable>
    </div>
</template>

</<script>
import TheNavbar from "@/components/TheNavbar.vue"
import TheUsersTable from "@/components/TheUsersTable.vue"

export default {
    name: "UsersPage",
    components: {
        TheNavbar,
        TheUsersTable
    }
}
</script>
