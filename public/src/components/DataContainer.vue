// WHOLE CODE IS IN THIS Component itself...
//NOTE: Change the calls from LOCAL to Network .


<template>
  <div>

    <!-- Dialog ..used for POST & PUT Method -->
    <v-dialog v-model="dialog" width="500px" >       
      <template v-slot:activator="{ on }">
        <p class="text-xs-right">
          <v-btn color="primary" dark class="mb-2 " v-on="on" >New App</v-btn>        
        </p>
      </template>                      
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>              
              <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.name" label="name" required ></v-text-field>
              </v-flex>              
              <v-flex md6>
                <v-select v-model="editedItem.status" :items="items" :error-messages="errors.collect('status')" label="Status" 
                  required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.url" required label="Url"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.icon_url" required label="Icon Url"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.parent_id" required label="Parent Id"></v-text-field>
              </v-flex>                
              <v-flex xs12 sm12 md12 >
                <v-text-field v-model="editedItem.description" required label="Description"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Displays Table data -->
    
    <v-data-table :headers="headers" :items="appData" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.url }}</td>
        <td class="text-xs-left">{{ props.item.icon_url }}</td>
        <td class="text-xs-left">{{ props.item.parent_id }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)"> edit </v-icon>
          <v-icon small @click="deleteItem(props.item)"> delete </v-icon>
        </td>
      </template>
      
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DataContainer',

  data() {
    return {
      dialog: false,
      // Change the header here.. if you feel like
      headers: [
        { text: 'ID', align: 'left', sortable: false, value: 'id' },
        { text: 'name', align: 'left', value: 'name' },
        { text: 'description', align: 'left', value: 'description' },
        { text: 'url', align: 'left', value: 'url' },
        { text: 'icon Url', align: 'left', value: 'icon_url' },
        { text: 'Parent ID', align: 'left', value: 'parent_id', sortable: false },
        { text: 'status', align: 'left', value: 'status' },
      ],
      appData: [],
      items: [
                1,                
                0                
      ],
      editedIndex: -1,
      editedItem: {       
        name: '',
        description: '',
        url: '',
        icon_url: '',
        parent_id: '',
        status: 0
      },
      defaultItem: {        
        name: '',
        description: '',
        url: '',
        icon_url: '',
        parent_id: '',
        status: 0
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  props: {
    
  },
  created () {
    this.initialize()
  },
  methods: {
    // Used to fetch the data
    initialize () {
      axios.get("http://localhost:3000/appdata").
        then((response) => {
          this.appData = response.data    
          // console.log("initialized")      
      })      
    },

    // Used to distinguish between POST & PUT Call (editedIndex is responsible for this)
    editItem (item) {
      this.editedIndex = this.appData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const id = item.id
      confirm('Are you sure you want to delete this item?') && 
      axios.delete("http://localhost:3000/appdata", {
        data: {
          id
        }
      }).
      then(response => {

        if(response.status == 200)
          this.initialize();
      })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    // POST & PUT Call are distinguished based on the editedIndex here
    save () {
      if (this.editedIndex > -1) {
        axios.put("http://localhost:3000/appdata", {
          data: {
            item: this.editedItem
          }
        }).
        then((response) => {
          
          if(response.status == 200)
            this.initialize();
        })
      } 
      else {
        axios.post("http://localhost:3000/appdata", {
          data: {
            item: this.editedItem
          }
        }).
        then((response) => {
          
          if(response.status == 200)
            this.initialize();
        })
      }
      this.close()
    } 
  }
} 
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
