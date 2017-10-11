<template>
    <form @submit.prevent="sendMessage">
        <label>From:</label>
        <input v-model="from" type="text" required>
        <label>Message:</label>
        <input v-model="message" type="text" required>
        <input type="submit" value="Send">
    </form>
</template>

<script>
    export default {
        inject: ['chatMessages'],
        data() {
            return {
                from: '',
                message: ''
            };
        },
        methods: {
            sendMessage() {
                this.chatMessages.send(this.from, this.message).then(() => {
                    this.message = '';
                });
            }
        }
    };
</script>