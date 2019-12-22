<template>
  <div>
    <p>
      <small>
        <strong>Note:</strong>
        Right-click on chart to save as image
      </small>
    </p>
    <ChartMmr class="mb-5" />
    <b-row>
      <b-col sm="12" md="6">
        <ChartHeroes />
      </b-col>
      <b-col sm="12" md="6">
        <ChartTribes />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ChartMmr from '@/components/ChartMMR'
import ChartHeroes from '@/components/ChartHeroes'
import ChartTribes from '@/components/ChartTribes'
export default {
  name: 'ChartResults',
  components: { ChartMmr, ChartHeroes, ChartTribes },
}
</script>

<style>
</style>
