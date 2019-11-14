<template>
  <div>
    <header>
      <span>Questions</span>
    </header>
    <main>
      <search-box v-model="search_query"></search-box>
      <ul>
        <li v-for="question in questions" v-bind:key="Math.random()">
          <img :src="question.thumb_url" alt srcset />
          <div class="right">
            <p>{{question.question}}</p>
            <small>{{timeFromNow(question.published_at)}}</small>
          </div>
        </li>
      </ul>
      <div id="scroll-trigger"></div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import moment from "moment";
import SearchBox from "../components/SearchBox";

export default {
  name: "questions-page",
  components: {
    SearchBox
  },
  data: function() {
    return {
      questions: [],
      search_query: "d"
    };
  },
  mounted: function() {
    const scroll_trigger_observer = new IntersectionObserver(entries => {
      // console.log(entries);
      if (entries[0].isIntersecting) {
        console.log("Loading 10 questions");
        this.fetchQuestions(10, 0, null);
      }
    });
    scroll_trigger_observer.observe(document.getElementById("scroll-trigger"));
  },
  methods: {
    fetchQuestions: function(limit, offset, filter) {
      fetch(
        `https://private-anon-d1ec5b723b-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}&filter=${filter}`
      )
        .then(res => {
          if (!res.ok) {
            throw res.error();
          }
          return res.json();
        })
        .then(body => {
          this.questions.push(...body);
        })
        .catch(() => {
          this.$router.push("/loading");
        });
    },
    timeFromNow: function(pastDate) {
      try {
        return moment(pastDate).from(moment());
      } catch (error) {
        return "";
      }
    }
  },
  watch: {
    search_query: function(val) {}
  }
};
</script>

<style scoped lang="scss">
@import "@/../public/variables.scss";

main {
  > ul {
    padding: 0;
    > li {
      margin: 8px 0;
      padding: 5px 15px 5px 5px;
      box-shadow: $shadow-sm;
      list-style-type: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      color: $col-text;
      border-radius: 4px;

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
        }

        > small {
          width: 100%;
          margin-top: 8px;
          display: block;
          text-align: right;
        }
      }
    }
  }

  > div#scroll-trigger {
    height: 30px;
  }
}
</style>