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
              style="width: 19%"
            />
          </div>
          <div v-if="model.value">
            <div style="display: flex; justify-content: space-between;">
              <q-input
                outlined
                label="تاریخ انجام"
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
                hint="برای انتخاب دکمه اینتر را بفشارید"
                @keyup.enter="selectDistributor"
                v-model="selectedDistributor.fullName"
                style="width: 49%" outlined label="موزع"
              />
              <q-input
                hint="برای انتخاب دکمه اینتر را بفشارید"
                v-if="model.label !== 'متفرقه'"
                @keyup.enter="selectDonor"
                v-model="selectedDonor.fullName"
                style="width: 49%" outlined label="خیر"
                :rules="[value => value.length > 0]"
                ref="selectedDonorInput"
              />
              <q-input
                hint="نام ارگان را تایپ کنید"
                v-else-if="model.label === 'متفرقه'"
                v-model="organizationName"
                style="width: 49%"
                outlined
                label="ارگان"
                :rules="[value => value.length > 0]"
                ref="organizationInput"
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
          <div class="text-h6">{{isDistributorToSelect ? 'انتخاب موزع' : 'انتخاب خیر'}}</div>
          <q-space />
          <q-btn color="white" class="bg-blue-grey-6" flat label="بستن" v-close-popup />
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

<!--        <q-card-actions align="right">-->
<!--          <q-btn-->
<!--            class="bg-blue-grey-6 q-mr-sm"-->
<!--            label="بستن"-->
<!--            color="white"-->
<!--            v-close-popup />-->
<!--        </q-card-actions>-->
      </q-card>
    </q-dialog>

    <add-donor @successAdd="$refs.donorsTable.reloadTable()" ref="addDonorDialog" />
    <edit-donor />

    <add-schedule-type ref="addScheduleTypeComponent" />

  </div>
</template>

<script>
  const jalaali = require('jalaali-js')
  import DistributorsTable from './DistributorsTable.vue'
  import DonorsTable from './DonorsTable.vue'
  import AddDonor from '../components/AddDonor.vue'
  import EditDonor from '../components/EditDonor.vue'
  import AddScheduleType from '../components/AddScheduleType.vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      DistributorsTable,
      DonorsTable,
      AddDonor,
      EditDonor,
      AddScheduleType
    },
    data() {
      return {
        isDistributorToSelect: true,
        showSelectDialog: false,
        organizationName: '',
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
        }
      }
    },
    computed: {
      ...mapGetters('scheduleTypes', ['scheduleTypes'])
    },
    methods: {
      show() {
        this.$refs.addAssignmentDialog.show()
      },
      hide() {
        this.$refs.addAssignmentDialog.hide()
      },
      addAssignment() {
        // TODO: Must be completed
        if (this.isFormValid()) {

        } else {
          const msg = 'ورودی‌ها به دقت بررسی شوند'
          const color = 'negative'
          const icon = 'error'
          this.showNotification(msg, color, icon)
        }
        console.log(this.model.value)
      },
      showNotification(msg, color, icon) {
        this.$q.notify({
          message: msg,
          color: color,
          icon: icon,
          textColor: 'white',
          timeout: 1000
        })
      },
      isFormValid() {
        if (this.model.label === 'متفرقه') {
          this.$refs.organizationInput.validate()
          return !this.$refs.organizationInput.hasError
        }
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
        this.organizationName = ''
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
    },
    updated() {
      this.assignmentToAdd.dueAt = this.getTodayDate()
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
