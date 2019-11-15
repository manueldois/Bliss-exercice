<template>
  <div>
    <header>
      <span>Questions</span>
    </header>
    <main>
      <search-box v-model="search_query"></search-box>
      <!-- If there's no search query, show all loaded questions and the load more scroll trigger -->
      <template v-if="!search_query">
        <ul>
          <li v-for="question in all_questions" v-bind:key="question.key">
            <question-card v-bind:question="question"></question-card>
          </li>
        </ul>
        <div id="scroll-trigger"></div>
      </template>

      <!-- If there is a search query, show just the filtered questions and the share button -->
      <template v-if="search_query">
        <button id="btn-share" class="outline lg">Share results</button>
        <ul>
          <li v-for="question in filtered_questions" v-bind:key="question.key">
            <question-card v-bind:question="question"></question-card>
          </li>
        </ul>
      </template>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import SearchBox from "../components/SearchBox";
import QuestionCard from "../components/QuestionCard";
import ApiService from '../Api'

export default {
  name: "questions-page",
  components: {
    SearchBox,
    QuestionCard
  },
  data: function() {
    return {
      all_questions: [],
      filtered_questions: [],
      search_query: ""
    };
  },
  beforeCreate: function(){
  },
  watch: {
    search_query: async function(query) {
      const new_questions = await ApiService.fetchQuestions(10, 0, null);

      // Erase stored filtered questions
      this.filtered_questions = [];

      for (let question of new_questions) {
        // Assign a key to each question equal to its id (overlapped ids wont happen)
        question.key = question.id;
        // Push the new questions onto existing ones
        this.filtered_questions.push(question);
      }
    }
  },
  mounted: function() {
    // Enable loading more questions on scroll
    const scroll_trigger_observer = new IntersectionObserver(async entries => {
      // If the trigger is in view
      if (entries[0].isIntersecting) {
        const new_questions = await ApiService.fetchQuestions(10, 0, null);
        for (let question of new_questions) {
          // Assign a key to each question loaded since id's overlap
          question.key = this.all_questions.length + 1;
          // Push the new questions onto existing ones
          this.all_questions.push(question);
        }
      }
    });
    scroll_trigger_observer.observe(document.getElementById("scroll-trigger"));
  },
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
      > question-card {
        width: 100%;
      }
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