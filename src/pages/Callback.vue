<template>
  <div>
    This is callback
  </div>
</template>

<script>
  import AuthService from '../services/AuthService'
  export default {
    data() {
      return {}
    },
    methods: {
    },
    mounted() {
      const mgr = new AuthService()
      mgr.signinRedirectCallback()
        .then(user => {
          if (user !== null) {
            localStorage.setItem('access_token', user.access_token)
            window.location.href = '/'
          } else {
            console.log('no user loggedin')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped>

</style>
