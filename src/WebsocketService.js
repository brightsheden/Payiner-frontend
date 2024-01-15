// WebSocketService.js

import Pusher from 'pusher-js';

class WebSocketService {
    constructor(channelName, eventCallback) {
        console.log('WebSocket connection initializing...');

        try {
            this.pusher = new Pusher('4768f700bad9dd388eba', {
                cluster: 'mt1',
                encrypted: true,
            });

            this.channel = this.pusher.subscribe(channelName);
            this.channel.bind('new_message', eventCallback);

            console.log('WebSocket connection established.');
        } catch (error) {
            console.error('WebSocket connection error:', error);
        }
    }

    disconnect() {
        if (this.pusher) {
            this.pusher.disconnect();
            console.log('WebSocket connection closed.');
        }
    }
}

export default WebSocketService;
