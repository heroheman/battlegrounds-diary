<template>
  <div>
    <div class="content-charts">
      <ChartMmr class="mb-5" />
      <b-row>
        <b-col sm="12" md="6" class="mb-5">
          <ChartHeroes />
        </b-col>
        <b-col sm="12" md="6" class="mb-5">
          <ChartTribes />
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
      <b-alert show>
        <small>
          <strong>Note for Desktop User:</strong>
          Right-click on chart to save as image
        </small>
      </b-alert>
    </div>
  </div>
</template>

<script>
import ChartMmr from '@/components/ChartMMR'
import ChartHeroes from '@/components/ChartHeroes'
import ChartTribes from '@/components/ChartTribes'
import ChartSummary from '@/components/ChartSummary'
import ChartGainsLose from '@/components/ChartGainsLose'
export default {
  name: 'ChartResults',
  components: { ChartMmr, ChartHeroes, ChartTribes, ChartSummary, ChartGainsLose },
}
</script>

<style>
</style>
