<template>
  <header>
    <b-navbar  toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand>Battlegrounds Diary</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Calculator</b-nav-item>
            <b-nav-item to="/history">History</b-nav-item>
          </b-navbar-nav>
        </b-collapse>

      </b-container>
    </b-navbar>
  </header>
</template>
