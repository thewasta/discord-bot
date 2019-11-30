module.exports = {
    onReady: (callback) => {
        console.log('I\'m ready');
        callback();
    },
    onReconnecting: () => {
        console.log('I loose connection, trying to reconnect');
    },
    onError: (error,callback) => {
        console.log(error);
        callback();
    },
    onDisconnect: () => {
        console.log('Good Bye, Have a good day!');
    }
};