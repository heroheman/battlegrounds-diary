<template>
  <div>
    <b-alert show variant="info" dismissible>
      <small>Hi - I am currently working on the next version of the diary. Therefore I would like to know more about you - the user. Maybe you have a few minutes to fill out a survey? Thanks!</small>
      <hr>
      <a href=""></a>
      <b-button size="sm" variant="primary" href="https://forms.gle/s3oABJqVa9Rn8dx89" target="_blank">Take me to the survey!</b-button>
    </b-alert>
    <b-modal
      id="modal-initial-mmr" title="Enter your initial MMR"
      @ok="handleMmrUpdate()"
    >
      <p class="my-4">As this is your first entry - pleaser enter your current MMR Points</p>
      <b-form-input v-model="mmrPoints" required type="number" placeholder="eg. 4000" />
    </b-modal>

    <b-row>
      <b-col>
        <FormResult />
      </b-col>
    </b-row>

    <b-row class="mt-4 mb-4">
      <b-col>
        <b-card no-body>
          <b-tabs card lazy>
            <b-tab title="Your Journey">
              <template v-slot:title>
                <unicon class="tab-icon" name="list-ul" fill="currentColor" width="18" height="18" />
                Your Journey
              </template>
              <TableResults />
            </b-tab>
            <b-tab title="Graphs (Experimental)">
              <template v-slot:title>
                <unicon class="tab-icon" name="chart-pie-alt" fill="currentColor" width="18" height="18" />
                Stats and Graphs
              </template>
              <ChartResults />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormResult from '@/components/FormResult'
import TableResults from '@/components/TableResults'
import ChartResults from '@/components/ChartResults'
export default {
  name: "History",
  components: {
    FormResult, TableResults, ChartResults
  },
  data: () => ({
    mmrPoints: '',
  }),
  computed: {
    ...mapState('history', [
      'mmr'
    ])
  },
  methods: {
    ...mapActions('history', [
      'setMmr'
    ]),
    handleMmrUpdate() {
      this.setMmr(this.mmrPoints)
    }
  },
  mounted() {
    if (this.mmr === null) {
      this.$bvModal.show('modal-initial-mmr')
    }
  }
}
</script>

<style>
.tab-icon {
  position: relative;
  top: -2px;
}
</style>
