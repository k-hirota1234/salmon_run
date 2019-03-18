/* eslint no-console: 0 */
// import Vue from 'vue'

import Vue from "vue/dist/vue.esm";
import axios from "axios";

var app = new Vue({
  el: "#salmon",

  data () {
    return {
      isOpen: false,
      openingEvent: {},
      events: [],
      weapons: [],
      stages: [],
      selectedWeapon: "",
      selectedStage: "",
    };
  },
  mounted () {
    axios.get("/api/events/open").then((res) => {
      this.isOpen = res.data.data.is_open;
      if (this.isOpen)
        this.openingEvent = res.data.data.event;
    });

    axios.post("/graphql", {
      query: `{
        events{
          id
          startAt
          endAt
          hours
          stage { name }
          eventsWeapons { weapon{ name imageUrl } }
        }
      }`,
      variables: null
    }).then((res) => {
      this.events = res.data.data.events;
    });

    axios.get("/api/weapons").then((res) => {
      this.weapons = res.data.data;
    });

    axios.get("/api/stages").then((res) => {
      this.stages = res.data.data;
    });
  },
  methods: {
    eventSearch () {
      axios.get("/api/events", {
        params: {
          weapons: this.selectedWeapon,
          stages: this.selectedStage,
        }
      }).then((res) => {
        this.events = res.data.data;
      });
    }
  }
});
