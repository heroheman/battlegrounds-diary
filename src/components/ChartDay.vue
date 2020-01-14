<template>
  <div>
    <b-row class="mb-3">
      <b-col cols="12" sm="6" md="4">
        <h3>Results by day</h3>
      </b-col>
      <b-col cols="6" sm="3" md="4">
      </b-col>
      <b-col cols="6" sm="3" md="4" class="text-md-right">
        <!-- <b-form-checkbox v-model="showTop1" switch>Top 1</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="showTop2" switch>Top 2</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="showTop3" switch>Top 3</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="showTop4" switch>Top 4</b-form-checkbox> -->

        <!-- <b-form-checkbox v-model="showTop5" switch>Top 5</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="showTop6" switch>Top 6</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="showTop7" switch>Top 7</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="showTop8" switch>Top 8</b-form-checkbox> -->

        <!-- <b-form-checkbox v-model="showWins" switch>Win</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="showLoses" switch>Lose</b-form-checkbox> -->

        <!-- <b-form-checkbox v-model="dataView" class="switch-box" @change="toggleData" switch>Toggle View</b-form-checkbox> -->
        <!-- <b-form-checkbox v-model="stacked" @change="updateKey" switch>Stacked</b-form-checkbox> -->

      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col cols="12">
        <div class="chart-outer">
          <ChartBar :key="key"
            class="chart-inner"
            :class="[ getSizeClass ]"
            @canvas='canvas = $event'
            :chartData="lineChartData"
            :options="lineChartOptions"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" sm="6" md="4" class="mb-2">
        <b-form-select :selected="lineMaxItems" id="amount" v-model="lineMaxItems">
          <option value="5">Last 5 days</option>
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
        </b-form-select>
        <b-form-text>If you have large amount of data, adjust the width and scroll/drag horizontally</b-form-text>
      </b-col>
      <b-col cols="6" sm="6" md="2" class="mb-4">
        <b-form-checkbox v-model="dataView" class="switch-box" @change="toggleData" switch>Toggle View</b-form-checkbox>
      </b-col>
      <b-col cols="6" sm="6" md="2" class="mb-2 text-md-right">
        <DownloadChartButton filename="placement-by-day" :canvas="canvas" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ChartBar from '@/components/chart-blueprints/Bar'
import DownloadChartButton from '@/components/DownloadChartButton'

export default {
  name: 'ChartDay',
  components: { ChartBar, DownloadChartButton },
  props: ['chartData', 'options'],
  data() {
    return ({
      key: 0,
      dataView: true,
      defaultWidth: 100,
      stacked: true,
      showTop1: true,
      showTop2: true,
      showTop3: true,
      showTop4: true,
      showTop5: true,
      showTop6: true,
      showTop7: true,
      showTop8: true,
      showLoses: false,
      showWins: false,
      showTotal: true,
      canvas: null,
      lineMaxItems: 10,
      showLabelsAtGraph: false,
    })
  },
  methods: {
    updateKey () {
      this.key += 1
    },
    toggleData(isPlacements = true) {
      if (isPlacements) {
        this.showTop1 = true
        this.showTop2 = true
        this.showTop3 = true
        this.showTop4 = true
        this.showTop5 = true
        this.showTop6 = true
        this.showTop7 = true
        this.showTop8 = true
        this.showWins = false
        this.showLoses = false
      } else {
        this.showTop1 = false
        this.showTop2 = false
        this.showTop3 = false
        this.showTop4 = false
        this.showTop5 = false
        this.showTop6 = false
        this.showTop7 = false
        this.showTop8 = false
        this.showWins = true
        this.showLoses = true
      }
      this.updateKey()
    },
    showPlaces() {
    }
  },
  computed: {
    ...mapState('history', [
      'results',
    ]),
    ...mapGetters('history', [
      'dayChartData',
    ]),
    getSizeClass () {
      return `w${this.defaultWidth}`
    },
    isStacked () {
      return this.stacked
    },
    lineChartOptions () {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          align: 'start'
        },
        scales: {
          xAxes: [{
            stacked: this.isStacked
          }],
          yAxes: [{
            stacked: this.isStacked
          }]
        }
      }
    },
    lineChartData () {
      return {
        labels: this.dayChartData(this.lineMaxItems).labels,
        datasets: [
          {
            label: 'Top 8',
            hidden: !this.showTop8,
            backgroundColor: '#ff4c4c',
            fill: !false,
            data: this.dayChartData(this.lineMaxItems).top8
          },
          {
            label: 'Top 7',
            hidden: !this.showTop7,
            backgroundColor: '#ff7f7f',
            fill: !false,
            data: this.dayChartData(this.lineMaxItems).top7
          },
          {
            label: 'Top 6',
            hidden: !this.showTop6,
            backgroundColor: '#ff9999',
            fill: !false,
            data: this.dayChartData(this.lineMaxItems).top6
          },
          {
            label: 'Top 5',
            hidden: !this.showTop5,
            backgroundColor: 'lightpink',
            fill: !false,
            data: this.dayChartData(this.lineMaxItems).top5
          },
          {
            label: 'Top 4',
            hidden: !this.showTop4,
            backgroundColor: '#84c184',
            fill: !false,
            data: this.dayChartData(this.lineMaxItems).top4
          },
          {
            label: 'Top 3',
            backgroundColor: '#5aad5a',
            hidden: !this.showTop3,
            fill: false,
            data: this.dayChartData(this.lineMaxItems).top3
          },
          {
            label: 'Top 2',
            backgroundColor: '#329932',
            hidden: !this.showTop2,
            fill: false,
            data: this.dayChartData(this.lineMaxItems).top2
          },
          {
            label: 'Top 1',
            backgroundColor: 'gold',
            hidden: !this.showTop1,
            fill: false,
            data: this.dayChartData(this.lineMaxItems).top1
          },
          {
            label: 'Lose',
            backgroundColor: 'red',
            hidden: !this.showLoses,
            fill: false,
            data: this.dayChartData(this.lineMaxItems).lose
          },
          {
            label: 'Win',
            backgroundColor: 'green',
            hidden: !this.showWins,
            fill: false,
            data: this.dayChartData(this.lineMaxItems).win
          },
        ]
      }
    }
  },
}
</script>

<style>
.switch-box {
  position: relative;
  top: 6px;
}

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
