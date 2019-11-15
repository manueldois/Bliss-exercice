<template>
  <div>
    <Header title="Question"></Header>
    <main>
      <figure>
        <img :src="question.image_url" alt="question image" />
      </figure>
      <h1>{{question.question}}</h1>
      <button @click="share" name="btn-share" class="outline">Share question</button>
      <form>
        <fieldset name="choices">
          <legend>Vote on a choice</legend>
          <label v-for="(choice, i) in question.choices" :key="i">
            <input type="radio" :value="i" v-model="picked" />
            <div class="ck-circle"></div>
            <b>{{choice.choice}}</b>
            <span>{{choice.votes}} votes</span>
          </label>
        </fieldset>
        <button
          @click="vote"
          type="button"
          name="btn-vote"
          class="block lg"
          :class="{outline: picked == null || voted != null}"
        >{{ getBtnVoteText() }}</button>
      </form>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import ApiService from "../Api";
import Header from "../components/Header";

export default {
  name: "detail-page",
  props: ["id"],
  components: {
    Header
  },
  data: function() {
    return {
      question: {},
      picked: null,
      voted: null
    };
  },
  beforeMount: async function() {
    this.question = await ApiService.fetchQuestion(this.id);
  },
  methods: {
    vote: function() {
      if (this.voted == null) {
        this.question.choices[this.picked].votes++;
        ApiService.putQuestion(this.question).then(res => {
          if (res.ok) {
            this.voted = this.picked;
          }
        });
      }
    },
    getBtnVoteText: function() {
      if (this.voted != null)
        return "Voted on " + this.question.choices[this.voted].choice;
      if (this.picked != null) {
        return "Vote on " + this.question.choices[this.picked].choice;
      } else {
        return "Pick an option to vote";
      }
    },
    share: function(){
      const content_url = this.$router.currentRoute.fullPath
      const type = "question"
      this.$router.push({path: '/share', query: {content_url, type}})
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/../public/variables.scss";
main {
  > figure {
    width: 100%;
    padding: 0;
    margin: 0;
    padding-top: calc(400 / 600 * 100%);
    position: relative;
    > img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  > h1 {
    text-align: center;
  }

  > button[name="btn-share"] {
    margin: auto;
    display: block;
  }

  > form {
    margin-top: 20px;
    padding: 0px 20px;

    > fieldset {
      padding: 0;
      border: none;

      > legend {
        text-align: center;
      }

      > label {
        display: flex;
        width: 100%;
        margin: 0;
        align-items: center;
        padding: 10px 5px;

        &:hover {
          background-color: $col-primary;
          > b {
            color: white;
          }

          > div.ck-circle {
            border-color: white;

            &::after {
              background-color: white;
            }
          }

          > span {
            filter: brightness(150%);
          }
        }

        > input {
          display: none;
          &:checked {
            & ~ div.ck-circle::after {
              visibility: visible;
            }
          }
        }

        > div.ck-circle {
          width: 20px;
          height: 20px;
          border: 2px solid $col-primary;
          border-radius: 100%;
          position: relative;

          &::after {
            position: absolute;
            visibility: hidden;
            content: "";
            width: 12px;
            height: 12px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 100%;
            background: $col-primary;
          }
        }

        > b {
          margin-left: 10px;
          font-size: 1.1em;
        }

        > span {
          margin-left: auto;
          color: $col-secondary;
        }
      }
    }

    > button[name="btn-vote"] {
      margin: 30px 0 10px 0;
    }
  }
}
</style>