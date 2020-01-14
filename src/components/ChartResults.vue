<template>
  <div>
    <div class="content-charts">
      <b-row>
        <b-col>
          <TableStatsGlobal class="mb-3" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <ChartMmr class="mb-5" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <ChartDay class="mb-5" />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" class="mb-5">
          <ChartHeroes />
        </b-col>
        <b-col sm="12" md="6" class="mb-5">
          <ChartTribes />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TableLeaderboard class="mb-5" />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" class="mb-5">
          <ChartSummary />
        </b-col>
        <b-col sm="12" md="6" class="mb-5">
          <ChartGainsLose />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import ChartMmr from '@/components/ChartMMR'
import ChartDay from '@/components/ChartDay'
import ChartHeroes from '@/components/ChartHeroes'
import ChartTribes from '@/components/ChartTribes'
import ChartSummary from '@/components/ChartSummary'
import ChartGainsLose from '@/components/ChartGainsLose'
import TableLeaderboard from '@/components/TableLeaderboard'
import TableStatsGlobal from '@/components/TableStatsGlobal'

export default {
  name: 'ChartResults',
  components: {
    ChartMmr,
    ChartDay,
    ChartHeroes,
    ChartTribes,
    ChartSummary,
    ChartGainsLose,
    TableLeaderboard,
    TableStatsGlobal
  },
}
</script>

<style>
</style>
