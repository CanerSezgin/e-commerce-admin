<template>
    <div>
    <v-card height="360" class="mt-1">

  <v-form class="px-4 pt-4">
    <v-text-field
      v-model="product._id"
      label="ID"
      disabled
    ></v-text-field>

    <v-text-field
      v-model="product.name"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="product.price"
      label="Price"
      prefix="$"
      required
    ></v-text-field>

  </v-form>

  <v-alert
      :value="alert"
      :type="type"
    >
      {{alert}}
    </v-alert>

    </v-card>
    <v-card class="transparent" flat>
      <v-card-actions class="text-xs-right pb-4">
    <v-spacer></v-spacer>
    <v-btn dark
      color="cyan darken-4"
      @click="updateProduct"
    >
      Update
    </v-btn>

    <v-dialog v-model="deleteDialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn color="red darken-4" dark v-on="on">Delete</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">{{product.name}}</v-card-title>
            <v-card-text>Do you want to delete this product ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="cyan darken-4" flat @click="deleteDialog = false">Cancel</v-btn>
              <v-btn color="red darken-4" flat @click="deleteProduct">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

  </v-card-actions>
    </v-card>
</div>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        props: ['product'],
        data() {
          return {
            deleteDialog: false,
            alert: '',
            type: 'success'
          }
        },
        watch: {
          alert(value){
            if(value === 'Successfully Updated'){              
              setTimeout(() => {
                this.alert = ''
              }, 2000); 
            }
          },
          product(value){
            this.alert = ''
          }
        },
        methods: {
            ...mapActions('products', ['fetchProducts', 'putProduct', 'removeProduct']),
            updateProduct() {
                this.putProduct(this.product)
                  .then(response => {
                    this.alert = 'Successfully Updated'
                    this.type = 'success'
                    this.fetchProducts()
                  })
                  .catch(error => {
                    this.alert = error
                    this.type = 'error'
                    console.log(error)
                  })
            },
            deleteProduct(){
                this.removeProduct(this.product)
                  .then(response => {
                    this.fetchProducts().then(() => {
                      this.$emit('ClearSelected');
                      this.deleteDialog = false;
                    }).catch(error => console.log(error))
                  })
                  .catch(error => {
                    console.log(error)
                  })
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>