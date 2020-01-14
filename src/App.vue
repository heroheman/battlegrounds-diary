<template>
  <div>
    <Header></Header>
    <b-container class="main-container">
      <main>
        <router-view/>
      </main>
    </b-container>
    <Footer />
 </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: { Header, Footer }
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
