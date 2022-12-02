<template>
  <div class="songList">
    <v-card>
      <v-app-bar fixed>
        <v-text-field class="mt-auto mb-auto mr-1" solo placeholder="曲名/番組名で検索" prepend-inner-icon="mdi-magnify"
          v-model="query"></v-text-field>
        <v-badge color="blue" overlap offset-y="20" :content="selectedSongs.length" :value="selectedSongs.length >= 1">
          <v-btn text color="primary" @click="dialog = true">
            選んだ曲
          </v-btn>
        </v-badge>
      </v-app-bar>
      <v-sheet>
        <v-container>
          <p class="mt-16">まずは3曲選ぼう。リストにない場合はtweetする時に自分で追加してね。</p>
          <v-list two-line class="mb-12">
            <v-list-item-group multiple max="0" v-model="listModel">
              <template>
                <v-list-item v-for="(song) in filteredSongs" :key="song.id" :value="song" @click="listOnClick(song)">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" readonly></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="song.songTitle"></v-list-item-title>
                      <v-list-item-subtitle v-text="song.animeTitle + ' / ' + song.artist">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>

          <div style="position:fixed;bottom:20px;width: 100%;text-align: center;">

            <v-btn style="width: 300px;" @click.stop="onClickSelectPriority" color="primary">順位を決める
            </v-btn>
          </div>

        </v-container>
      </v-sheet>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>選択済みの曲</v-card-title>
        <v-list v-if="selectedSongs.length > 0" two-line>
          <v-list-item-group multiple v-model="selectedSongs">
            <template>
              <v-list-item v-for="(song) in selectedSongs" :key="song.id" :value="song">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" readonly></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="song.songTitle"></v-list-item-title>
                    <v-list-item-subtitle v-text="song.animeTitle + ' / ' + song.artist">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
        <v-card-text v-else>
          <div class="text-body-1 pt-5 pl-5">選択済みの曲はありません</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { STRAGE_KEY_SONGS } from '../constants.js'
export default {
  props: {
    songs: Array
  },
  data: () => ({
    songsForSearch: [],
    selectedSongs: [],
    query: "",
    dialog: false
  }),
  methods: {
    onClickSelectPriority: function () {
      sessionStorage.setItem(STRAGE_KEY_SONGS, JSON.stringify(this.selectedSongs));
      this.$router.push('/vote')
    },
    normarize: function (str) {
      const katakanaRegex = /[\u30A1-\u30FA]/g
      return str.toLowerCase().replace(katakanaRegex, x => String.fromCharCode(x.charCodeAt(0) - 0x60));
    },
    listOnClick: function (song) {
      const filtered = this.selectedSongs.filter((item) => { return item.id != song.id })
      if (filtered.length < this.selectedSongs.length) {
        this.selectedSongs = filtered
      } else if (this.selectedSongs.length < 3) {
        this.selectedSongs.push(song)
      }
    }
  },
  computed: {
    filteredSongs: function () {
      const normarizedQuery = this.normarize(this.query)
      return this.songsForSearch.filter((item) => {
        return this.query.length == 0 || item.searchString.includes(normarizedQuery)
      })
    },
    listModel: {
      get: function () {
        return this.filteredSongs.filter((item) => {
          return this.selectedSongs.find((selected) => selected.id == item.id)
        })
      },
      set: function (val) {
        //nothing to do
        val.length
      }
    }
  },
  mounted() {
    if (Object.prototype.hasOwnProperty.call(sessionStorage, STRAGE_KEY_SONGS)) {
      this.selectedSongs = JSON.parse(sessionStorage.getItem(STRAGE_KEY_SONGS))
    }
    this.songsForSearch = this.songs.concat()
    this.songsForSearch.forEach((item) => {
      item.searchString = this.normarize(item.songTitle) + "_" + this.normarize(item.artist) + "_" + this.normarize(item.animeTitle)
    })
  }
}
</script>