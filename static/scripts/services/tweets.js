angular.module('twitter-dashboard').factory('Tweets', ['$resource', function ($resource) {
    return $resource('/tweets/:screen_name', null, {});
}]);