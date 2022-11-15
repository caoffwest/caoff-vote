<template>
  <div class="vote">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p>並び変えて順位を決めたら、投票するボタンをクリック！</p>
          <v-list two-line>
            <template>
              <draggable v-model="selectedSongs" draggable=".draggable-item">
                <v-list-item v-for="(song, i) in selectedSongs" :key="`${i}`" :value="song"
                  class="elevation-4 ma-2 draggable-item">
                  <v-list-item-icon>
                    <v-icon :color="iconColor(i)">mdi-numeric-{{ i + 1 }}-box</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="song.songTitle"></v-list-item-title>
                    <v-list-item-subtitle v-text="song.animeTitle">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </draggable>
            </template>
          </v-list>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn x-large class="mr-2" @click="onClickBack">戻る</v-btn>
          <v-btn x-large color="primary" @click="onClickTweet">
            <v-icon>mdi-twitter</v-icon> 投票する
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { STRAGE_KEY_SONGS } from '../constants.js'
export default {
  props: {
    hashtag: String
  },
  data: () => ({
    selectedSongs: [],
    draggableModel: []
  }),
  components: {
    draggable: draggable
  },
  methods: {
    iconColor: function (i) {
      switch (i) {
        case 0: return "#E6B422"
        case 1: return "#C0C0C0"
        default: return "#BB641D"
      }
    },
    onClickTweet: function () {
      const tweetUrl = new URL("https://twitter.com/intent/tweet")
      tweetUrl.searchParams.set("text", this.selectedSongs.map((item, i) => {
        if (typeof (item.id) == "string" && item.id.startsWith("empty-")) {
          return (i + 1) + "位:{入力してください}"
        } else {
          return (i + 1) + "位:" + item.songTitle + "/" + item.animeTitle
        }
      }).join("\n") + "\n" + location.href.replace(/vote$/, ''))
      tweetUrl.searchParams.set("hashtags", this.hashtag)
      sessionStorage.removeItem(STRAGE_KEY_SONGS)
      window.location.href = tweetUrl
    },
    onClickBack: function () {
      this.$router.push('/songList')
    }
  },
  mounted() {
    if (Object.prototype.hasOwnProperty.call(sessionStorage, STRAGE_KEY_SONGS)) {
      this.selectedSongs = JSON.parse(sessionStorage.getItem(STRAGE_KEY_SONGS))
    }
    if (this.selectedSongs.length < 3) {
      for (let i = this.selectedSongs.length; i < 3; i++) {
        this.selectedSongs.push(
          {
            songTitle: "tweetするときに曲名を入力してね",
            animeTitle: "",
            id: "empty-" + i
          }
        )
      }
    }
  }
}
</script>