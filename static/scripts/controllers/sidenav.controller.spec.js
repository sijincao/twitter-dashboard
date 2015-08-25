'use strict';

describe('SideNav Controller Test', function() {

    var $controller;
    var $rootScope;
    var $q;
    var controller;
    var scope;
    var layoutConfig;

    beforeEach(angular.mock.module('twitter-dashboard'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _layoutConfig_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        $controller = _$controller_;
        scope = $rootScope.$new();
        scope.config = {
            count: {
                AppDirect: '10',
                laughingsquid: '10',
                techcrunch: '10'
            },
            order: ['laughingsquid', 'AppDirect', 'techcrunch']
        };
        spyOn(scope, '$emit');
        layoutConfig = _layoutConfig_;
        spyOn(layoutConfig, 'saveConfig');
    }));

    it('should correctly validate column orders', function() {
        controller = $controller('SideNavController', {
            $scope: scope,
            layoutConfig: layoutConfig
        });
        // duplicates in order, should not save to configuration
        scope.order = {
            AppDirect: 2,
            laughingsquid: 2,
            techcrunch: 1
        };
        $rootScope.$digest();
        scope.save();

        expect(layoutConfig.saveConfig).not.toHaveBeenCalled();
    });

    it('should save the correct configuration to localStorage', function() {
        controller = $controller('SideNavController', {
            $scope: scope,
            layoutConfig: layoutConfig
        });
        // duplicates in order, should not save to configuration
        scope.order = {
            AppDirect: 1,
            laughingsquid: 2,
            techcrunch: 3
        };
        scope.config.count.AppDirect = 30;
        $rootScope.$digest();
        scope.save();
        var config = {
            count: {
                AppDirect: 30,
                laughingsquid: '10',
                techcrunch: '10'
            },
            order: ['AppDirect', 'laughingsquid', 'techcrunch']
        };

        expect(layoutConfig.saveConfig).toHaveBeenCalledWith(config);
        expect(scope.$emit).toHaveBeenCalledWith('refresh');
    });
});