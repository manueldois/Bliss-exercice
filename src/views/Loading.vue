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
import store from "../store";
export default {
  name: "loading-page",

  data: function() {
    return {
      fetching: true,
      error: undefined
    };
  },

  created: function() {
    Promise.race([
      fetch(
        "https://private-anon-8c60d0d41b-blissrecruitmentapi.apiary-mock.com/health"
      ),
      new Promise((_, reject) => setTimeout(() => reject("timeout"), 10000)) // fetch timeout
    ])
      // .then(res => new Promise((resolve, _) => setTimeout(() => resolve(res), 1000))) // Wait at least 1000 so you can see the loading page
      .then(res => res.json())
      .then(body => {
        if (body.status === "OK") {
          this.$router.go(-1);
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