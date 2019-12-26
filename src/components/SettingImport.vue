<template>
  <div>
    <b-textarea
      v-model="importData"
      placeholder="Paste export code here"
      class="mb-4"
      @change="enableAlert"
      rows="5">
    </b-textarea>

    <b-alert class="mb-3"
      v-if="!alertHidden"
      variant="danger"
      :show='!dataIsValid'
    >
      Field is empty or data is corrupt
    </b-alert>

    <p>or upload file</p>

    <ImportFileButton class="mb-3" @load="handleFileData" />

    <b-button class="mb-3" :disabled="!dataIsValid" @click="handleImportData">Import</b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { decodeDiaryData } from '@/helper'
import ImportFileButton from '@/components/ImportFileButton'

export default {
  name: 'SettingImport',
  components: { ImportFileButton },
  data: () => ({
    importData: '',
    alertHidden: true
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
    enableAlert() {
      this.alertHidden = false
    },
    handleImportData() {
      this.setImportedResults(this.importData)
      this.importData = ''
    },
    handleFileData(data) {
      this.importData = data
    }
  }
}
</script>

<style scoped>
textarea {
  font-size: 10px;
}
</style>
