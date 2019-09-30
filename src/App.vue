<template>
  <div id="app">
    <el-container>
      <el-aside
        class="aside"
        width="200px"
      >
        <el-avatar
          class="avatar"
          size="large"
          src="https://avatars0.githubusercontent.com/u/20488904?s=460&v=4"
        ></el-avatar>
        <div>kyuchan</div>
      </el-aside>
      <el-main style="padding: 0;">
        <div class="app__header">Project</div>
        <div class="app__body">
          <el-card
            v-for="(project, index) in projects"
            v-bind:key="index"
            class="card"
            :body-style="{ padding: '0px', overflow: 'hidden' }"
            shadow="hover"
          >
            <div class="image" :style="`background-image: url(${project.imageSrc});`"></div>
            <div class="bottom">
              <span class="name">{{ project.projectName }}</span>
              <el-button class="button" type="primary" round size="mini" @click="onClick(project.homePageUrl)">GO</el-button>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      projects: [
        {
          imageSrc: "https://blog.kyuchan.cn/img/favicon_64.ico",
          projectName: "blog",
          homePageUrl: "http://blog.kyuchan.cn"
        },
        {
          imageSrc:
            "https://raw.githubusercontent.com/kyuch4n/royce-ui/master/assets/logo.png",
          projectName: "royce-ui",
          homePageUrl: "http://x.kyuchan.cn/royce-ui/"
        },
        {
          imageSrc:
            "https://raw.githubusercontent.com/kyuch4n/man-friday/master/src/assets/logo.png",
          projectName: "man-friday",
          homePageUrl: "https://github.com/kyuch4n/man-friday"
        }
      ]
    };
  },

  methods: {
    onClick(homePageUrl) {
      window.open(homePageUrl);
    }
  }
};
</script>

<style lang="less">
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
}

.aside {
  padding: 20px 0;
  min-height: 100vh;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #24292e;

  .avatar {
    width: 100px;
    height: 100px;
  }
}

.app__header {
  width: 100%;
  height: 250px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url("https://blog.kyuchan.cn/img/home-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  font-size: 80px;
  color: #fff;
  font-weight: 600;
}

.app__body {
  padding: 20px 0;
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
      background-size: 50%;
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
