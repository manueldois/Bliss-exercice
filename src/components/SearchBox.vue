<template>
  <label>
    <input
      v-bind:value="value"
      v-on:input="$emit('change', $event.target.value)"
      type="text"
      placeholder="Search..."
    />
    <button name="back" @click="$emit('change', '')">
      <svg
        name="back"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 240.823 240.823"
        style="enable-background:new 0 0 240.823 240.823;"
        xml:space="preserve"
      >
        <path
          d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
		l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
		C52.942,116.507,52.942,124.327,57.633,129.007z"
        />
      </svg>
    </button>
    <svg
      name="search"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 451 451"
      style="enable-background:new 0 0 451 451;"
      xml:space="preserve"
    >
      <path
        d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3
		s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4
		C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3
		s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"
      />
    </svg>
  </label>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: String
  },
  name: "search-box"
};
</script>

<style scoped lang="scss">
@import "@/../public/variables.scss";
label {
  display: block;
  position: relative;
  width: 100%;
  background-color: white;
  // border-radius: 4px;
  box-shadow: $shadow-sm;
  padding: 10px 10px;
  border: none;
  display: flex;
  align-items: center;

  > input {
    order: 2;
    font-size: 1.1em;
    padding: 0px 6px;
    border: none;
    background: none;
    flex: 1 1 100%;
    
    &:not(:placeholder-shown) {
      & ~ button[name="back"] {
        display: block;
      }
    }
  }

  > button[name="back"] {
    order: 1;
    display: none;
    border: none;
    background: none;
    padding: 0;
    flex: 0 0 20px;
    height: 100%;
  }

  svg {
    fill: $col-text;
    flex: 0 0 20px;

    &[name="search"] {
      order: 3;
    }
  }
}
</style>