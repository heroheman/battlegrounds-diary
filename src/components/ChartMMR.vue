<template>
  <div class="charts">
    <b-row>
      <b-col>
        <h3>MMR History</h3>
      </b-col>
      <b-col sm="12" md="4" class="text-right">
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
    ...mapGetters('history', [
      'results',
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
