<template>
  <div>
    <h1>Loading page</h1>
    <div v-if="fetching">
      <span>Contacting server...</span>
    </div>
    <div v-if="error">
      <b>{{error}}</b>
    </div>
  </div>
</template>

<script>
import ApiService from '../Api'
export default {
  name: "loading-page",

  data: function() {
    return {
      fetching: true,
      error: undefined
    };
  },

  created: function() {
      ApiService.checkHealth()
      .then(isHealthy => {
        if (isHealthy) {
          this.$router.go(-1); // Go back to whereever we were
        } else {
          this.fetching = false;
          this.error = "Server is down, try again later";
        }
      })
      .catch(reason => {
        this.fetching = false;

        if (reason === "timeout") {
          this.error = "Request timeout, try again later";
        } else {
          this.error = "Server is down, try again later";
        }
      });
  }
};
</script>

<style scoped lang="scss">
b {
  color: red;
}
</style>