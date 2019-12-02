<template>
  <div class="q-pa-md">


    <distributors-table ref="distributorsTable" />

    <add-distributor ref="addDialog" @successAdd="$refs.distributorsTable.reloadTable()" />


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
  import DistributorsTable from '../components/DistributorsTable.vue';
  export default {
    components: {
      AddDistributor,
      DistributorsTable
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
</style>
