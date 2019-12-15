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
          <div style="margin-bottom: 10px">
            <q-select outlined v-model="model" :options="options" label="نوع ماموریت" />
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
                v-if="model.value === 'forDonor'"
                @keyup.enter="selectDonor"
                v-model="selectedDonor.fullName"
                style="width: 49%" outlined label="خیر"
              />
              <q-input
                hint="نام ارگان را تایپ کنید"
                v-else-if="model.value === 'noDonor'"
                v-model="organizationName"
                style="width: 49%"
                outlined
                label="ارگان"
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
                flat
                color="primary"
                class="q-mt-md"
                label="خیر جدید"
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

  </div>
</template>

<script>
  import DistributorsTable from "./DistributorsTable.vue"
  import DonorsTable from "./DonorsTable.vue"
  import AddDonor from '../components/AddDonor.vue'
  export default {
    components: {
      DistributorsTable,
      DonorsTable,
      AddDonor
    },
    data() {
      return {
        isDistributorToSelect: true,
        showSelectDialog: false,
        organizationName: '',
        selectedDistributor: {
          fullName: ''
        },
        selectedDonor: {
          fullName: ''
        },
        model: {
          label: 'هیچ کدام',
          value: ''
        },
        options: [
          {
            label: 'هیچ کدام',
            value: ''
          },
          {
            label: 'مرتبط با خیر',
            value: 'forDonor'
          },
          {
            label: 'متفرقه',
            value: 'noDonor'
          }
        ],
        assignmentToAdd: {
          distributorId: '',
          donorId: '',
          dueAt: '',
          doneAt: '',
          description: ''
        }
      }
    },
    methods: {
      show() {
        this.$refs.addAssignmentDialog.show()
      },
      hide() {
        this.$refs.addAssignmentDialog.hide()
      },
      addAssignment() {
        console.log(this.model.value)
      },
      resetForm() {
        this.assignmentToAdd = {
          distributorId: '',
          donorId: '',
          dueAt: '',
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
          fullName: ''
        }
        this.organizationName = ''
      },
      selectDistributor() {
        this.showSelectDialog = true
        this.isDistributorToSelect = true
        // TODO: at keyup => dialog with distributors table and select distributor
      },
      selectDonor() {
        this.showSelectDialog = true
        this.isDistributorToSelect = false
        // TODO: at keyup => dialog with donors table and select donor
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
