<template>
  <v-app>
    <v-main>
      <router-view v-if="songs.length > 0" :title="title" :body="body" :hashtag="hashtag" :songs="songs"/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',

  data: () => ({
    title: "COUNT DOWN CAOFF 投票",
    body: "今年も<a href=\"https://arcane.com/ja-jp/\" target=\"_blank\">COUNTDOWN CAOFF</a>が12月31日に開催されます。<br/>\nそこで、2021年に発表されたアニソンの中で皆さんが良かったと思う曲ベスト10を決めたいと思います!!<br/>\nランキングは皆さんの投票で決定します。<br/>",
    hashtag: "caoff2023",
    songs: []
  }),
  mounted() {
    axios.get("https://db9qp4rc97c3t.cloudfront.net/caoffVoteInfo")
    .then(response => {
      this.title = response.data.title
      this.body = response.data.body
      this.hashtag = response.data.hashtag
      this.songs = response.data.songs
      document.title = this.title
    })
  }
};
</script>
