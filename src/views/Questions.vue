<template>
  <div>
    <Header title="Questions"></Header>
    <main>
      <search-box v-model="search_query"></search-box>
      <!-- If there's no search query, show all loaded questions and the load more scroll trigger -->
      <template v-if="!search_query">
        <ul>
          <li v-for="question in all_questions" v-bind:key="question.key">
            <question-card v-bind:question="question"></question-card>
          </li>
        </ul>
      </template>

      <!-- If there is a search query, show just the filtered questions and the share button -->
      <template v-if="search_query">
        <button @click="share" id="btn-share" class="outline lg">Share results</button>
        <ul>
          <li v-for="question in filtered_questions" v-bind:key="question.key">
            <question-card v-bind:question="question"></question-card>
          </li>
        </ul>
      </template>

      <div id="scroll-trigger"></div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import SearchBox from "../components/SearchBox";
import QuestionCard from "../components/QuestionCard";
import Header from "../components/Header";

import ApiService from "../Api";
import { async } from "q";

export default {
  name: "questions-page",
  components: {
    SearchBox,
    QuestionCard,
    Header
  },
  data: function() {
    return {
      all_questions: [],
      filtered_questions: [],
      search_query: ""
    };
  },
  watch: {
    search_query: async function(query) {
      await this.loadFilteredQuestions(query);
    }
  },
  methods: {
    loadMoreQuestions: async function() {
      console.log("Loading more questions");
      const offset = this.all_questions.length + 10;
      const new_questions = await ApiService.fetchQuestions(10, offset, null);
      for (let question of new_questions) {
        // Assign a key to each question loaded since id's overlap
        question.key = this.all_questions.length + 1;
        // Push the new questions onto existing ones
        this.all_questions.push(question);
      }
    },
    loadFilteredQuestions: async function(query) {
      const new_questions = await ApiService.fetchQuestions(10, 0, query);

      // Erase stored filtered questions
      this.filtered_questions = [];

      for (let question of new_questions) {
        question.key = Math.random();
        // Push the new questions onto existing ones
        this.filtered_questions.push(question);
      }
    },
    share: function() {
      const content_url = this.$router.currentRoute.fullPath;
      const type = "list";
      this.$router.push({ path: "/share", query: { content_url, type } });
    }
  },
  beforeMount: function() {
    const question_filter = this.$router.currentRoute.query["question_filter"];
    if (question_filter) this.search_query = question_filter;
  },
  mounted: function() {
    // Enable loading more questions on scroll
    const scroll_trigger_observer = new IntersectionObserver(async entries => {
      // If the trigger is in view, and we are not on query mode
      if (entries[0].isIntersecting && !this.search_query) {
        this.loadMoreQuestions();
      }
    });
    scroll_trigger_observer.observe(document.getElementById("scroll-trigger"));
  }
};
</script>

<style scoped lang="scss">
@import "@/../public/variables.scss";

main {
  > ul {
    padding: 0;
    > li {
      margin: 2px 0;
      list-style-type: none;
      border-bottom: 1px solid gray;
    }
  }

  div#scroll-trigger {
    height: 30px;
  }

  button#btn-share {
    display: block;
    margin: auto;
    margin-top: 15px;
  }
}
</style>