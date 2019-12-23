<template>
  <div class="charts mb-4">
    <b-row>
      <b-col cols="6" sm="8" md="8">
        <h3>MMR</h3>
      </b-col>
      <b-col cols="6" sm="4" md="4" class="text-right">
        <!-- <label for="amount">Amount</label> -->
        <b-form-select id="amount" v-model="lineMaxItems">
          <option value="5">Last 5 games</option>
          <option value="10">Last 10 games</option>
          <option value="25">Last 25 games</option>
          <option value="50">Last 50 games</option>
          <option value="100">Last 100 games</option>
          <option value="0">All</option>
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
import { mapState, mapGetters } from 'vuex'
import ChartLine from '@/components/chart-blueprints/Line'

export default {
  name: 'ChartMMR',
  components: { ChartLine },
  props: ['chartData', 'options'],
  data: () => ({
    lineMaxItems: 10,
    lineMmr: {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 10
        },
        legend: {
          display: false
        },
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
  computed: {
    ...mapState('history', [
      'results',
    ]),
    ...mapGetters('history', [
      'mmrChartData',
    ]),
    lineChartData () {
      return {
        labels: this.mmrChartData(this.lineMaxItems).labels,
        datasets: [
          {
            datalabels: {
              labels: {
                value: {
                  display: 'auto',
                  anchor: 'end',
                  align: 'center',
                  clamp: true,
                  backgroundColor: '#f2f2f2',
                  borderRadius: 4,
                  color: '#000'
                }
              }
            },
            label: 'MMR',
            fill: false,
            showLine: true,
            borderColor: '#f87979',
            data: this.mmrChartData(this.lineMaxItems).data
          }
        ]
      }
    }
  },
  mounted () {
    console.log(this.mmrChartData(this.lineMaxItems))
  }
}
</script>
