<template>
  <div>
    <div class="actions">
      <b-row>
        <b-col>
          <b-pagination
            v-model="currentPage"
            size="sm"
            :total-rows="resultsTableData.length"
            :per-page="perPage"
            aria-controls="my-table"
            >
          </b-pagination>
        </b-col>

        <b-col>
          <b-form-select v-model="perPage">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </b-form-select>
        </b-col>
      </b-row>
    </div>

    <b-table
      responsive
      small
      :fields="fields"
      :items="resultsTableData"
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      >

      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :class="field.key"
          >
      </template>

      <template v-slot:cell(hero)="data">
        <b class="text-info">{{ data.value }}</b>
      </template>

      <template v-slot:cell(mmr)="data">
        {{data.item.mmr}}
        <span v-if="data.item.missed !== 'true'" style="padding-left: 3px; padding-right: 3px;">
          <small v-if="data.item.difference > 0" class="text-success">+{{data.item.difference}}</small>
          <small v-else-if="data.item.difference === 0">{{data.item.difference}}</small>
          <small v-else class="text-danger">{{data.item.difference}}</small>
        </span>

        <span>
          <small>
            <unicon
              :name="getGainLoseIndicator(data.item.place, data.item.difference)"
              fill="#ccc" width="10" height="10" />
          </small>
        </span>

      </template>

      <template v-slot:cell(timestamp)="data">
        <time :time="data.value" :title="data.value">{{ data.value | moment('from', 'now') }}</time>
      </template>

      <template v-slot:cell(actions)="row">
        <div class="text-right">
          <b-button v-if="row.item.note"
                    variant="info" size="sm" title="Show note"
                    class="button--delete" @click="row.toggleDetails">
            <unicon name="comment-lines" fill="white" width="15" height="15" />
          </b-button>

          <b-button v-b-modal="`delete-modal-${row.item.id}`"
            variant="danger" size="sm" title="Delete Entry" class="button--delete">
            <unicon name="trash" fill="white" width="15" height="15" />
          </b-button>

          <b-modal :id="`delete-modal-${row.item.id}`"
            header-bg-variant="danger"
            header-text-variant="light"
            ok-variant="danger"
            ok-title="DELETE"
            title="Delete Entry?"
            @ok="handleDelete(row.item.id)">
            <p class="my-4">Are you sure?</p>
          </b-modal>

        </div>

      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-card-text>
            {{row.item.note}}
          </b-card-text>
        </b-card>
      </template>
    </b-table>


  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "TableResults",
  data: () => ({
    perPage: 25,
    currentPage: 1,
    sortDesc: true,
    sortBy: 'timestamp',
    fields: [
      { key: 'hero', label: 'Hero' },
      { key: 'placement', label: 'Pos' },
      { key: 'mmr', label: 'MMR' },
      { key: 'tribe', label: 'Tribe' },
      { key: 'summary', label: 'Summary' },
      { key: 'timestamp', label: 'Date', sortable: true },
      { key: 'actions', label: '' },
    ]
  }),
  computed: {
    ...mapGetters('history', [
      'resultsTableData',
      'averageGainLose'
    ])
  },
  methods: {
    ...mapActions('history', [
      'deleteResult'
    ]),
    handleDelete(id) {
      this.deleteResult(id)
    },
    getGainLoseIndicator (place, diff) {
      const average = this.averageGainLose.find(a => a.place === parseInt(place)).average
      if (diff > (average + 1)) {
        return 'arrow-growth'
      } else if(diff < (average - 1)) {
        return 'chart-down'
      } else {
        return 'circle'
      }
    }
  }
}
</script>

<style>
.b-table tbody td {
  white-space: nowrap !important;
}

colgroup .hero {min-width: 200px;}
colgroup .placement { min-width: 100px; }
colgroup .tribe { width: 100px; }
colgroup .mmr { width: 100px; }
colgroup .summary { width: 100px; }
colgroup .timestamp { width: 150px; }
colgroup .actions { width: 100px; }


.button--delete {
  padding: 0.15rem 0.5rem;
  margin-right: 2px;
}
</style>
