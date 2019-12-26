<template>
  <div>
    <b-textarea
      v-model="importData"
      placeholder="Paste export code here"
      class="mb-4"
      rows="5">
    </b-textarea>
    <b-button class="mb-3" :disabled="!dataIsValid" @click="handleImportData">Import</b-button>
    <b-alert variant="danger" :show='!dataIsValid'>Field is empty or data is corrupt</b-alert>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { decodeDiaryData } from '@/helper'
export default {
  name: 'SettingImport',
  data: () => ({
    importData: ''
  }),
  computed: {
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
  }
}
</script>
