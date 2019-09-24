<template>
<div id="app" style="">

  <div class="app-header">
    <Header></Header>
  </div>
  <div v-if="loggedIn">
    <div class="app-container">

      <div v-if="!isGuest && issidebar" class="app-sidebar">
        <Sidebar ></Sidebar>
      </div>
      <div class="app-dashboard">
        <router-view />
      </div>
    </div>
    <button @click="openSideBar"
      :style="{left:leftPosition+'em' }"
      class="button sidebar-button is-info"
      >
    {{menuText}}
  </button>
    </div>
    <div v-else style="background:url('@/../static/login.jpeg') no-repeat; background-size:cover;width:100%;color:grey;">
      <!--<div class="level-item"> <div style="background:url(@/../static/login.jpeg) no-repeat;background-size:cover;height:100vh;">
    </div>     <img src="@/../static/login.jpeg" alt="">
  </div>
-->   <div class="is-pulled-right"><Login/></div>
  </div>
  <div class="app-foot">
    <Footr></Footr>
  </div>
</div>
</template>
<script>

import Login from '@/components/login/login'
import Header from '@/components/common/header'
import Sidebar from '@/components/dashboard/sidebar'
import Footr from '@/components/common/foot'
export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footr,
    Login
  },
  data(){
    return {
      menuText: "<",
      issidebar: true,
      leftPosition: 14
    }
  },
  computed:{
    loggedIn(){
      console.log(`****${this.$store.getters['loginStore/isLoggedIn']}****`);
      return this.$store.getters['loginStore/isLoggedIn']
    },
    isGuest(){ return this.$store.getters['loginStore/isGuest']}
  },
    methods: {
      openSideBar() {
      if (!this.issidebar) {
        this.issidebar = true;
        this.menuText = "<";
        this.leftPosition = 14;
      } else {
        this.menuText = ">";
        this.issidebar=false
        this.leftPosition=0
      }
    }
  }
}
</script>
<style>
* {
}
html,
body {
  margin: 0px;
  min-height: 100vh;
}
#app {
  display: flex;
  flex-direction: column;
}
.sidebar-button {
  position:fixed;
  left:0;
  top:50%;
  width:20px;
  height: 80px;
  opacity: 0.7;
}
.sidebar-button:hover{
  opacity:1;
   height:80px;
}
.app-container {
  background-color: rgb(170, 180, 180);
  color: rgb(0, 0, 0);
  border: 1px solid lightgray;
  width: 100%;
  display: flex;
  flex: 1;
}
.app-header {
  background-color: #224a5d;
  padding: 0.4em;
}

.app-dashboard {
  /* background-color: rgb(187, 184, 141);
  height: 100%; */
  width: 100%;
  min-height: 100vh;
}
.app-foot {
  background-color: #224a5d;
  font-size: 100%;
  color: white;
  padding: 0.4em;
}
.app-sidebar {
  background: #224a5e;
  color: white;
  overflow-y: auto;
  word-wrap: wrap;
  flex: 0 0 14em;
}

.app-sidebar p,
.app-sidebar a {
  font-size: 100%;
  color: white;
}
@media (max-width: 750px) {
  .sidebar-button{

    display: none;
  }
  .app-container {
    flex-direction: column;
    flex: 1;
  }
}
/*
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 80%;
  margin: 0 auto;
  margin-top: 2em;
  padding: 1em;
  border: 1px solid lightgray;
}
/*
  #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      margin-top: 60px;
    }*/
</style>
