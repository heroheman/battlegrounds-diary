<template>
  <div>
    <b-textarea
      rows="5"
      class="mb-3"
      :value="resultsJSON">
    </b-textarea>
    <p>Copy code or download as .txt file</p>
    <b-button class="mb-3" @click="downloadExportCode">
      Download
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsExport',
  computed: {
    ...mapGetters('history', ['resultsJSON']),
  },
  methods: {
    downloadExportCode() {
      const exportCode = this.resultsJSON
      const d = new Date();
      const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + "-" + ("0" + d.getMinutes()).slice(-2);

      var link = document.createElement('a')
      link.download = `bgdiary-data-export-${datestring}.json`
      var blob = new Blob([exportCode], {type: 'text/plain'})
      link.href = window.URL.createObjectURL(blob)
      link.click()
    }
  }
}
</script>

<style scoped>
textarea {
  font-size: 10px;
}
</style>
