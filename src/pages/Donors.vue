<template>
  <div class="q-pa-md">

    <donors-table :is-donor-selecting="false" class="q-mt-sm" ref="myTable" />

    <add-donor ref="addDialog" @successAdd="$refs.myTable.reloadTable()" />


    <q-btn
      @click="$refs.addDialog.show()"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary"
    />

  </div>
</template>

<script>
  import DonorsTable from "../components/DonorsTable.vue"
  import AddDonor from "../components/AddDonor.vue"
  export default {
    components: {
      DonorsTable,
      AddDonor
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
