<template>
  <div>
    {{scheduleTypes}}

    <q-btn
      @click="temp"
      round
      icon="add"
      color="primary" />
    <q-btn
      @click="$refs.addScheduleTypeComponent.show()"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary" />

    <add-schedule-type ref="addScheduleTypeComponent" />

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import addScheduleType from '../components/AddScheduleType.vue';
  import Notification from '../services/Notification';
  export default {
    components: {
      addScheduleType
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters('scheduleTypes', ['scheduleTypes'])
    },
    methods: {
      ...mapActions('scheduleType', ['addScheduleType', 'reloadScheduleTypes']),
      add() {
        this.addScheduleType(scheduleType)
          .then(res => {
            console.log(res.data); // Will be removed
            this.reloadScheduleTypes();
          })
          .catch(err => {
            console.log(err.message); // Maybe will be removed
          });
      },
      temp() {
        const notification = new Notification({
          message: 'بسیار عالی',
          color: 'primary',
          icon: 'warning',
          textColor: 'white',
          timeout: 1000
        });
        notification.show();
      }
    }
  }
</script>

<style scoped>

</style>
