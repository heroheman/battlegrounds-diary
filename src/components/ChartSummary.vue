<template>
  <div class="charts">
    <b-card title="Satisfaction">
      <ChartDoughnut @canvas='canvas = $event' :chartData="pieChartData" :options="pieSummary.options" />
      <DownloadChartButton filename="summary" :canvas="canvas" />
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
    canvas: null,
    pieSummary: {
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
