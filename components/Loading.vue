<template>
        <v-overlay z-index='250' :value="loading">
        <div class="text-center">
            <v-progress-circular indeterminate color="#005591"></v-progress-circular>
        </div>
    </v-overlay>
</template>

<script>
export default {
    props: ['loading']
}
</script>