<template>
  <div class="settings">
    <h1 class="mb-4">Settings</h1>
    <h3>Import / Export your Data</h3>
    <b-alert show variant="warning">
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
        <b-button class="mb-3" :disabled="!dataIsValid" @click="handleImportData">Import</b-button>
        <b-alert variant="danger" :show='!dataIsValid'>Field is empty or data is corrupt</b-alert>
      </b-tab>
      <b-tab title="Backup">
        <AccBackup />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { deepSameKeys, decodeDiaryData } from '@/helper'

import AccBackup from '@/components/AccBackup'
export default {
  name: 'Settings',
  data: () => ({
    importData: ''
  }),
  components: { AccBackup },
  computed: {
    ...mapState('history', ['resultsBackup']),
    ...mapGetters('history', ['resultsJSON']),
    dataIsValid () {
      // very basic data check
      if (
        this.importData !== '' &&
        decodeDiaryData(this.importData).length &&
        decodeDiaryData(this.importData)[0].hasOwnProperty('id') &&
        decodeDiaryData(this.importData)[0].hasOwnProperty('placement') &&
        decodeDiaryData(this.importData)[0].hasOwnProperty('hero') &&
        decodeDiaryData(this.importData)[0].hasOwnProperty('tribe')
      ) {
        return true
      } else {
        return false
      }
    }
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

<style scoped>
textarea {
  font-size: 10px;
}
</style>
