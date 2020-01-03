<template>
  <div>
    <div class="q-pa-md">
      <q-table
        title="انواع ماموریت‌ها"
        :data="scheduleTypes"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.label }}
            </q-td>
            <q-td key="operations" :props="props">
              <div>
                <q-btn
                  v-if="props.row.value !== 0"
                  dense
                  flat
                  round
                  color="blue"
                  icon="edit"
                  @click="sendToEdit({id: props.row.value, name: props.row.label})"
                />
                <q-btn
                  v-if="props.row.value !== 0"
                  dense
                  flat
                  round
                  color="red"
                  icon="delete"
                  @click="remove(props.row.value)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-btn
      @click="$refs.addScheduleTypeComponent.show()"
      round
      icon="add"
      class="fixed-bottom-right q-mr-md q-mb-md"
      color="primary"
    />

    <add-schedule-type ref="addScheduleTypeComponent" />
    <edit-schedule-type ref="editScheduleTypeComponent" />

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import AddScheduleType from '../components/AddScheduleType.vue';
  import EditScheduleType from '../components/EditScheduleType.vue';
  import Notification from '../services/Notification';
  export default {
    components: {
      AddScheduleType,
      EditScheduleType
    },
    data() {
      return {
        pagination: {
          rowsPerPage: 0,
          page: 1,
        },
        columns: [
          {
            name: 'name',
            required: true,
            label: 'عنوان',
            align: 'center',
            field: row => row.label,
          },
          {
            name: 'operations',
            label: 'عملیات',
            align: 'center'
          }
        ]
      }
    },
    computed: {
      ...mapGetters('scheduleTypes', ['scheduleTypes'])
    },
    methods: {
      ...mapActions('scheduleTypes', ['addScheduleType', 'reloadScheduleTypes', 'deleteScheduleType']),
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
      remove(id) {
        this.$q.dialog({
          title: 'هشدار',
          message: 'آیا از حذف نوع ماموریت اطمینان دارید؟',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteScheduleType(id)
            .then(res => {
              console.log(id);
              if (res.data.result && res.data.success) {
                const notification = new Notification({
                  message: 'نوع ماموریت با موفقیت حذف شد.',
                  color: 'primary',
                  icon: 'thumb_up',
                  textColor: 'white',
                  timeout: 1000
                });
                this.reloadScheduleTypes();
                notification.show();
              } else {
                const notification = new Notification({
                  message: 'نوع ماموریت حذف نشد.',
                  color: 'negative',
                  icon: 'error',
                  textColor: 'white',
                  timeout: 1000
                });
                notification.show();
              }
            })
            .catch(err => {
              console.log(err.message);
              const notification = new Notification({
                message: 'عدم اتصال به سرور',
                color: 'negative',
                icon: 'error',
                textColor: 'white',
                timeout: 1000
              });
              notification.show();
            });
        });
      },
      sendToEdit(scheduleTypeToEditInfo) {
        this.$refs.editScheduleTypeComponent.show(scheduleTypeToEditInfo);
      }
    }
  }
</script>

<style scoped>

</style>
