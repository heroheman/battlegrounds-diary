<template>
  <div>
    <h3 class="h4">Average Gain/Lose per place</h3>
    <b-table-lite :items="averageGainLose"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ChartGainsLose',
  computed: {
    ...mapGetters('history', ['averageGainLose'])
  }
}
</script>
