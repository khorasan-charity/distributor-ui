<template>
  <div>
    <div class="q-mt-xl q-mr-md fixed-right" style="max-width: 400px">
      <q-input v-model="date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                today-btn
                calendar="persian"
                v-model="date"
                @input="() => $refs.qDateProxy.hide()"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <q-btn
      @click="showAddAssignment"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary" />

    <add-assignment ref='addAssignmentComponent' />
  </div>
</template>

<script>
  const jalaali = require('jalaali-js')
  import AddAssignment from '../components/AddAssignment.vue'
  export default {
    components: {
      AddAssignment
    },
    data() {
      return {
        alert: false,
        date: ''
      }
    },
    methods: {
      showAddAssignment() {
        this.$refs.addAssignmentComponent.show()
      }
    },
    mounted() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      today = jalaali.toJalaali(yyyy, parseInt(mm), parseInt(dd))
      today.jd = today.jd < 10 ? '0' + today.jd.toString() : today.jd.toString()
      today.jm = today.jm < 10 ? '0' + today.jm.toString() : today.jm.toString()
      today.jy = today.jy.toString()
      this.date = today.jy + '/' + today.jm + '/' + today.jd
    }
  }
</script>

<style lang="scss" scoped>
</style>
