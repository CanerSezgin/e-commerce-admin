<template>
  <div>
      <div>
        <v-alert
          v-model="alert"
          dismissible
          type="info"
        >
          Please Login to See Admin Dashboard
        </v-alert>
      </div>

    <v-layout row wrap>
      <v-flex xs6 md3 class="pa-2"
        v-for="product in productList" :key="product._id">
        <ProductCard :product="product" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import ProductCard from '@/components/public/ProductCard'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      ProductCard
    },
    data() {
      return {
        alert: true
      }
    },
    computed: {
      ...mapGetters('products', ['productList'])
    },

  }
</script>
