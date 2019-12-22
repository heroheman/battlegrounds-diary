<template>
  <div class="charts">
    <b-row>
      <b-col cols="4" class="text-right">
        <!-- <label for="amount">Amount</label> -->
        <b-form-select id="amount" v-model="lineMaxItems">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <ChartLine :chartData="lineChartData" :options="lineMmr.options" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartLine from '@/components/chart-blueprints/Line'

export default {
  name: 'ChartMMR',
  components: { ChartLine },
  data: () => ({
    lineMaxItems: 5,
    lineMmr: {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              display: false //this will remove only the label
            }
          }]
        }
      }
    }
  }),
  props: ['chartData', 'options'],
  computed: {
    ...mapGetters('history', [
      'mmrChartData',
      'mmrChartDataLabels'
    ]),
    lineChartData () {
      return {
        labels: this.mmrChartDataLabels(this.lineMaxItems),
        datasets: [
          {
            label: 'MMR',
            lineTension: 0,
            fill: false,
            showLine: true,
            borderColor: '#f87979',
            data: this.mmrChartData(this.lineMaxItems)
          }
        ]
      }
    }
  },
  mounted () {
  }
}
</script>
