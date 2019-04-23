<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="750">
        <v-layout row wrap> 
            <v-flex xs8>
                <v-card>
                    <v-card-title class="headline">Create New Product</v-card-title>
                    <v-form class="px-4 pt-4">
                            <v-text-field
                            v-model="newProduct.name"
                            label="Name"
                            required
                            color="cyan darken-4"
                            ></v-text-field>

                            <v-text-field
                            v-model="newProduct.price"
                            label="Price"
                            prefix="$"
                            required
                            type="number"
                            color="cyan darken-4"
                            ></v-text-field>

                            <v-text-field 
                            label="Select Image" 
                            @click='pickFile' 
                            v-model='imageName' 
                            prepend-icon='attach_file'
                            color="cyan darken-4"
                            >
                            </v-text-field>
                            <input
                                    type="file"
                                    style="display: none"
                                    ref="image"
                                    accept="image/*"
                                    @change="onFilePicked"
                            >

                        </v-form>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-4" flat @click="closeForm">Cancel</v-btn>
                    <v-btn color="cyan darken-4" flat @click="createNewProduct">Agree</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card height="82%">
                    <div v-if="imageUrl" class="pt-5"> 
                        <v-img :src="imageUrl"></v-img>
                    </div>
                    
                    <v-bottom-nav absolute>
                            <v-alert
                            :value="alert"
                            type="error"
                            >
                            {{alert}}
                            </v-alert>
                    </v-bottom-nav>

                </v-card>
            </v-flex>
        </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: ['dialog'],
    data() {
        return {
            alert: '',
            newProduct: {
                name: '',
                price: '',
                productImage: ''
            },
            imageName: '',
            imageUrl: '',
            imageFile: ''
        }
    },
    methods: {
        ...mapActions('products', ['addProduct', 'fetchProducts']),
        closeForm(){
            this.alert = '';
            this.newProduct = {
                name: '',
                price: '',
                productImage: ''
            },
            this.imageName = '';
            this.imageUrl = '';
            this.imageFile = '';
            this.$emit('CloseDialog')
        },
        createNewProduct(){
            this.addProduct(this.newProduct)
                .then(response => {
                    this.fetchProducts()
                        .then(() => this.closeForm())
                        .catch(error => console.log(error));
                })
                .catch(error => {
                    this.alert = error
                    console.log(error)
                })
        },
        pickFile() {
             this.$refs.image.click()
        },
        onFilePicked(e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
                    this.imageFile = files[0]
                    this.newProduct.productImage = files[0]
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
    },
}
</script>


<style lang="scss" scoped>

</style>