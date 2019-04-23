<template>

    <v-card> 
        <v-img
        v-if="product.productImage"
          :src="`https://node-shop-ws.herokuapp.com/${product.productImage}`"
          aspect-ratio="2.25"
        ></v-img>
        <v-img v-else 
        src="https://node-shop-ws.herokuapp.com/uploads/2019-04-23T11:26:08.273Zimage-not-found.jpg"
        aspect-ratio="2.25"
        ></v-img>
        
        <v-card-title primary-title class="red darken-3 white--text">
          <div>
            <h3 class="headline">{{product.name}}</h3>
          </div>
        </v-card-title>
            <div class="headline text-xs-right pr-4 my-2"> $ {{product.price}} </div>
        <v-card-actions>
          <v-btn flat color="red darken-4">More</v-btn>
          <v-btn flat color="red darken-4">Add Carts</v-btn>
        </v-card-actions>
      </v-card>

</template>

<script>
    export default {
        props: ['product']
    }
</script>

<style lang="scss" scoped>

</style>