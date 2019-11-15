<template>
  <div>
    <Header title="Disconnected :("></Header>
    <main>
      <br> <br>
      <h1>Connection to the internet lost</h1>
      <!-- Dummy button, its automatic -->
      <button class="outline lg">Retry</button> 
    </main>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "no-connectivity-page",
  components: {
    Header
  },
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
@import "@/../public/variables.scss";

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $col-text-inverse;
  background-color: lighten($col-primary, 10%);
  padding: 10px 20px;

  text-align: center;

  > button {
    margin-top: 20px;
    color: inherit;
    border-color: $col-text-inverse;
  }
}
</style>