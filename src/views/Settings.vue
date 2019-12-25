<template>
  <div class="settings">
    <h1 class="mb-4">Settings</h1>
    <h3>Import / Export your Data</h3>
    <b-alert show variant="danger">
      <strong>Attention:</strong>
      This is fairly untested. Use at your own risk! Before importing, save the Export Code somewhere else!
    </b-alert>
    <b-tabs card lazy>
      <b-tab title="Export">
        <b-textarea
          rows="5"
          :value="resultsJSON">
        </b-textarea>
      </b-tab>
      <b-tab title="Import">
        <b-textarea
          v-model="importData"
          placeholder="Paste export code here"
          class="mb-4"
          rows="5">
        </b-textarea>
        <b-button @click="handleImportData">Import</b-button>
      </b-tab>
      <b-tab title="Backup">
        <AccBackup />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AccBackup from '@/components/AccBackup'
export default {
  name: 'Settings',
  data: () => ({
    importData: null
  }),
  components: { AccBackup },
  computed: {
    ...mapState('history', ['resultsBackup']),
    ...mapGetters('history', ['resultsJSON']),
  },
  methods: {
    ...mapActions('history', ['setImportedResults']),
    handleImportData() {
      this.setImportedResults(this.importData)
      this.importData = ''
    },
  },
}
</script>
