<script>
import { Bar, mixins } from 'vue-chartjs'
// import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    // this.addPlugin(ChartJsPluginDataLabels);
    this.renderChart(this.chartData, this.options)
    this.$emit('canvas', this.$refs.canvas)
  },
}
</script>
