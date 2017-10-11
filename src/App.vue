<template>
    <div id="app">
        <chat></chat>
        <chat-form></chat-form>
        <hr>
        <bot></bot>
    </div>
</template>

<script>
    import Chat from './components/Chat.vue';
    import ChatForm from './components/ChatForm.vue';
    import Messages from './services/Messages';
    import Bot from './components/Bot.vue';

    export default {
        name: 'app',
        provide: {
            chatMessages: new Messages('ws://lysek-pc:3000')
        },
        components: {
            Chat,
            ChatForm,
            Bot
        }
    };
</script>

<style>
    html, body {
        font-family: sans-serif;
        font-size: 12pt;
        background: #FFFFFF;
    }
</style>
