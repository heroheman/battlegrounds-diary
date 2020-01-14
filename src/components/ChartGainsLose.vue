<template>
  <div>
    <b-card title="Average Gain/Lose per place">
      <b-table small :items="averageGainLose"/>
    </b-card>
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
