<template>
    <div>
        <button @click="toggle">
            Toggle bot
        </button>
        <div class="status" :class="{'on': status, 'off': !status}">
            <span v-if="status">On</span>
            <span v-if="!status">Off</span>
        </div>
    </div>
</template>

<script>
    var letters = ' abcde fghijk lmnop qrstu vwxyz';
    var botName = 'Bot' + Math.ceil(Math.random() * 1000);

    function makeText() {
        var ret = '';
        var length = 10 + Math.round(Math.random() * 50);
        for(var i = 1; i <= length; i++) {
            var p = Math.floor(Math.random() * letters.length);
            ret += letters.slice(p, p + 1);
        }
        return ret;
    }

    export default {
        inject: ['chatMessages'],
        data() {
            return {
                status: false
            };
        },
        methods: {
            toggle() {
                if(this.status) {
                    this.status = false;
                } else {
                    this.status = true;
                    this._sendMessage(this.chatMessages);
                }
            },
            _sendMessage(chatMessages) {
                setTimeout(() => {
                    chatMessages.send(botName, makeText());
                    if(this.status) {
                        this._sendMessage(chatMessages);
                    }
                }, Math.round(Math.random() * 1000));
            }
        }
    };
</script>

<style>
    .status {
        width: 50px;
        height: 1rem;
        display: inline-block;
    }
    .on {
        background: #00FF00;
    }
    .off {
        background: #FF0000;
    }
</style>