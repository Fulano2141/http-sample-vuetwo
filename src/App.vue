<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>HTTP</h1>
        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" v-model="user.username" />
        </div>
        <div class="form-group">
          <label>Mail</label>
          <input type="text" class="form-control" v-model="user.email" />
        </div>
        <button @click="submit" class="btn btn-primary">Submit</button>
        <hr />
        <input class="form-control" type="text" v-model="node" />
        <br /><br />
        <button class="btn btn-primary" @click="fetchData">Get Data</button>
        <br /><br />
        <ul class="list-group">
          <li class="list-group-item" v-for="u in users" :key="u.id">
            {{ u.username }} - {{ u.email }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    node: "data",
    user: {
      username: "",
      email: "",
    },
    users: [],
    url: "data.json",
    resource: {},
  }),
  methods: {
    submit() {
      // console.log(this.user);
      // RESOURCES VS. HTTP NORMAL
      //  THIS
      // this.$http.post(this.url, this.user).then(
      //   (response) => {
      //     console.log(response);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
      // OR THIS ARE THE SAME
      // this.resource.save({}, this.user);
      // =========================
      // With custom action
      this.resource.saveAlt(this.user);
    },
    fetchData() {
      // this.$http
      //   .get(this.url)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     // console.log(data);
      //     const resultArray = [];
      //     for (let key in data) {
      //       resultArray.push(data[key]);
      //     }
      //     this.users = resultArray;
      //   });
      // RESOURCES
      this.resource
        .getData({ node: this.node })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.users = resultArray;
        });
      // .catch((error) => {
      //   this.users = ["No Data" + error];
      // });
    },
  },
  created() {
    const customAction = {
      saveAlt: { method: "POST", url: "alternative.json" },
      getData: { method: "GET" },
    };
    // this.resource = this.$resource(this.url);
    // this.resource = this.$resource(this.url, {}, customAction);
    this.resource = this.$resource("{node}.json", {}, customAction);
  },
};
</script>

<style>
</style>