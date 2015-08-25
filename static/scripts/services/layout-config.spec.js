'use strict';

describe('layoutConfig Service Test', function() {
    var $rootScope;
    var layoutConfig;
    var defaultConfig =  {
        count: {
            AppDirect: '10',
            laughingsquid: '10',
            techcrunch: '10'
        },
        order:['laughingsquid', 'AppDirect', 'techcrunch']
    };

    var localConfig = '{"count":{"AppDirect":"20","laughingsquid":"20","techcrunch":"10"},"order":["laughingsquid","techcrunch", "AppDirect"]}';

    beforeEach(angular.mock.module('twitter-dashboard'));

    beforeEach(inject(function(_$rootScope_, _layoutConfig_) {
        $rootScope = _$rootScope_;
        layoutConfig = _layoutConfig_;
    }));

    it('should return the default configuration if localStorage is not set', function() {
        spyOn(window.localStorage, 'getItem').and.returnValue(null);
        var config = layoutConfig.getConfig();
        expect(config).toEqual(defaultConfig);
    });

    it('should return the configuration from localStorage', function() {
        spyOn(window.localStorage, 'getItem').and.returnValue(localConfig);
        var config = layoutConfig.getConfig();

        expect(config.order[2]).toEqual('AppDirect');
        expect(config.count['AppDirect']).toEqual('20');
    });

    it('should save layout configuration to localStorage', function() {
        spyOn(window.localStorage, 'setItem');
        var usrConfig = {
            count: {
                AppDirect: '20',
                laughingsquid: '10',
                techcrunch: 20
            },
            order:['AppDirect', 'techcrunch', 'laughingsquid']
        };
        layoutConfig.saveConfig(usrConfig);
        expect(window.localStorage.setItem).toHaveBeenCalledWith('config', JSON.stringify(usrConfig));
    });

});
