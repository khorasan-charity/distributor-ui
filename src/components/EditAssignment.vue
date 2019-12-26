<template>
<div>
    <q-dialog ref="editAssignmentDialog">
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row">
          <div class="text-h6">ویرایش ماموریت</div>
          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="selectListContainer" style="margin-bottom: 10px">
            <q-select
              outlined
              v-model="model"
              :options="scheduleTypes"
              label="نوع ماموریت"
              style="width: 80%"
            />
            <q-btn
              @click="$refs.addScheduleTypeComponent.show()"
              flat
              dense
              color="primary"
              label="نوع جدید"
              style="width: 19%; font-size: 20px"
            />
          </div>
          <div v-if="model.value">
            <div style="display: flex; justify-content: space-between;">
              <q-input
                outlined
                label="تاریخ ثبت"
                style="width: 49%"
                v-model="assignmentToEdit.dueAt"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxyForDistributor"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        today-btn
                        calendar="persian"
                        v-model="assignmentToEdit.dueAt"
                        @input="() => $refs.qDateProxyForDistributor.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                outlined
                label="تاریخ اتمام"
                style="width: 49%"
                v-model="assignmentToEdit.doneAt"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxyForDonor"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        today-btn
                        calendar="persian"
                        v-model="assignmentToEdit.doneAt"
                        @input="() => $refs.qDateProxyForDonor.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
              <q-input
                hint="برای انتخاب موزع روی آدمک کلیک کنید"
                readonly
                v-model="assignmentToEdit.distributorFullName"
                style="width: 49%" outlined label="موزع"
                @click="selectDistributor"
              >
                <template v-slot:append>
                  <q-btn flat icon="person" @click="selectDistributor" />
                </template>
              </q-input>
              <q-input
                hint="برای انتخاب خیر روی آدمک کلیک کنید"
                readonly
                v-model="assignmentToEdit.donorFullName"
                style="width: 49%" outlined label="خیر"
                :rules="[value => value.length > 0 || 'خیر باید انتخاب شود.']"
                ref="selectedDonorInput"
                @click="selectDonor"
              >
                <template v-slot:append>
                  <q-btn flat icon="person" @click="selectDonor" />
                </template>
              </q-input>
            </div>
            <div style="margin-top: 10px;">
              <q-input
                v-model="assignmentToEdit.description"
                autogrow outlined
                label="توضیحات"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :disable="!model.value"
            label="ویرایش"
            color="primary"
            class="q-mr-sm q-mb-sm"
            @click="editAssignment"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <select-dialog
      :is-distributor-to-select="isDistributorToSelect"
      ref="selectDialogComponent"
      @update="(info) => updateFormContent(info)"
    />

    <add-schedule-type ref="addScheduleTypeComponent" />

  </div>
</template>

<script>
  import AddDonor from '../components/AddDonor.vue'
  import EditDonor from '../components/EditDonor.vue'
  import AddScheduleType from '../components/AddScheduleType.vue'
  import SelectDialog from '../components/SelectDialog.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      AddDonor,
      EditDonor,
      AddScheduleType,
      SelectDialog
    },
    data() {
      return {
        isDistributorToSelect: true,
        showSelectDialog: false,
        model: {
          label: '',
          value: 0
        },
        assignmentToEdit: {
          id: 0,
          distributorId: 0,
          donorId: 0,
          distributorFullName: '',
          donorFullName: '',
          scheduleTypeId: '',
          scheduleTypeName: '',
          description: '',
          dueAt: '',
          doneAt: ''
        }
      }
    },
    computed: {
      ...mapGetters('scheduleTypes', ['scheduleTypes'])
    },
    methods: {
      date2number(date) {
        const newDate = date.replace(/\//g, '')
        return parseInt(newDate)
      },
      isFormValid() {
        this.$refs.selectedDonorInput.validate()
        return !this.$refs.selectedDonorInput.hasError
      },
      showNotification(notification) {
        this.$q.notify({
          message: notification.msg,
          color: notification.color,
          icon: notification.icon,
          textColor: 'white',
          timeout: 1000
        })
      },
      editAssignment() {
        const assignment = {
          id: this.assignmentToEdit.id,
          distributorId: this.assignmentToEdit.distributorId,
          donorId: this.assignmentToEdit.donorId,
          scheduleTypeId: this.model.value,
          dueAt: this.date2number(this.assignmentToEdit.dueAt),
          doneAt: this.date2number(this.assignmentToEdit.doneAt),
          description: this.assignmentToEdit.description
        }
        this.$axios.put('/Schedule', assignment)
          .then(res => {
            if (res.data.result && res.data.success) {
              this.showNotification({
                msg: 'ماموریت با موفقیت ویرایش شد.',
                color: 'primary',
                icon: 'thumb_up'
              })
              this.$refs.editAssignmentDialog.hide()
              this.$emit('successEdit')
            }
          })
          .catch(() => {
            const msg = 'ارتباط با سرور قطع است'
            const color = 'negative'
            const icon = 'error'
            this.showNotification(msg, color, icon)
          })
      },
      updateFormContent(info) {
        if (this.isDistributorToSelect) {
          this.assignmentToEdit.distributorFullName = info.firstName + ' ' + info.lastName
          this.assignmentToEdit.distributorId = info.id
        } else {
          this.assignmentToEdit.donorFullName = info.fullName
          this.assignmentToEdit.donorId = info.id
        }
      },
      selectDistributor() {
        this.isDistributorToSelect = true
        this.$refs.selectDialogComponent.show()
      },
      selectDonor() {
        this.isDistributorToSelect = false
        this.$refs.selectDialogComponent.show()
      },
      show(information) {
        this.model = {
          label: information.scheduleTypeName,
          value: information.scheduleTypeId
        }
        this.assignmentToEdit = {
          id: information.id,
          distributorId: information.distributorId,
          donorId: information.donorId,
          distributorFullName: information.distributorFullName,
          donorFullName: information.donorFullName,
          scheduleTypeId: information.scheduleTypeId,
          scheduleTypeName: information.scheduleTypeName,
          description: information.description,
          dueAt: this.formatDate(information.dueAt),
          doneAt: this.formatDate(information.doneAt)
        }
        this.$refs.editAssignmentDialog.show()
      },
      addNewDonor() {
        this.$refs.addDonorDialog.show()
      },
      formatDate(dateNumber) {
        const date = dateNumber.toString()
        const year = date[0] + date[1] + date[2] + date[3]
        const month = date[4] + date[5]
        const day = date[6] + date[7]
        return year + '/' + month + '/' + day
      },
    }
  }
</script>

<style scoped>
  .selectListContainer {
    display: flex;
    justify-content: space-between
  }
</style>
