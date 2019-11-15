<template>
  <div>
    <Header title="Share"></Header>
    <main>
      <br />
      <h1 v-if="type === 'question'">Share this question with</h1>
      <h1 v-if="type === 'list'">Share these search results with</h1>
      <label>
        <input type="email" placeholder="Email" v-model="destination_email" />
        <b v-if="email_invalid">Please enter a valid email</b>
      </label>
      <button
        @click="share"
        type="button"
        class="lg block"
        :class="{outline: !destination_email || email_invalid || sent_email}"
      >{{btn_send_txt}}</button>
    </main>
  </div>
</template>

<script>
import ApiService from "../Api";
import Header from "../components/Header";
export default {
  name: "share-page",
  components: {
    Header
  },
  props: {
    content_url: String,
    type: String
  },
  data: function() {
    return {
      destination_email: "",
      email_invalid: false,
      btn_send_txt: "Write an email address",
      sent_email: false
    };
  },
  watch: {
    destination_email: function(email) {
      if (!this.sentEmail) {
        this.email_invalid = !this.validateEmail(email);
        if (this.email_invalid) {
          this.btn_send_txt = "Write an email address";
        } else {
          this.btn_send_txt = "Send email";
        }
      }
    },
    sent_email: function(sent) {
      if (sent) {
        this.btn_send_txt = "Email sent";
      }
    }
  },
  methods: {
    // From stackoverflow
    validateEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    share: function() {
      if (!this.sent_email && this.validateEmail(this.destination_email)) {
        ApiService.shareUrl(this.destination_email, this.content_url);
        this.sent_email = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/../public/variables.scss";

main {
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    color: $col-text;
    text-align: center;
  }

  > label {
    margin-top: 50px;
    width: 100%;
    padding: 0 20px;

    > input {
      width: 100%;
      font-size: 1.1em;
      padding: 10px 20px;
      border: 2px solid lightgray;
      border-radius: 1e9px;
      // box-shadow: $shadow-sm;
      background-color: white;
      text-align: center;
    }

    > b {
      color: red;
      text-align: center;
      display: block;
      margin-top: 10px;
    }
  }
  > button {
    margin-top: auto;
  }
}
</style>