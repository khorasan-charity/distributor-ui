<template>
  <div class="q-pa-md">
    <q-input
      @keyup.enter="search"
      v-model="distributorToSearch"
      filled
      label="جستجو"
    >
      <template v-slot:append>
        <q-icon class="cursor-pointer" />
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- TODO: create table component -->
    <my-table class="q-mt-sm" ref="myTable" />

    <add-distributor ref="addDialog" @successAdd="$refs.myTable.reloadTable()" />


    <q-btn
      @click="$refs.addDialog.show()"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary" />

  </div>
</template>

<script>
  import AddDistributor from '../components/AddDistributor.vue';
  import MyTable from '../components/MyTable.vue';
  export default {
    components: {
      AddDistributor,
      MyTable
    },
    data() {
      return {
        distributorToSearch: ''
      }
    },
    methods: {
      search() {
        // TODO: Complete search distributor
        console.log(this.distributorToSearch);
      }
    },
    mounted() {
      // TODO: Axios.get() to the baseURL with the default pagination
    }
  }
</script>

<style scoped>
</style>
