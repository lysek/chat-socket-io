<template>
    <div>
        <div v-for="message in messages">
            {{message.time|time}} {{message.from}}: {{message.message}}
        </div>
    </div>
</template>

<script>
    export default {
        inject: ['chatMessages'],
        data() {
            return {
                messages: []
            };
        },
        mounted() {
            this.chatMessages.getOld().then((messages) => {
                this.messages = messages;
            });
            this.chatMessages.onNew(message => {
                this.messages.unshift(message);
                if(this.messages.length > 30) {
                    this.messages.pop();
                }
            });
        },
        filters: {
            time(ts) {
                return new Date(ts).toLocaleTimeString();
            }
        }
    };
</script>

<style scoped>
</style>
