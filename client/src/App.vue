<template>
  <v-app>
    <TopMenu />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TopMenu from '@/components/static/TopMenu'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    TopMenu
  },
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapGetters('users', ['loggedIn'])
  },
  watch: {
    loggedIn(value){
      if(value){
        this.$router.push({name: 'dashboard'})
      } else {
        this.$router.push({name: 'auth'})
      }
    }
  },
  created(){
    this.fetchProducts()
  },
  methods: {
    ...mapActions('products', ['fetchProducts'])
  },
}
</script>
