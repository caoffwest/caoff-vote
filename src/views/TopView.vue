<template>
    <div class="top">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1>{{ title }}</h1>
                </v-col>
                <v-col cols="12">
                    <div v-html="body"></div>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-btn x-large color="primary" @click="onClickNext">投票ページへ</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        body: String
    },
    methods: {
        onClickNext: function () {
            this.$router.push('/songList');
        }
    }
}
</script>