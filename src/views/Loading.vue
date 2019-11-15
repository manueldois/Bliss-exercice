<template>
  <div>
    <main>
      <br> <br>
      <h1>Loading</h1>
      <template v-if="fetching">
        <h2>Contacting server...</h2>
        <Spinner></Spinner>
      </template>

      <b v-if="error">{{error}}</b>
    </main>
  </div>
</template>

<script>
import ApiService from "../Api";
import Spinner from "../components/Spinner";
export default {
  name: "loading-page",
  components: {
    Spinner
  },

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
@import "@/../public/variables.scss";

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $col-text-inverse;
  background-color: lighten($col-primary, 10%);
  height: 100vh;
  b {
    color: red;
    font-size: 1.1em;
  }

  div.loader {
    --color1: $col-text-inverse;
    --color2: #{lighten($col-primary, 10%)};
  }
}
</style>