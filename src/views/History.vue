<template>
  <div>
    <b-modal
      id="modal-initial-mmr" title="Enter your initial MMR"
      @ok="handleMmrUpdate()"
    >
      <p class="my-4">As this is your first entry - pleaser enter your current MMR Points</p>
      <b-form-input v-model="mmrPoints" required type="number" placeholder="eg. 4000" />
    </b-modal>

    <b-row class="mb-4">
      <b-col>
        <FormResult />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col>
        <b-card no-body>
          <b-tabs card lazy>
            <b-tab title="Your Journey">
              <TableResults />
            </b-tab>
            <b-tab title="Graphs">
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
    mmrPoints: ''
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
