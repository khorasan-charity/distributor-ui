<template>
  <q-dialog ref="addAssignmentDialog">
    <q-card style="width: 60%;">
      <q-card-section class="row">
        <div class="text-h6">ماموریت جدید</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        پر خواهد شد
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="ایجاد ماموریت" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      show() {
        this.$refs.addAssignmentDialog.show()
      },
      hide() {
        this.$refs.addAssignmentDialog.hide()
      }
    }
  }
</script>

<style scoped>

</style>
