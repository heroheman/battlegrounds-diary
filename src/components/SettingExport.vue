<template>
  <div>
    <b-textarea
      rows="5"
      class="mb-3"
      :value="resultsJSON">
    </b-textarea>
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
  }
}
</script>
