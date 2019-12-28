import dataHeroes from '@/data/heroes.json'
import dataTribes from '@/data/tribes.json'
import dataSummary from '@/data/summary.json'

import {
  placementEmoji, uuidv4, howMany,
  precise, encodeDiaryData, decodeDiaryData
} from '@/helper'

const state = {
  heroes: dataHeroes,
  tribes: dataTribes,
  summary: dataSummary,
  mmr: null,
  results: [],
  resultsBackup: []
}

const mutations = {
  ADD_RESULT: (state, payload) => {
    state.results.push(payload)
  },
  SET_MMR: (state, payload) => {
    state.mmr = payload
  },
  DELETE_RESULT: (state, id) => {
    const index = state.results.findIndex(result => result.id == id)
    state.results.splice(index, 1)
  },
  UPDATE_RESULT: () => {
  },
  SET_IMPORTED_RESULTS: (state, payload) => {
    state.results = []
    state.results = payload
  },
  SET_BACKUP_RESULTS: (state) => {
    const backupData = {
      id: uuidv4(),
      createdAt: new Date(),
      data: encodeDiaryData(state.results)
    }
    // autocleanup if more than 3
    if (state.resultsBackup.length > 2) {
      state.resultsBackup.shift()
    }
    state.resultsBackup.push(backupData)
  }
}

const actions = {
  addResult ({ commit }, data) {
    data.id = uuidv4()
    commit('ADD_RESULT', data)
  },
  setMmr ({ commit }, data) {
    commit('SET_MMR', data)
  },
  deleteResult ({ commit }, id) {
    commit('DELETE_RESULT', id)
  },
  updateResult ({ commit }, data) {
    commit('UPDATE_RESULT', data)
  },
  setImportedResults ({ commit, state }, data) {
    const payload = decodeDiaryData(data)
    if (state.results.length > 0) {
      commit('SET_BACKUP_RESULTS')
    }
    commit('SET_IMPORTED_RESULTS', payload)
  }
}

const getters = {
  resultsJSON: state => encodeDiaryData(state.results),
  resultsTableData: state => {
    return state.results.map((res, index, arr) => {
      return {
        id: res.id,
        hero: state.heroes.find( h => res.hero === h.id ).name || '',
        tribe: state.tribes.find( t => t.id === res.tribe ).name || '',
        mmr: res.mmr,
        difference: res.difference,
        placement: `${res.placement} ${placementEmoji(res.placement)}`,
        summary: state.summary.find( s => s.id === res.summary ).titleShort || '',
        timestamp: res.timestamp,
        note: res.note,
        missed: res.missed,
        place: res.placement,
        last: arr.length - 1 === index ? true : false
      }
    })
  },
  mmrChartData: state => resultsLength => {
    let mmr = {
      labels: [],
      data: []
    }
    for (let result of state.results) {
      mmr.data.push(result.mmr)
      let hero = state.heroes.find( h => result.hero === h.id ).name
      let tribe = state.tribes.find( t => result.tribe === t.id ).name
      mmr.labels.push(`${hero} / ${tribe}`)
    }

    mmr.data = mmr.data.slice(resultsLength * -1)
    mmr.labels = mmr.labels.slice(resultsLength * -1)
    return mmr;
  },
  heroesChartData: state => {
    let heroes = {
      labels: [],
      data: []
    }

    for (let res of state.heroes) {
      let games = howMany(state.results, 'hero')(res.id)
      if (games > 0) {
        heroes.labels.push(res.name)
        heroes.data.push(games)
      }
    }
    return heroes
  },
  heroesChartDataTable: state => {
    let heroesTable = []
    for (let res of state.heroes) {
      let games = howMany(state.results, 'hero')(res.id)
      if (games > 0) {
        heroesTable.push({
          hero: res.name,
          gamesPlayed: games
        })
      }
    }
    // sort desc
    heroesTable = heroesTable.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
    return heroesTable
  },
  tribeChartData: state => {
    let tribes = {
      labels: [],
      data: []
    }

    for (let res of state.tribes) {
      let wins = howMany(state.results, 'tribe')(res.id)
      if (wins > 0) {
        tribes.labels.push(res.name)
        tribes.data.push(wins)
      }
    }
    return tribes
  },
  tribeChartDataTable: state => {
    let arr = []
    for (let res of state.tribes) {
      let games = howMany(state.results, 'tribe')(res.id)
      if (games > 0) {
        arr.push({
          tribe: res.name,
          gamesPlayed: games
        })
      }
    }
    // sort desc
    arr = arr.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
    return arr
  },
  satisfactionChartData: state => {
    let satis = {
      labels: [],
      data: []
    }

    for (let sum of state.summary) {
      let summary = howMany(state.results, 'summary')(sum.id)
      if (summary > 0) {
        satis.labels.push(sum.titleShort)
        satis.data.push(summary)
      }
    }
    return satis
  },
  averageGainLose: state => {
    let ranks = 8
    let points = []
    for (let i = 0; i < ranks; i++) {
      let items = state.results.filter(res => parseInt(res.placement) === (i + 1)) || {}
      let gains = 0
      for (let item of items) {
        gains += parseInt(item.difference)
        // console.log(item.difference, gains)
      }
      const tmp = {
        place: i+1,
        matches: items.length,
        average: precise(gains / items.length)
      }
      points.push(tmp)
    }

    return points
  },
  leaderboard: state => {
    const leaderboard = []
    for (const hero of state.heroes) {
      let heroResults = state.results.filter( r => hero.id === r.hero )

      let data = {
        hero: hero.name,
        points: 0,
        top1: 0,
        top4: 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
      }

      for (let hr of heroResults) {
        data[hr.placement] += 1
        switch (hr.placement) {
          case '1':
            data.points += 8
            data.top1 +=1
            data.top4 +=1
            break
          case '2':
            data.points += 5
            data.top4 +=1
            break
          case '3':
            data.points += 3
            data.top4 +=1
            break
          case '4':
            data.points += 1
            data.top4 +=1
            break
          case '5':
            data.points -= 1
            break
          case '6':
            data.points -= 3
            break
          case '7':
            data.points -= 5
            break
          case '8':
            data.points -= 8
            break
          default:
            data.points += 0
            break
        }
      }

      if (
        !(data[1] === 0 &&
        data[2] === 0 &&
        data[3] === 0 &&
        data[4] === 0 &&
        data[5] === 0 &&
        data[6] === 0 &&
        data[7] === 0 &&
        data[8] === 0)
      ) {
        leaderboard.push(data)
      }
    }
    return leaderboard
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
