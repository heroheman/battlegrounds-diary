<template>
  <div class="charts mb-4">
    <b-row>
      <b-col cols="4" sm="6" md="6">
        <h3>MMR</h3>
      </b-col>
      <b-col cols="6" sm="5" md="5" class="text-right">
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
      <b-col cols="2" sm="1" md="1">
        <b-button  title="Show label at points"
          size="md" variant="outline-dark" @click="toggleGraphLabels()">
          <unicon name="info-circle" fill="#888" width="15" height="15" />
        </b-button>
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
    showLabelsAtGraph: false,
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
          }],
          yAxes: [{
            ticks: {
              stepSize: 50
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
                  display: this.showLabelsAtGraph,
                  anchor: 'end',
                  align: 'end',
                  clamp: true,
                  backgroundColor: '#f87979',
                  borderRadius: 4,
                  color: '#fff'
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
  methods: {
    toggleGraphLabels: function () {
      this.showLabelsAtGraph = !this.showLabelsAtGraph
    }
  },
  mounted () {
    console.log(this.mmrChartData(this.lineMaxItems))
  }
}
</script>
