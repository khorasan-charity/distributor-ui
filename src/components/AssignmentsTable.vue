<template>
  <div>
    {{result}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        result: []
      }
    },
    methods: {
      showForTemp() {
        this.$axios.get('/Schedule?page=1&&take=10')
          .then(res => this.result = res.data.result.items)
          .catch(err => this.result = err.message)
      }
    },
    created() {
      this.showForTemp()
    }
  }
</script>

<style scoped>

</style>
