<template>
  <header>
    <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand tag="h1" to="/" title="Battlegrounds Diary">
          <unicon
            name="book-open"
            fill="currentColor"
            width="15" height="15" />
          Battlegrounds Diary
        </b-navbar-brand>

        <b-navbar-toggle label="Show Menu" target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/history">
              <unicon
                name="list-ul"
                fill="currentColor"
                width="15" height="15" />
              History
            </b-nav-item>
            <b-nav-item to="/calculator">
              <unicon
                name="calculator"
                fill="currentColor"
                width="15" height="15" />
              Stat Calculator
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/about">
              <unicon
                name="question-circle"
                fill="currentColor"
                width="15" height="15" />
              About
            </b-nav-item>
            <b-nav-item to="/settings">
              <unicon
                name="cog"
                fill="currentColor"
                width="15" height="15" />
              Settings
            </b-nav-item>
            <b-nav-text class="text-light">
              <strong>
                MMR:
              </strong>
              {{ mmr }}
            </b-nav-text>
          </b-navbar-nav>

        </b-collapse>

      </b-container>
    </b-navbar>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState('history', [
      'mmr'
    ])
  }
}
</script>

<style>
header {
  position: relative;
  margin-bottom: 5rem;
}
.nav-link .unicon {
  position: relative;
  top: -1px;
}
</style>
