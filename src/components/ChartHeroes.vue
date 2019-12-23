<template>
  <div class="charts">
    <b-row>
      <b-col>
        <h3 class="h4 position-absolute">Games by Hero</h3>
        <b-tabs lazy align="right">
          <b-tab title="Pie">
            <ChartDoughnut :chartData="pieChartData" :options="pieHeroes.options" />
          </b-tab>
          <b-tab title="List">
            <b-table-lite :items="heroesChartDataTable"></b-table-lite>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartDoughnut from '@/components/chart-blueprints/Doughnut'
import { getRandomColorArray } from '@/helper'

export default {
  props: ['chartData', 'options'],
  components: { ChartDoughnut },
  data: () => ({
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
