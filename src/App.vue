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
    // Check if app is online on start
    if (navigator.onLine) {
      // If online:
      // Always start the app in the loading screen
      // Push the loading screen onto the History
      // this.$router.push("/loading");
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
