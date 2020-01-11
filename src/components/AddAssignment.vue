<template>
  <div>
    <q-dialog persistent ref="addAssignmentDialog">
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row">
          <div class="text-h6">ماموریت جدید</div>
          <q-space />
          <q-btn @click="resetForm" flat round icon="close" v-close-popup />
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
                v-model="assignmentToAdd.dueAt"
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
                        v-model="assignmentToAdd.dueAt"
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
                v-model="assignmentToAdd.doneAt"
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
                        v-model="assignmentToAdd.doneAt"
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
                v-model="selectedDistributor.fullName"
                style="width: 49%" outlined label="موزع"
              >
                <template v-slot:append>
                  <q-btn flat icon="person" @click="selectDistributor" />
                </template>
              </q-input>
              <q-input
                hint="برای انتخاب خیر روی آدمک کلیک کنید"
                readonly
                v-model="selectedDonor.fullName"
                style="width: 49%" outlined label="خیر"
                :rules="[value => value.length > 0 || 'خیر باید انتخاب شود.']"
                ref="selectedDonorInput"
              >
                <template v-slot:append>
                  <q-btn flat icon="person" @click="selectDonor" />
                </template>
              </q-input>
            </div>
            <div class="selectListContainer" style="margin-top: 10px;">
              <q-select
                outlined
                v-model="scheduleResultTypeModel"
                :options="scheduleResultTypes"
                label="وضعیت ماموریت"
                style="width: 80%"
              />
              <q-btn
                flat
                dense
                color="primary"
                label="نوع جدید"
                style="width: 19%; font-size: 20px"
                @click="$refs.addScheduleResultTypeComponent.show()"
              />
            </div>
            <div style="margin-top: 10px;">
              <q-input
                v-model="assignmentToAdd.description"
                autogrow outlined
                label="توضیحات"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :disable="!model.value"
            @click="addAssignment"
            label="ایجاد ماموریت"
            color="primary"
            class="q-mr-sm q-mb-sm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog full-width v-model="showSelectDialog">
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
            @add="(info) => updateFormContent(info)"
          />
          <div v-else>
            <donors-table
              ref="donorsTable"
              :is-donor-selecting="true"
              @add="(info) => updateFormContent(info)"
            />
            <div class="myDiv">
              <q-btn
                color="primary"
                class="q-mt-md"
                round
                icon="add"
                @click="addNewDonor"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <add-donor @successAdd="$refs.donorsTable.reloadTable()" ref="addDonorDialog" />
    <edit-donor />

    <add-schedule-type ref="addScheduleTypeComponent" />
    <add-schedule-result-type ref="addScheduleResultTypeComponent" />

  </div>
</template>

<script>
  const jalaali = require('jalaali-js')
  import DistributorsTable from './DistributorsTable.vue'
  import DonorsTable from './DonorsTable.vue'
  import AddDonor from '../components/AddDonor.vue'
  import EditDonor from '../components/EditDonor.vue'
  import AddScheduleType from '../components/AddScheduleType.vue'
  import AddScheduleResultType from '../components/AddScheduleResultType.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      DistributorsTable,
      DonorsTable,
      AddDonor,
      EditDonor,
      AddScheduleType,
      AddScheduleResultType
    },
    data() {
      return {
        isDistributorToSelect: true,
        showSelectDialog: false,
        selectedDistributor: {
          fullName: 'نامشخص'
        },
        selectedDonor: {
          fullName: ''
        },
        model: {
          label: 'هیچ کدام',
          value: ''
        },
        assignmentToAdd: {
          distributorId: 1,
          donorId: '',
          dueAt: this.getTodayDate(),
          doneAt: '',
          description: ''
        },
        scheduleResultTypeModel: {
          label: '',
          value: 0
        }
      }
    },
    computed: {
      ...mapGetters('scheduleTypes', ['scheduleTypes']),
      ...mapGetters('scheduleResultTypes', ['scheduleResultTypes'])
    },
    methods: {
      show() {
        this.$refs.addAssignmentDialog.show()
      },
      hide() {
        this.$refs.addAssignmentDialog.hide()
      },
      date2number(date) {
        const newDate = date.replace(/\//g, '')
        return parseInt(newDate)
      },
      addAssignment() {
        if (this.isFormValid()) {
          const assignment = {
            distributorId: this.assignmentToAdd.distributorId,
            donorId: this.assignmentToAdd.donorId,
            scheduleTypeId: this.model.value,
            scheduleResultTypeId: this.scheduleResultTypeModel.value,
            dueAt: this.date2number(this.assignmentToAdd.dueAt),
            doneAt: this.date2number(this.assignmentToAdd.doneAt),
            description: this.assignmentToAdd.description
          }
          this.$axios.post('/Schedule', assignment)
            .then(res => {
              if (res.data.success) {
                this.showNotification({
                  msg: 'ماموریت با موفقیت ایجاد شد.',
                  color: 'primary',
                  icon: 'thumb_up'
                })
                // this.hide()
                this.$emit('successAdd')
              } else {
                this.showNotification({
                  msg: 'ماموریت ایجاد نشد.',
                  color: 'negative',
                  icon: 'error'
                })
              }
            })
            .catch(() => {
              this.showNotification({
                msg: 'ارتباط با سرور قطع است.',
                color: 'negative',
                icon: 'error'
              })
            })
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
      },
      isFormValid() {
        this.$refs.selectedDonorInput.validate()
        return !this.$refs.selectedDonorInput.hasError
      },
      resetForm() {
        this.assignmentToAdd = {
          distributorId: 1,
          donorId: '',
          dueAt: this.getTodayDate(),
          doneAt: '',
          description: ''
        }
        this.model = {
          label: 'هیچ کدام',
          value: ''
        }
        this.selectedDonor = {
          fullName: ''
        }
        this.selectedDistributor = {
          fullName: 'نامشخص'
        }
      },
      selectDistributor() {
        this.showSelectDialog = true
        this.isDistributorToSelect = true
      },
      selectDonor() {
        this.showSelectDialog = true
        this.isDistributorToSelect = false
      },
      updateFormContent(info) {
        if (this.isDistributorToSelect) {
          this.selectedDistributor.fullName = info.firstName + ' ' + info.lastName
          this.assignmentToAdd.distributorId = info.id
        } else {
          this.selectedDonor.fullName = info.fullName
          this.assignmentToAdd.donorId = info.id
        }
        this.showSelectDialog = false
      },
      addNewDonor() {
        this.$refs.addDonorDialog.show()
      },
      getTodayDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        today = jalaali.toJalaali(yyyy, parseInt(mm), parseInt(dd))
        today.jd = today.jd < 10 ? '0' + today.jd.toString() : today.jd.toString()
        today.jm = today.jm < 10 ? '0' + today.jm.toString() : today.jm.toString()
        today.jy = today.jy.toString()
        today = today.jy + '/' + today.jm + '/' + today.jd
        return today
      }
    }
  }
</script>

<style scoped>
  .myDiv {
    display: flex;
    justify-content: flex-end;
  }

  .selectListContainer {
    display: flex;
    justify-content: space-between
  }
</style>
