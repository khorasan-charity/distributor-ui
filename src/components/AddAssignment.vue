<template>
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
            <q-input outlined label="تاریخ انجام" style="width: 49%" v-model="assignmentToAdd.dueAt">
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
                      v-model="assignmentToAdd.dueAt"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input outlined label="تاریخ اتمام" style="width: 49%" v-model="assignmentToAdd.doneAt">
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
                      v-model="assignmentToAdd.doneAt"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <q-input v-model="assignmentToAdd.distributorId" style="width: 49%" outlined label="موزع" />
            <q-input
              v-if="model.value === 'forDonor'"
              v-model="assignmentToAdd.donorId" style="width: 49%" outlined label="خیر" />
            <q-input
              v-else-if="model.value === 'noDonor'"
              v-model="assignmentToAdd.donorId" style="width: 49%" outlined label="ارگان" />
          </div>
          <div style="margin-top: 10px;">
            <q-input v-model="assignmentToAdd.description" autogrow outlined label="توضیحات" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :disable="!model.value" @click="addAssignment" flat label="ایجاد ماموریت" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    data() {
      return {
        medium: false,
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
            label: 'نامرتبط با خیر',
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
      }
    }
  }
</script>

<style scoped>

</style>
