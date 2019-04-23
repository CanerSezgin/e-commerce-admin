<template>
    <div>
        <v-layout row wrap class="mx-5 my-4">
            <v-flex xs3>
                <v-toolbar>
                    Restful Api Documentation
                </v-toolbar>
                <template>
                <v-card
                    class="mx-auto"
                    max-width="500"
                >
                    <v-sheet class="pa-3 primary lighten-2">
                    <v-text-field
                        v-model="search"
                        label="Search in Documentation"
                        dark
                        flat
                        solo-inverted
                        hide-details
                        clearable
                        clear-icon="mdi-close-circle-outline"
                    ></v-text-field>
                    <v-checkbox
                        v-model="caseSensitive"
                        dark
                        hide-details
                        label="Case sensitive search"
                    ></v-checkbox>
                    </v-sheet>
                    <v-card-text>
                    <v-treeview
                        :items="items"
                        :search="search"
                        :filter="filter"
                        :open.sync="open"
                    >
                        <template v-slot:prepend="{ item }">
                        <v-icon color="blue"
                            v-if="item.children"
                            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
                        ></v-icon>
                        </template>
                    </v-treeview>
                    </v-card-text>
                </v-card>
                </template>
            </v-flex>
            <v-flex xs6 class="px-4 mt-3">
                <h2>About Project</h2>
                <p>This project was not created for commercial use, It is only for my personal portfolio.</p>
                <p>A simple <span class="highlighted">RESTful API</span>, contains <span class="highlighted">CRUD</span> operations on <span class="highlighted">Node.JS</span> and an interface with <span class="highlighted">Vue.JS</span></p>
                <p> The user can simply <span class="highlighted">create/use an account</span> in order to manage his/her e-commerce store.</p>
                <p>The user can <span class="highlighted">Create/Update/Delete</span> a product or receive an order.</p>
            
               <div class="my-3">
                    <h3>RESTful Api</h3>
                <ul>
                    <li>
                        <v-icon color="blue darken-2">playlist_add</v-icon>
                        CRUD operations
                    </li>
                    <li><v-icon color="blue darken-2">playlist_add</v-icon>
                        Authentication with JWT
                    </li>
                    <li><v-icon color="blue darken-2">playlist_add</v-icon>
                        Restricted Access
                    </li>
                    <li><v-icon color="blue darken-2">playlist_add</v-icon>
                        Routes - Models - Controllers Code Structure
                    </li>
                    <li><v-icon color="blue darken-2">playlist_add</v-icon>
                        Running on different server (webservice)
                    </li>
                </ul>

                <h3>User Interface</h3>
                <ul>
                    <li>
                        <v-icon color="red darken-2">playlist_add</v-icon>
                        Login/SignUp Page
                    </li>
                    <li><v-icon color="red darken-2">playlist_add</v-icon>
                        Navigation Guards
                    </li>
                    <li><v-icon color="red darken-2">playlist_add</v-icon>
                        Restricted Pages (Admin Dashboard)
                    </li>
                    <li><v-icon color="red darken-2">playlist_add</v-icon>
                        Product CRUD Operations (Admin Dashboard)
                    </li>
                    <li><v-icon color="red darken-2">playlist_add</v-icon>
                        Products on Store
                    </li>
                    <li><v-icon>playlist_add</v-icon>
                        Add to Cart & Product Details (Store)
                    </li>
                    <li><v-icon>playlist_add</v-icon>
                        Users Management (Admin Dashboard)
                    </li>
                    <li><v-icon>playlist_add</v-icon>
                        Orders Management (Admin Dashboard)
                    </li>
                </ul>
               </div>
                

            </v-flex>
            <v-flex xs3 class="px-3">
                <v-card class="elevation-10">
                    <div class="pa-3">
                        <h2 class="mb-2">Made With</h2>
                        <ul> 
                            <li>
                                <v-icon color="green darken-4">check</v-icon>
                                Node.JS (Express)
                            </li>
                            <li>
                                <v-icon color="green darken-4">check</v-icon>
                                MongoDB (Atlas)
                            </li>
                            <li>
                                <v-icon color="green darken-4">check</v-icon>
                                Vue.JS (Vuex)
                            </li>
                            <li>
                            <v-icon color="green darken-4">check</v-icon>
                                Vuetify
                            </li>
                        </ul>
                        <v-btn class="mt-3 cyan darken-4" dark> Source Code </v-btn>
                    </div>
                </v-card>
                
            <v-card class="my-1 elevation-10">
                <div class="pa-3">
                    <h4 class="mb-2">Opinion and Suggestion</h4>
                    <ul>
                        <li>
                        <v-icon small color="orange darken-3">star</v-icon>
                        If you detect any bugs
                        </li>
                        <li>
                        <v-icon small color="orange darken-3">star</v-icon>
                        If you have any questions
                        </li>
                        <li>
                        <v-icon small color="orange darken-3">star</v-icon>
                        If you have any suggestions 
                        </li>
                        <li class="ml-5 pl-5">or</li>
                        <li>
                        <v-icon small color="orange darken-3">star</v-icon>
                        If you wanna just say something 
                        </li>
                    </ul>
                </div>

                <div class="px-3 pb-3">
                    <h4 class="mb-2">You can get in touch with me</h4>
                    <ul>
                        <li>
                            <a href="http://bit.ly/CanerSezgin" target="_blank">
                            <v-icon color="blue" small>thumb_up</v-icon> 
                            on Twitter
                            </a>
                        </li>
                        <li>
                            <a href="http://bit.ly/gitHub_casedo" target="_blank">
                            <v-icon color="blue" small>thumb_up</v-icon>
                            on Github
                            </a>
                        </li>     
                        <li>
                            <a href="http://bit.ly/Linkedin_CanerSezgin" target="_blank">
                            <v-icon color="blue" small>thumb_up</v-icon>
                            on Linkedin
                            </a>
                        </li>
                    </ul>
                </div>
            </v-card>

            </v-flex>
        </v-layout>   
    </div>   
</template>

<script>
    export default {
        data: () => ({
      items: [
        {
          id: 1,
          name: 'API',
          children: [
            {
              id: 2,
              name: 'routes',
              children: [
                {
                  id: 201,
                  name: '/user',
                  children: [
                      {id: 2011, name: 'POST: /signup'},
                      {id: 2012, name: 'POST: /login'},
                      {id: 2013, name: '(A) DELETE: /:userID'},
                  ]
                },
                {
                  id: 202,
                  name: '/products',
                  children: [
                      {id: 2021, name: 'GET: /'},
                      {id: 2022, name: 'GET: /:productId'},
                      {id: 2023, name: '(A) POST: /'},
                      {id: 2024, name: '(A) PATCH  /:productId'},
                      {id: 2025, name: '(A) DELETE /:productId'},
                  ]
                },
                {
                  id: 203,
                  name: '/orders',
                children: [
                      {id: 2031, name: '(A) GET: /'},
                      {id: 2032, name: '(A) GET: /:orderId'},
                      {id: 2033, name: '(A) POST: /'},
                      {id: 2035, name: '(A) DELETE /:orderId'},
                  ]
                },
              ]
            },
          
          ]
        }
      ],
      open: [1, 2],
      search: null,
      caseSensitive: false
    }),
    computed: {
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      }
    }
    }
</script>

<style scoped>
    li {
        list-style-type: none;
    }
    a {
        text-decoration: none;
    }
    .highlighted {
        font-weight: 500;
        color: blue;
    }
    p {
        margin: 0
    }
</style>