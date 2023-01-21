const app = angular.module('CubeTimer', []);

app.controller('Timer', function ($scope) {
  $scope.scramble = '';
  $scope.pressingSpace = false;
  $scope.pressingArrow = false;
  
  $scope.startTime = undefined;
  $scope.timer = '00:00';
  $scope.running = false;

  $scope.tick = {};

  $scope.solves = [];

  document.addEventListener('keydown', function(event){
    if($scope.running && event.key == ' ') {
      clearInterval($scope.tick);
      $scope.running = false;
      $scope.pressingRight = false;
      $scope.pressingLeft = false;

      $scope.solves.push({
        time: $scope.timer,
        scramble: ($scope.scramble) ? $scope.scramble : 'Custom'
      });

      $scope.scramble = '';

    } else if(!$scope.running) {

      if(event.code === 'ShiftLeft') {
        $scope.pressingLeft = true;
      }
  
      if(event.code === 'ShiftRight') {
        $scope.pressingRight = true;
      }
    }

    $scope.$apply();
  });
  
  function formatTime(millis){
    let seconds = Math.floor(millis / 1000).toString();
    let minutes = Math.floor(seconds / 60).toString();
    let micro = (millis.toString()).substr(-3, 2);

    return `${minutes > 0 ? minutes+':':''}${seconds}:${micro}`;
  }

  document.addEventListener('keyup', function(event){
    if(!$scope.running){
      if($scope.pressingRight && $scope.pressingLeft && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')){
        $scope.startTime = Date.now();    
        $scope.running = true;

        $scope.pressingArrow = false;
        $scope.pressingSpace = false;

        $scope.tick = setInterval(() => {
          $scope.elapsedTime = Date.now() - $scope.startTime;
          $scope.timer = formatTime($scope.elapsedTime);

          $scope.$apply();
        }, 1000 / 60);
        console.log("Set Tick");
      } 
    
      if(event.code === 'ShiftLeft') {
        $scope.pressingLeft = false;
        $scope.$apply();
      }
      
      if(event.code === 'ShiftRight') {
        $scope.pressingRight = false;
        $scope.$apply();
      }
    }
  });

  $scope.delete = function (index) {
    let doIt = confirm("Are you sure?");
    if(doIt){
      $scope.solves.splice(index,1);
    }
  }

  $scope.getScramble = function (){
    let scramble = '';
    for(let i = 0; i < 25; i++) {
      let value = x = Math.random;
      scramble += 'RLUDFB'[0 | value() * 6] + " '2"[0 | value() * 3] + ' ';
    }
    return scramble;
  }
});
