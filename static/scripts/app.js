angular
    .module('twitter-dashboard', ['ngMaterial', 'ngRoute', 'ngResource'])
    .config(function ($mdThemingProvider, $mdIconProvider, $routeProvider) {

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("twitter", "./assets/svg/twitter.svg", 512)

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('brown')
            .accentPalette('red');

        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController as ctrl'
            })
    });