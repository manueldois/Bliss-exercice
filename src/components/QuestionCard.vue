<template>
  <div class="question-card">
    <router-link class="link" :to="`/questions/${question.id}`">
      <img :src="question.thumb_url" alt srcset />
      <div class="right">
        <p>{{question.question}}</p>
        <small>{{timeFromNow(question.published_at)}}</small>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "question-card",
  props: {
    question: Object
  },
  methods: {
    timeFromNow: function(pastDate) {
      try {
        return moment(pastDate).from(moment());
      } catch (error) {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/../public/variables.scss";

div.question-card {
  padding: 5px 15px 5px 5px;
  //   box-shadow: $shadow-sm;
  list-style-type: none;

  background-color: white;
  color: $col-text;
  border-radius: 4px;

  > .link {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;

    > img {
      width: 100px;
      height: 100px;
      flex: 0 0 auto;
      object-fit: contain;
    }

    > div.right {
      flex: 1 1 auto;
      min-width: 100px;
      margin-left: 20px;

      > p {
        padding: 0;
        margin: 0;
        text-align: right;
        font-size: 1.1em;
        font-weight: bold;
        color: $col-text;
      }

      > small {
        width: 100%;
        margin-top: 8px;
        display: block;
        text-align: right;
        color: $col-text;
      }
    }
  }
}
</style>