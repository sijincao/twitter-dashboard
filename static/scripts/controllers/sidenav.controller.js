angular
    .module('twitter-dashboard')
    .controller('SideNavController', ['$scope', 'layoutConfig', '$mdSidenav', function($scope, layoutConfig, $mdSidenav) {

        initSettings();

        $scope.save = function() {
            if(validateColumnOrder()){
                layoutConfig.saveConfig($scope.config);
                $scope.$emit('refresh');
                $mdSidenav('settings').toggle();
            }
        };

        $scope.cancel = function() {
            initSettings();     // resotre settings from localStorage
            $mdSidenav('settings').toggle();
        };

        function initSettings() {
            $scope.config = layoutConfig.getConfig();

            $scope.order = {
                AppDirect: $scope.config.order.indexOf('AppDirect') + 1,
                laughingsquid: $scope.config.order.indexOf('laughingsquid') + 1,
                techcrunch: $scope.config.order.indexOf('techcrunch') + 1
            };
        }

        function validateColumnOrder() {
            if(validateDups($scope.order)) {
                $scope.config.order = [];
                for (var i = 1; i < 4; i++) {
                    $scope.config.order.push(getKeyByValue($scope.order, i));
                }
                return true;
            } else {
                alert('please set the correct column order, no duplicates...');
                return false;
            }
        }

        function validateDups(obj) {
            var values = [];
            var dups = [];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                   values.push(obj[prop]);
                }
            }

            values.forEach(function(val){
                if (dups.indexOf(val) < 0) {
                    dups.push(val);
                }
            });
            return values.length === dups.length;
        }

        function getKeyByValue(obj, value) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] === value)
                        return prop;
                }
            }
        }
    }]);

