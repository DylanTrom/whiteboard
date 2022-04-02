<template>
<v-container fluid>
    <v-row align="center" justify="center" style="height:90vh">
        <v-col cols-lg="4">
            <v-card>
                <v-container class="pb-10 pt-4">
                    <v-row align="center" justify="center" >
                            <v-card-title>Welcome to Whiteboard!</v-card-title>
                    </v-row>
                    <v-row align="center" justify="center">
                            <v-btn :to="'/login'">Login</v-btn>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col align="center">
                            <v-card-text>Don't have an account?</v-card-text>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                            <v-btn :to="'/register'">Register</v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations(['set_nav_items', 'set_bottom_nav_items','set_page_name']),
    },
    mounted() {
        this.set_page_name('Whiteboard')
        this.set_nav_items([])
        this.set_bottom_nav_items([])
    }
  
}
</script>