<template>
  <b-table
    :items="resultsTableData"
    :fields="fields"
    >
    <template v-slot:cell(hero)="data">
      <b class="text-info">{{ data.value }}</b>
    </template>

    <template v-slot:cell(timestamp)="data">
      <time :time="data.value" :title="data.value">{{ data.value | moment('from', 'now') }}</time>
    </template>

    <template v-slot:cell(actions)="data">
      <b-button variant="danger" size="sm" title="Delete Entry" class="button--delete">
        <unicon name="trash" fill="white" width="15" height="15" />
      </b-button>
    </template>
  </b-table>
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
      { key: 'timestamp', label: 'Date' },
      { key: 'actions', label: '' },
    ]
  }),
  computed: {
    ...mapGetters('history', [
      'resultsTableData'
    ]),
  },
}
</script>

<style scoped>
.button--delete {
  padding: 0.15rem 0.5rem;
}
</style>
