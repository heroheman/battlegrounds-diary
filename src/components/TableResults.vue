<template>
  <b-card header="Your journey">
    <b-table
      :items="resultsTableData"
      :fields="fields"
    >
      <template v-slot:cell(hero)="data">
        <b class="text-info">Its {{ data.value }}</b>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "TableResults",
  data: () => ({
    fields: [
      { key: 'hero', label: 'Hero' },
      { key: 'placement', label: 'Placement' },
      { key: 'tribe', label: 'Tribe' },
      { key: 'mmr', label: 'MMR' },
      { key: 'summary', label: 'Summary' },
    ]
  }),
  computed: {
    ...mapGetters('history', [
      'resultsTableData'
    ]),
  },
}
</script>
