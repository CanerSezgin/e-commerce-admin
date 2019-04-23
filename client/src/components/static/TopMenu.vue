<template>
 <v-toolbar dark height="90">

    <v-toolbar-title>E-commerce Admin Dashboard (Full Stack Demo Project)
    <div class="subheading">Made with <span class="red--text">❤</span> by Caner SEZGIN
      
    </div>
    <div class="subheading">Stack: Node.JS & MongoDB & Vue.JS</div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat exact :to="{name: 'home'}">Store</v-btn>
      <v-btn flat exact :to="{name: 'dashboard'}">Admin</v-btn>
      <v-btn flat exact :to="{name: 'about'}">About</v-btn>
      <v-btn flat exact :to="{name: 'auth'}" v-if="!loggedIn">Login</v-btn>
      <v-btn flat @click="logout" v-else>Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        computed: {
            ...mapGetters('users', ['loggedIn'])
        },
        methods: {
          ...mapActions('users', ['logout'])
        },
    }
</script>

<style lang="scss" scoped>

</style>