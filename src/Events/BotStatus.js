module.exports = {
    onReady: () => {
        console.log('I\'m ready');
    },
    onReconnecting: () => {
        console.log('I loose connection, have to refresh the connection');
    },
    onError: (error) => {
        console.log(error);
    },
    onDisconnect: () => {
        console.log('Good Bye, Have a good day!');
    }
};