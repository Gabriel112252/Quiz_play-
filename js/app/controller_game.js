m.controller("MyController", ["$scope", "$http", function ($scope, $http) {
    $scope.title = "Radio Button Quiz";
    $scope.level = 0;
    $scope.mix = function (array) {
      let counter = array.length
      while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;

      }
      return array;
    };

    var score = 0;

    $scope.placar = function (){
      score = score + 1;
      alert("ACERTOU MANO!, seu placar atual é = "+ score);
    }

    $scope.placarFinal = function(){
      alert("fim de jogo, seu placar final é ="+ score);
    }

    $scope.nextQuestion = function () {
      $scope.question = $scope.allQuestions[$scope.level];
      $scope.options = [];
      $scope.correta = $scope.question.correct;
      $scope.options.push($scope.question.incorrecta);
      $scope.options.push($scope.question.incorrectb);
      $scope.options.push($scope.question.incorrectc);
      $scope.options.push($scope.question.correct);
      $scope.options = $scope.mix($scope.options);
    };

    var url = "https://serene-garden-00468.herokuapp.com/questions/";
    $http.get(url).success(function (response) {
      $scope.allQuestions = response;
      $scope.nextQuestion();

    });

    $scope.optionSelected = function () {
      $scope.selected = true;
    }



    $scope.questionAnswered = function () {
      if ($scope.resp == $scope.correta)
        $scope.placar();
      else
        alert("ah não mano =(");
        
      if ($scope.allQuestions.length == ++$scope.level) {
        $scope.placarFinal();
        return;
      }

      $scope.nextQuestion();
      $scope.resp = null;

    }

  }]);//fim do controller