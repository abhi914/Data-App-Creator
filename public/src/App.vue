<template>
  <div id="app">    
    <v-toolbar dark color="primary">
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">App Data Creator</v-toolbar-title>      
      </v-toolbar>

        <DataContainer />

      
  </div>
</template>

<script>
import DataContainer from './components/DataContainer.vue'


export default {
  name: 'app',
  components: {
    DataContainer,
    
  }
}
</script>

<style>

</style>
