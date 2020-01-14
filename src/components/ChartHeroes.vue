<template>
  <div class="charts">
    <b-card>
      <h3 class="h4 position-absolute">Games by Hero</h3>
      <b-tabs pills lazy align="right">
        <b-tab title="Pie">
          <template v-slot:title>
            <unicon class="tab-icon" name="chart-pie-alt" fill="currentColor" width="18" height="18" />
          </template>
          <ChartDoughnut @canvas='canvas = $event' :chartData="pieChartData" :options="pieHeroes.options" />
          <DownloadChartButton filename="heroes" :canvas="canvas" />
        </b-tab>
        <b-tab title="List">
          <template v-slot:title>
            <unicon class="tab-icon" name="list-ul" fill="currentColor" width="18" height="18" />
          </template>
          <b-table
            small :items="heroesChartDataTable"
            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"></b-table>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartDoughnut from '@/components/chart-blueprints/Doughnut'
import DownloadChartButton from '@/components/DownloadChartButton'
import { getRandomColorArray } from '@/helper'

export default {
  props: ['chartData', 'options'],
  components: { ChartDoughnut, DownloadChartButton },
  data: () => ({
    sortDesc: true,
    sortBy: 'games',
    canvas: null,
    pieHeroes: {
      options: {
        layout: {
          padding: 30
        },
        legend: {
          display: false
        },
      },
    }
  }),
  computed: {
    ...mapGetters('history', [
      'results',
      'heroesChartData',
      'heroesChartDataTable',
    ]),
    pieChartData () {
      return {
        labels: this.heroesChartData.labels,
        datasets: [
          {
            datalabels: {
              formatter: function(value, context) {
                return `${context.chart.data.labels[context.dataIndex]} \nGames: ${value}`
              },
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
            backgroundColor: getRandomColorArray(this.heroesChartData.labels.length),
            data: this.heroesChartData.data
          }
        ]
      }
    }
  }
}
</script>
