<template>
  <div class="charts mb-4">
    <b-card>
      <b-row class="mb-3">
        <b-col cols="6" sm="6" md="6">
          <h3>Ranking</h3>
        </b-col>
        <b-col cols="4" sm="5" md="5" class="text-right">
        </b-col>
        <b-col cols="2" sm="1" md="1">
          <b-button  title="Show label at points"
                     size="md" variant="outline-dark" @click="toggleGraphLabels()">
            <unicon name="info-circle" fill="#888" width="15" height="15" />
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col>
          <div class="chart-outer">
            <ChartLine class="chart-inner"
                       :class="[ getSizeClass ]"
                       @canvas='canvas = $event'
                       :chartData="lineChartData"
                       :options="lineMmr.options"
                       />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="6" md="4" class="mb-2">
          <!-- <label for="amount">Amount</label> -->
          <b-form-select :selected="lineMaxItems" id="amount" v-model="lineMaxItems">
            <option value="5">Last 5</option>
            <option value="10">Last 10</option>
            <option value="25">Last 25</option>
            <option value="50">Last 50</option>
            <option value="100">Last 100</option>
            <option value="0">All</option>
          </b-form-select>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="mb-2">
          <b-form-select :selected="defaultWidth" id="width" v-model="defaultWidth">
            <option value="100">Width: 1x</option>
            <option value="150">Width: 1.5x</option>
            <option value="200">Width: 2x</option>
            <option value="300">Width: 3x</option>
            <option value="400">Width: 4x</option>
            <option value="500">Width: 5x</option>
            <option value="1000">Width: 10x</option>
          </b-form-select>
          <b-form-text>If you have large amount of data, adjust the width and scroll/drag horizontally</b-form-text>
        </b-col>
        <b-col cols="12" sm="6" md="4" class="mb-2 text-md-right">
          <DownloadChartButton filename="mmr" :canvas="canvas" />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ChartLine from '@/components/chart-blueprints/Line'
import DownloadChartButton from '@/components/DownloadChartButton'

export default {
  name: 'ChartMMR',
  components: { ChartLine, DownloadChartButton },
  props: ['chartData', 'options'],
  data: () => ({
    canvas: null,
    lineMaxItems: 25,
    defaultWidth: 100,
    showLabelsAtGraph: false,
    lineMmr: {
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
    getSizeClass () {
      return `w${this.defaultWidth}`
    },
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
  }
}
</script>

<style>
.chart-outer {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.chart-inner {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
}

.w100 { width: 100%; }
.w150 { width: 150%; }
.w200 { width: 200%; }
.w300 { width: 300%; }
.w400 { width: 400%; }
</style>
