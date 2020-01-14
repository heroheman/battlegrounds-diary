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
import { downloadAsJSON } from '@/helper'

export default {
  name: 'SettingsExport',
  computed: {
    ...mapGetters('history', ['resultsJSON']),
  },
  methods: {
    downloadExportCode() {
      downloadAsJSON(this.resultsJSON)
      this.toast(true)
    },
    toast(append = false) {
      this.counter++
      this.$bvToast.toast('Export successful', {
        toaster: 'b-toaster-bottom-center',
        solid: true,
        variant:'success',
        appendToast: append
      })
    }
  }
}
</script>

<style scoped>
textarea {
  font-size: 10px;
}
</style>
