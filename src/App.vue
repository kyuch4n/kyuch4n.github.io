<template>
  <div id="app">
    <div class="app__header">
      Pr<span style="font-size: 60px;">⚙️</span>ject
      <el-avatar class="avatar" src="https://avatars0.githubusercontent.com/u/20488904?s=460&v=4" @click.native="onClick('https://github.com/kyuch4n')"></el-avatar>
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
      projects: [],
    };
  },

  beforeCreate() {
    fetch("https://api.jsonbin.io/b/5e2717ef8d761771cc94f795")
      .then(res => res.json())
      .then(({ data }) => this.projects = data)
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
  position: relative;
  width: 100%;
  height: 40vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url("https://blog.kyuchan.cn/img/home-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  font-size: 80px;
  color: #fff;
  font-weight: 600;

  .avatar {
    position: absolute;
    top: 16px;
    right: 16px;

    width: 40px;
    height: 40px;
    cursor: pointer;
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
