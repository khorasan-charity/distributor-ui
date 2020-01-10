<template>
  <q-dialog ref="scheduleTypeDialog">
    <q-card style="min-width: 350px">
      <q-card-section class="row">
          <div class="text-h6">ایجاد نوع ماموریت</div>
          <q-space />
          <q-btn @click="reset" flat round icon="close" v-close-popup />
        </q-card-section>

      <q-card-section>
        <q-input
          label="نام"
          ref="scheduleTypeName"
          outlined
          v-model="scheduleTypeToAdd.name"
          :rules="[value => value.trim().length > 0 || 'پر کردن این قسمت اجباری است']"
          @keyup.enter="add"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="ایجاد" @click="add" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        scheduleTypeToAdd: {
          name: ''
        }
      }
    },
    methods: {
      ...mapActions('scheduleTypes', ['reloadScheduleTypes']),
      add() {
        if (this.isScheduleTypeNameValid()) {
          this.$axios.post('/ScheduleType', this.scheduleTypeToAdd)
            .then(res => {
              if (res.data.result && res.data.success) {
                this.showNotification({
                  msg: 'نوع ماموریت با موفقیت ایجاد شد',
                  color: 'primary',
                  icon: 'thumb_up'
                })
                this.reset()
                this.hide()
                this.reloadScheduleTypes()
              } else {
                this.showNotification({
                  msg: 'نوع ماموریت ایجاد نشد.',
                  color: 'negative',
                  icon: 'error'
                })
              }
            })
            .catch(err => {
              this.showNotification({
                msg: 'عدم برقراری ارتباط با سرور',
                color: 'negative',
                icon: 'error'
              })
            })
        }
      },
      isScheduleTypeNameValid() {
        this.$refs.scheduleTypeName.validate()
        return !this.$refs.scheduleTypeName.hasError
      },
      show() {
        this.$refs.scheduleTypeDialog.show()
      },
      hide() {
        this.$refs.scheduleTypeDialog.hide()
      },
      reset() {
        this.scheduleTypeToAdd = {
          name: ''
        }
      },
      showNotification(notification) {
        this.$q.notify({
          message: notification.msg,
          color: notification.color,
          icon: notification.icon,
          textColor: 'white',
          timeout: 1000
        })
      }
    }
  }
</script>

<style scoped>

</style>
