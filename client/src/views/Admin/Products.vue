<template>
    <div>
        <v-toolbar dark>
            Products
            <v-spacer></v-spacer>
            <v-tooltip top min-width="125" color="cyan darken-4">
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="createDialog = true">
                        <v-icon large>add_circle</v-icon>
                    </v-btn>
                </template>
                <span style="font-size: 14px;">Add New Product</span>
            </v-tooltip>
        </v-toolbar>
        <v-layout row wrap>
            <v-flex xs12 md8>
                <v-card height="60">
                    <v-alert
                    :value="true"
                    type="info"
                    color="cyan darken-4"
                    >
                    In order to manage your products, select one from list.
                    </v-alert>
                </v-card>
                <GetProducts
                    @SelectProduct="selectProduct"/>
            </v-flex>
            <v-flex xs12 md4 v-if="selected">
                <UpdateProduct :product="selected"
                    @ClearSelected="selected =  ''" />
            </v-flex>
        </v-layout>

        <CreateProduct 
            :dialog="createDialog"
            @CloseDialog="createDialog = false"
        />
    </div>
</template>

<script>
import CreateProduct from '@/components/admin/CreateProduct'
import GetProducts from '@/components/admin/GetProducts'
import UpdateProduct from '@/components/admin/UpdateProduct'
import {mapActions, mapState} from 'vuex'
    export default {
        components: {
            CreateProduct,
            GetProducts,
            UpdateProduct
        },
        data() {
            return {
                selected: '',
                createDialog: false,
            }
        },
        computed: {
            ...mapState('products', ['product']),
        },
        methods: {
            ...mapActions('products', ['fetchProduct']),
            selectProduct(id) {
                this.fetchProduct(id)
                    .then(response => {
                        this.selected = this.product
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