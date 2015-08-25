angular
    .module('twitter-dashboard')
    .controller('DashboardController', ['$scope', 'Tweets', '$mdSidenav', 'layoutConfig', '$q', '$timeout',function ($scope, Tweets, $mdSidenav, layoutConfig, $q, $timeout) {

        $scope.toggleSettings = function() {
            $mdSidenav('settings').toggle();
        };

        loadConfig();
        loadTweets();

        function loadTweets() {
            $scope.isLoading = true;

            var columnOne = $q.defer();
            var columnTwo = $q.defer();
            var columnThree = $q.defer();

            $q.all([columnOne.promise, columnTwo.promise, columnThree.promise]).then(function() {
                $timeout(function() {
                    $scope.isLoading = false;
                }, 1000);
            });

            Tweets.get({
                screen_name: $scope.layoutConfig.order[0],
                count: $scope.layoutConfig.count[$scope.layoutConfig.order[0]]
            }, function (result) {
                $scope.first_column_tweets = result.tweets;
                columnOne.resolve()
            });

            Tweets.get({
                screen_name: $scope.layoutConfig.order[1],
                count: $scope.layoutConfig.count[$scope.layoutConfig.order[1]]
            }, function (result) {
                $scope.second_column_tweets = result.tweets;
                columnTwo.resolve();
            });

            Tweets.get({
                screen_name: $scope.layoutConfig.order[2],
                count: $scope.layoutConfig.count[$scope.layoutConfig.order[2]]
            }, function (result) {
                $scope.third_column_tweets = result.tweets;
                columnThree.resolve();
            });
        }

        function loadConfig() {
            $scope.layoutConfig = layoutConfig.getConfig()
        }

        $scope.$on('refresh', function() {
            loadConfig();
            loadTweets();
        });

    }]);

