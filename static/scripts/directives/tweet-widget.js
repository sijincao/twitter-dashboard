angular.module('twitter-dashboard').directive('tweetWidget', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            twttr.widgets.createTweet(scope.$eval(attrs.id), element[0], {
                cards: 'hidden'
            });
        }
    }
});
