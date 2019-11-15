<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {};
  },
  created: function() {
    // Vue router does not differentiate routes on query params alone,
    // When the app is created, check if there's a question_id in the query
    // If yes, take that id and navigate to '/questions/:id'
    const url_query = this.$router.currentRoute.query;
    const question_id = url_query.question_id;
    if (question_id) this.$router.push(`/questions/${question_id}`);

    // Check if app is online on start
    if (navigator.onLine) {
      // If online:
      // Always start the app in the loading screen
      // Push the loading screen onto the History
      this.$router.push("/loading");
    } else {
      // If offline, show no connecitity page
      // Push the no connectivity screen onto the History
      this.$router.push("/no-connectivity");
    }

    // Add event listener to react to going offline
    window.addEventListener("offline", () => {
      this.$router.push("/no-connectivity");
    });
  }
};
</script>

<style lang="scss">
@import "../public/global.scss";
</style>
