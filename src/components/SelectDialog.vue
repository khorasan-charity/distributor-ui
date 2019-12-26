<template>
  <div>
    <q-dialog full-width ref="selectDialog">
      <q-card>
        <q-card-section class="row">
          <div
            class="text-h6">{{isDistributorToSelect
            ?
            'انتخاب موزع'
            :
            'انتخاب خیر'
            }}
          </div>
          <q-space />
          <q-btn
            color="white"
            class="bg-blue-grey-6"
            flat
            label="بستن"
            v-close-popup
          />
        </q-card-section>

        <q-card-section>
          <distributors-table
            v-if="isDistributorToSelect"
            :is-distributor-selecting="true"
            @add="(info) => sendForUpdate(info)"
          />
          <div v-else>
            <donors-table
              ref="donorsTable"
              :is-donor-selecting="true"
              @add="(info) => sendForUpdate(info)"
            />
            <div class="myDiv">
              <q-btn
                color="primary"
                class="q-mt-md"
                round
                icon="add"
                @click="$refs.addDonorDialog.show"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <add-donor @successAdd="$refs.donorsTable.reloadTable()" ref="addDonorDialog" />
    <edit-donor />
  </div>
</template>

<script>
  import DonorsTable from '../components/DonorsTable.vue'
  import DistributorsTable from '../components/DistributorsTable.vue'
  import AddDonor from '../components/AddDonor.vue'
  import EditDonor from '../components/EditDonor.vue'
  export default {
    components: {
      DonorsTable,
      DistributorsTable,
      AddDonor,
      EditDonor
    },
    props: ['isDistributorToSelect'],
    data() {
      return {

      }
    },
    methods: {
      show() {
        this.$refs.selectDialog.show()
      },
      hide() {
        this.$refs.selectDialog.hide()
      },
      sendForUpdate(info) {
        this.$emit('update', info)
        this.$refs.selectDialog.hide()
      }
    }
  }
</script>

<style scoped>
  .myDiv {
    display: flex;
    justify-content: flex-end;
  }
</style>
