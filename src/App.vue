<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Loading</router-link>|
      <router-link to="/questions">List</router-link>|
      <router-link to="/share">Share</router-link>
    </div>
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
      // Always start the app in the loading screen
      // Push the loading screen onto the History
      // When the loading is complete, the loading component will pop itself
      this.$router.push("/loading");
    } else {
      // If offline, show no connecitity page
      this.$router.push("/no-connectivity");
    }

    // Add event listener to react to going offline
    window.addEventListener("offline", () => {
      console.log("user offline");
      this.$router.push("/no-connectivity");
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
