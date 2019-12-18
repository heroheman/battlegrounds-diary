<template>
  <b-card header="Your journey">
    <b-table :items="results">
    </b-table>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "TableResults",
  computed: {
    ...mapState('history', [
      'results'
    ]),
  },
}
</script>
