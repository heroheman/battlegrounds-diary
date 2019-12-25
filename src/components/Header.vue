<template>
  <header>
    <b-navbar  toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand>
          Battlegrounds Diary
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/history">History</b-nav-item>
            <b-nav-item to="/calculator">Stat Calculator</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item to="/changelog">Changelog</b-nav-item>
            <b-nav-item to="/settings">
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
