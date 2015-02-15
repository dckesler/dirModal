var app = angular.module("weatherApp");
app.controller("homeCtrl", function($scope, $location){
    var test = "controller";

    var vm = this;

    /*Example hard coded data*/
    vm.stuffers = [
        { label: "Taken 4", value: {data: "Taken 4 script data"}, group: "script", author: "Daniel Kesler"},
        { label: "King Fi Pinda", value: {data: "King Fi Pinda script data"}, group: "script", author: "PJ Targun"},
        { label: "Jurassic Park", value: {data: "Jurassic Park's script data"}, group: "script", author: "Jess Haeddoo"},
        { label: "Daniel Kesler", value:{data: "Dan's User Data"}, group: "user"},
        { label: "PJ Targun", value:{data: "Pj's User Data"}, group: "user"},
        { label: "Jess Haeddoo", value: {data: "Jess' user Data"}, group: "user"},
        { label: "Indie", value: {data: "All the Indie scripts or whatever"}, group: "genre"},
        { label: "Romantic Comedic Slasher Drama", value: {data: "All the Romantic Comedic Slasher Drama scripts or whatever"}, group: "genre"},
        { label: "Action", value: {data: "All the Action scripts or whatever"}, group: "genre"}
    ];

    /* Function that returns what the group's tag looks like based on the group property of the item */
    vm.groupFn = function(item){
        switch(item.group) {
            case "user":
                return '<div class="groupIcon"><i class="fa fa-user"></i></div>';
            case "genre":
                return '<div class="groupIcon"><i class="fa fa-tag"></i></div>';
            case "script":
                return '';

        }
    };

    vm.crank = [{title: "Oliver", content: "Krill this frenetic some the while however" +
    " depending globefish this alas weasel tangibly wore wildebeest gull following toward unanimously" +
    " besides hippopotamus panda affectionately much much cuckoo insistent jauntily baboon oversaw because boa.+" +
    "Satanically baboon much bridled as far oversold congratulated koala the well some yikes some other less abundant" +
    " iguanodon panther yet kangaroo articulately the however so therefore some hound voally grasshopper abhorrent soothing affectionate." +
    "This terrier rat darn hence disrespectfully until sexily much that learned less vicious hey resolutely forward" +
    " so the dubious while well clung winked temperate eloquently save." +
    "Gull less far brave grandly amidst ouch much admirable imminent in more eagle unselfishly one" +
    " far prior foul shrewd when some jeepers far the and a." +
    "Genially wherever bombastic tiger up next cockatoo then lewdly hired dear goodness far crud cantankerously" +
    " hey punctilious but scorpion ludicrously some darn less mongoose sobbed esoterically showily alas preparatory."},
        {title: "Olivier", content: "C'est un bête!"},
        {title: "Samantha", content: "She's alright by me"}];

    $scope.$watch(function(){
        return vm.input;
    }, function(){
        if(vm.input && vm.input.length === 1){
            /*Put function to run with selected data here*/
            console.log(vm.input[0]);
            /**/
        } else if (vm.input && vm.input.length > 1){
            vm.input = [vm.input[0]]
        }
    });



});