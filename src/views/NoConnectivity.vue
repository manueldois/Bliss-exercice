<template>
  <div>
    <h1>No connectivity page</h1>
  </div>
</template>

<script>
export default {
  name: "no-connectivity-page",
  created: function() {
    // Add event listener to react to going online
    window.addEventListener("online", () => {
      console.log("user online");
      this.$router.go(-1);
    });
  }
};
</script>

<style scoped lang="scss">
</style>