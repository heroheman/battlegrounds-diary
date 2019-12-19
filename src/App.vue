<template>
  <div>
    <Header class="mb-4"></Header>
    <b-container class="main-container">
      <main>
        <router-view/>
      </main>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: { Header }
}
</script>

<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@media (max-width: 768px) {
  .main-container {
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
