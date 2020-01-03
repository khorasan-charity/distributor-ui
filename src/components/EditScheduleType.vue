<template>
  <q-dialog ref="editScheduleTypeDialog">
    <q-card style="min-width: 350px">
      <q-card-section class="row">
          <div class="text-h6">ویرایش نوع ماموریت</div>
          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

      <q-card-section>
        <q-input
          label="نام"
          ref="scheduleTypeName"
          outlined
          v-model="scheduleTypeToEdit.name"
          :rules="[value => value.trim().length > 0 || 'پر کردن این قسمت اجباری است']"
          @keyup.enter="edit"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="ایجاد" @click="edit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import Notification from '../services/Notification';
export default {
  data() {
    return {
      scheduleTypeToEdit: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
    ...mapActions('scheduleTypes', ['editScheduleType', 'reloadScheduleTypes']),
    show(scheduleTypeToEditInfo) {
      this.scheduleTypeToEdit = scheduleTypeToEditInfo;
      this.$refs.editScheduleTypeDialog.show();
    },
    hide() {
      this.$refs.editScheduleTypeDialog.hide();
    },
    isScheduleTypeNameValid() {
      this.$refs.scheduleTypeName.validate()
      return !this.$refs.scheduleTypeName.hasError
    },
    edit() {
      if (this.isScheduleTypeNameValid()) {
        this.editScheduleType(this.scheduleTypeToEdit)
          .then(res => {
            console.log(res.data);
            if (res.data.result && res.data.success) {
              const notification = new Notification({
                message: 'نوع ماموریت با موفقیت ویرایش شد.',
                color: 'primary',
                icon: 'thumb_up',
                textColor: 'white',
                timeout: 1000
              });
              notification.show();
              this.reloadScheduleTypes();
              this.hide();
            } else {
              const notification = new Notification({
                message: 'نوع ماموریت ویرایش نشد.',
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
              message: 'عدم برقراری ارتباط با سرور.',
              color: 'negative',
              icon: 'error',
              textColor: 'white',
              timeout: 1000
            });
            notification.show();
          });
      }
    }
  }
}
</script>

<style scoped>

</style>
