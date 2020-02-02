<template>
  <div id="app">
    <div class="app__header">
      <el-avatar class="avatar" src="https://avatars1.githubusercontent.com/u/20488904" @click.native="onClick('https://github.com/kyuch4n')"></el-avatar>
      <el-input class="search-input" size="small" v-model="input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div class="app__body">
      <el-card v-for="(project, index) in projects" v-bind:key="index" class="card" :body-style="{ padding: '0px', overflow: 'hidden' }" shadow="hover">
        <div class="image" :style="`background-image: url(${project.imageSrc}); background-size: ${project.bgSize ? project.bgSize : '80%'};`"></div>
        <div class="bottom">
          <span class="name">{{ project.projectName }}</span>
          <el-button class="button" type="primary" round size="mini" @click="onClick(project.homePageUrl)">GO</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      input: "",
      projects: [],
    };
  },

  beforeCreate() {
    fetch("https://api.myjson.com/bins/p9nkm")
      .then(res => res.json())
      .then((res) => this.projects = res)
  },

  methods: {
    onClick(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  user-select: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
}

.app__header {
  padding: 0 12px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  font-size: 14px;
  font-weight: 600;
  color: #fff;

  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.01), 0 3px 6px 3px rgba(0,0,0,.01), 0 2px 6px 0 rgba(0,0,0,.03);

  .avatar {
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  .search-input {
    width: 200px;
  }
}

.app__body {
  margin: 0 auto;
  padding: 20px 0;
  max-width: 960px;

  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  grid-column-gap: 5%;
  grid-row-gap: 24px;
  justify-content: center;

  .card {
    width: 100%;

    .image {
      margin: 8px;
      padding-bottom: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fff;
    }

    .bottom {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        flex: 1;
        font-weight: 600;
      }
    }
  }
}
</style>
