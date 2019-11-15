<template>
  <header>
    <button @click="goBack" v-if="canGoBack">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 240.823 240.823"
        style="enable-background:new 0 0 240.823 240.823;"
        xml:space="preserve"
      >
        <g>
          <path
            id="Chevron_Right"
            d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
		l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
		C52.942,116.507,52.942,124.327,57.633,129.007z"
          />
          <g />
        </g>
      </svg>
    </button>

    <span>{{title}}</span>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  },
  computed: {
      canGoBack: function(){
          return true
      }
  }
};
</script>

<style scoped lang="scss">
@import "@/../public/variables.scss";
header {
  width: 100%;
  padding: 10px;

  background-color: $col-primary;
  display: flex;
  align-items: center;

  > button {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    width: 20px;
    height: 100%;

    > svg {
      width: 100%;
      fill: $col-text-inverse;
    }
  }

  > span {
    font-size: 1.3em;
    color: $col-text-inverse;
    margin-left: auto;
  }
}
</style>