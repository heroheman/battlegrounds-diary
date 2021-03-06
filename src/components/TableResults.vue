<template>
  <div>
    <div class="actions">
      <b-row>
        <b-col sm="12" md="4" class="filter mb-2">
          <b-form-input class="filter__input"
                        :class="{ active : filter !== '' }"
            size="sm" v-model="filter" placeholder="Filter by Hero/Tribe">
          </b-form-input>
          <b-button v-if="filter !== ''"  title="Reset Filter"
            variant="link" size="sm" class="filter__reset" @click="filter = ''">
            <unicon
              name="times"
              fill="red" width="15" height="15" />
          </b-button>
        </b-col>

        <b-col cols="5" sm="6" md="4" class="mb-2">
          <b-form-select v-model="perPage" size="sm">
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </b-form-select>
        </b-col>

        <b-col cols="7" sm="6" md="4" class="">
          <b-pagination
            v-model="currentPage"
            align="fill"
            size="sm"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
            >
          </b-pagination>
        </b-col>

      </b-row>
    </div>

    <b-table
      responsive
      small
      :filter="filter"
      :fields="fields"
      :items="resultsTableData"
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      @filtered="onFiltered"
      >

      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :class="field.key"
          >
      </template>

      <template v-slot:cell(hero)="data">
        <b class="text-dark text-dotted pointer" @click="filter = data.value">{{ data.value }}</b>
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

      <template v-slot:cell(tribe)="data">
        <b class="text-dark text-dotted pointer" @click="filter = data.value">{{ data.value }}</b>
      </template>

      <template v-slot:cell(timestamp)="data">
        <time :time="data.value" :title="data.value">{{ data.value | moment('from', 'now') }}</time>
      </template>

      <template v-slot:cell(actions)="row">
        <div class="text-right">
          <b-dropdown variant="link" no-caret>
            <template v-slot:button-content>
              <unicon v-if="row.item.note" name="comment-lines" fill="black" width="15" height="15" />
              <unicon name="pen" fill="black" width="15" height="15" />
              <unicon name="trash" fill="red" width="15" height="15" />
              <unicon name="ellipsis-v" fill="black" width="15" height="15" />
            </template>
            <b-dropdown-item v-if="row.item.note" @click="row.toggleDetails">
              <unicon name="comment-lines" fill="white" width="15" height="15" />
              Show Comment
            </b-dropdown-item>

            <b-dropdown-item v-b-modal="`edit-modal-${row.item.id}`">
              <unicon name="pen" fill="white" width="15" height="15" />
              Edit
            </b-dropdown-item>

            <b-dropdown-item v-b-modal="`delete-modal-${row.item.id}`">
              <unicon name="trash" fill="white" width="15" height="15" />
              Delete
            </b-dropdown-item>
          </b-dropdown>

          <b-modal :id="`delete-modal-${row.item.id}`"
            header-bg-variant="danger"
            header-text-variant="light"
            ok-variant="danger"
            ok-title="DELETE"
            title="Delete Entry?"
            @ok="handleDelete(row.item.id)">
            <p class="my-4">Are you sure?</p>
          </b-modal>

          <b-modal :id="`edit-modal-${row.item.id}`"
            header-bg-variant="warning"
            header-text-variant="light"
            ok-variant="success"
            ok-title="Edit"
            title="Edit Entry?"
            >
            <FormResultEdit @editData="resultEdited = $event" :resultId="row.item.id" />
            <!-- <template v-slot:modal-ok @click="handleUpdate"> -->
            <!--   SEND -->
            <!-- </template> -->
            <template v-slot:modal-footer="{ ok, cancel }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="danger" @click="handleUpdate(row.item.id)">
                Update Data
              </b-button>
              <b-button size="sm" variant="primary" @click="cancel()">
                Cancel
              </b-button>
            </template>
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
import FormResultEdit from '@/components/FormResultEdit'
export default {
  name: "TableResults",
  components: { FormResultEdit },
  data: () => ({
    filter: '',
    totalRows: '1',
    perPage: 25,
    currentPage: 1,
    sortDesc: true,
    sortBy: 'timestamp',
    resultEdited: null,
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
  mounted() {
    // Set the initial number of items
    this.totalRows = this.resultsTableData.length
  },
  methods: {
    ...mapActions('history', [
      'deleteResult',
      'updateResult'
    ]),
    handleDelete(id) {
      this.deleteResult(id)
    },
    handleUpdate(modalId) {
      console.log("value: ");
      this.updateResult(this.resultEdited)
      this.$bvModal.hide(`edit-modal-${modalId}`)
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
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style>
.b-table tbody td {
  white-space: nowrap !important;
  vertical-align: middle !important;
}

colgroup .hero {min-width: 200px;}
colgroup .placement { min-width: 100px; }
colgroup .tribe { width: 100px; }
colgroup .mmr { width: 100px; }
colgroup .summary { width: 100px; }
colgroup .timestamp { width: 150px; }
colgroup .actions { width: 100px; }

.table td
.table th {
  vertical-align: middle !important;
}

.button--delete {
  padding: 0.15rem 0.5rem;
  margin-right: 2px;
}

.filter {
  position: relative;
}
.filter__input.active {
  border: 2px solid orange;
}
.filter__reset {
  position: absolute;
  right: 1rem;
  top: 0;
}

.text-dotted {
  border-bottom: 1px dotted #ccc;
}

.pointer {
  cursor: pointer;
}

</style>
