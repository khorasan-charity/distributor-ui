<template>
  <div class="q-pa-md">
    <div style="display: flex; justify-content: center;">
      <div class="q-mt-md" style="width: 90%;">
        <q-input outlined v-model="date" style="font-size: 20px;">
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
    </div>

    <div class="text-center" style="margin-top: 20px; display: flex; justify-content: space-around">
      <q-btn
        style="width: 300px;"
        color="accent"
        icon="warning"
        dense
        label="برای مدیریت انواع ماموریت‌ها کلیک کنید"
        @click="goToScheduleTypesPage"
      />
      <q-btn
        style="width: 300px;"
        color="accent"
        icon="warning"
        dense
        label="برای مدیریت وضعیت ماموریت‌ها کلیک کنید"
        @click="goToScheduleResultTypesPage"
      />
    </div>

    <assignments-table ref="assignmentsTable" class="q-mt-md" />

    <q-btn
      @click="showAddAssignment"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary" />

    <add-assignment @successAdd="$refs.assignmentsTable.reloadTable()" ref='addAssignmentComponent' />
  </div>
</template>

<script>
  const jalaali = require('jalaali-js')
  import AddAssignment from '../components/AddAssignment.vue'
  import AssignmentsTable from '../components/AssignmentsTable.vue'
  export default {
    components: {
      AddAssignment,
      AssignmentsTable
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
      },
      goToScheduleTypesPage() {
        this.$router.push('/scheduleTypes')
      },
      goToScheduleResultTypesPage() {
        this.$router.push('/scheduleResultTypes')
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
