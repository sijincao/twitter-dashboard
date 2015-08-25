angular.module('twitter-dashboard').service('layoutConfig', function () {
    var self = this;
    var defaultConfig =  {
        count: {
            AppDirect: '10',
            laughingsquid: '10',
            techcrunch: '10'
        },
        order:['laughingsquid', 'AppDirect', 'techcrunch']
    };

    self.getConfig = function() {
        return JSON.parse(window.localStorage.getItem('config')) || defaultConfig;
    };

    self.saveConfig = function(config) {
        window.localStorage.setItem('config', JSON.stringify(config));
    };
});