<template>
  <div>
    <b-row>
      <b-col sm="12" md="6" class="mb-4">
        <b-card title="Add your data" tag="section">
          <b-form>
            <b-row>
              <b-col sm="12" md="6">
                <label for="upgrades">
                  Tavern Upgrades
                  <Popover
                    label="?"
                    title="Why is this so important?"
                    text="This is the most important value for the calculation - as it is the only reliable indicator for the total number of games. Most of the time, a player reaches level 4 or 5 to win or eliminate. Depending on your own estimation you can also adjust the base value. The default is 4.5"
                  />
                </label>
                <b-input
                  id="upgrades"
                  v-model="user.upgrades"
                  type="number"
                  required
                  placeholder="Required"
                  >
                </b-input>
                <b-form-text class="mb-3">Amount of tavern upgrades</b-form-text>

                <!-- <b-alert show variant="primary"> -->
                <!--   This is the most important value for the calculation - as it is the only reliable indicator for the total number of games. Most of the time, a player reaches level 4 or 5 to win or eliminate. Depending on your own estimation you can also adjust the base value. The default is 4.5 -->
                <!-- </b-alert> -->
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="12" md="6">
                <b-form-group
                  id="top4-group"
                  label="Top 4"
                  label-for="top4"
                  description="Your Top 4's"
                  >
                  <b-form-input
                    id="top4-1"
                    v-model="user.top4"
                    type="number"
                    required
                    placeholder="Required"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="first-group"
                  label="First"
                  label-for="first"
                  description="How many times did you have Brann before any other player"
                  >
                  <b-form-input
                    id="first"
                    v-model="user.first"
                    type="number"
                    required
                    placeholder="Required"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <hr>

            <b-row>
              <b-col sm="12" md="6">
                <b-form-group
                  id="minions-group"
                  label="Minions Destroyed"
                  label-for="minions-destroyed"
                  >
                  <b-form-input
                    id="minions-destroyed"
                    v-model="user.minionsKilled"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="players-group"
                  label="Players eliminated"
                  label-for="players"
                  >
                  <b-form-input
                    id="players"
                    v-model="user.playersKilled"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="12" md="6">
                <b-form-group
                  id="triples-group"
                  label="Triples created"
                  label-for="triples"
                  >
                  <b-form-input
                    id="triples"
                    v-model="user.triplesCreated"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="time-group"
                  label="Time played (in h)"
                  label-for="time"
                  >
                  <b-form-input
                    id="time"
                    v-model="user.timePlayed"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>


          </b-form>
        </b-card>
      </b-col>

      <b-col sm="12" md="6" class="mb-4">
        <b-card class="mb-3" header="Results" tag="section" header-bg-variant="default">
          <dl>
            <dt>Games Played: </dt>
            <dd>{{ amount }} Games</dd>

            <dt>Average Wins:</dt>
            <dd>{{ winsOne }}%</dd>

            <dt>Average Top4:</dt>
            <dd>{{ winsFour }}%</dd>
          </dl>

          <hr>

          <dl>
            <dt>Average Minions destroyed:</dt>
            <dd>{{ killedMinions }} per Match</dd>

            <dt>Average Players destroyed</dt>
            <dd>{{ killedPlayers }} per Match</dd>

            <dt>Average triples</dt>
            <dd>{{ triples }} per Match</dd>

            <dt>Average time / Match</dt>
            <dd>{{ time }} Minutes</dd>
          </dl>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Popover from '@/components/Popover'
export default {
  name: "Calculator",
  components: { Popover },
  data: () => ({
    averageTavernUpgrades: 4.5,
    user: {
      top4: '158',
      first: '30',
      upgrades: '1231',
      minionsKilled: '26167',
      triplesCreated: '654',
      playersKilled: '211',
      timePlayed: '110',
    }
  }),
  computed: {
    amount: function () {
      return this.precise(this.user.upgrades / this.averageTavernUpgrades)
    },
    winsOne: function () {
      return this.precise((this.user.first * 100) / this.amount)
    },
    winsFour: function () {
      return this.precise((this.user.top4 * 100) / this.amount)
    },
    killedMinions: function () {
      return this.precise(this.user.minionsKilled / this.amount)
    },
    killedPlayers: function () {
      return this.precise(this.user.playersKilled / this.amount)
    },
    triples: function () {
      return this.precise(this.user.triplesCreated / this.amount)
    },
    time: function () {
      return this.precise((this.user.timePlayed * 60) / this.amount)
    },
  },
  methods: {
    precise: function (x) {
      return Number.parseFloat(x).toPrecision(4);
    },
  }
}
</script>

<style scoped>
</style>
