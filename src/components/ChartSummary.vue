<template>
  <div class="charts">
    <b-row>
      <b-col>
        <h3 class="h4">Your Satisfaction</h3>
        <ChartDoughnut :chartData="pieChartData" :options="pieHeroes.options" />
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
      'satisfactionChartData'
    ]),
    pieChartData () {
      return {
        labels: this.satisfactionChartData.labels,
        datasets: [
          {
            datalabels: {
              formatter: function(value, context) {
                return `${context.chart.data.labels[context.dataIndex]}`
              },
              labels: {
                value: {
                  display: 'auto',
                  anchor: 'center',
                  align: 'center',
                  clamp: true,
                  font: {
                    size: 24
                  }
                }
              }
            },
            backgroundColor: getRandomColorArray(this.satisfactionChartData.labels.length),
            data: this.satisfactionChartData.data
          }
        ]
      }
    }
  }
}
</script>
