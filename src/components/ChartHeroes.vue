<template>
  <div class="charts">
    <b-row>
      <b-col>
        <h3>Games by Hero</h3>
        <ChartPie :chartData="pieChartData" :options="pieHeroes.options" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartPie from '@/components/chart-blueprints/Pie'
import { getRandomColorArray } from '@/helper'

export default {
  props: ['chartData', 'options'],
  components: { ChartPie },
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
      'heroesChartData'
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
