<template>

  <div v-if="productList">
      <v-card height="300" class="transparent" flat>
        <v-data-table
        :headers="headers"
        :items="productList"
        :search="search"
        hide-actions
        :pagination.sync="pagination"
        class="elevation-1"
        >
        <template v-slot:items="props" >
            <tr @click="$emit('SelectProduct', props.item._id)"
            style="cursor: pointer;">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.price }}</td>
            <td id="checkbox">
                <v-checkbox color="cyan darken-4" readonly :input-value="props.item.productImage"></v-checkbox>
            </td>
            </tr>
        </template>
        </v-data-table> 
      </v-card>
    <div class="text-xs-center pt-2">
      <v-pagination color="cyan darken-4" v-model="pagination.page" :length="pages"></v-pagination>
    </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters('products', ['productList']),
            pages () {
                if (this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
                ) return 0

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            }
        },
        data () {
            return {
                search: '',
                pagination: {},
                selected: [],
                headers: [
                    {text: 'Name', align: 'center', value: 'name'},
                    { text: 'Price ($)', align: 'center', value: 'price' },
                    { text: 'Image', align: 'center', value: 'productImage' },
                ],
                
            }
        },
    }
</script>

<style scoped>
.v-datatable .v-input--selection-controls {
  justify-content: center;
}
</style>