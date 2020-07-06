var app = angular.module("meuModulo", []);
app.controller("indexController", function ($scope, $http){
    var url = "https://serene-garden-00468.herokuapp.com/questions/";
    $http.get(url).success(function (response){
        $scope.questions = response;
    });

        $scope.carregarQuestion = function(){
            $http.get(url).success(function (response){
            $scope.questions = response;
        });
    }


    //var init = function(){
      //  $scope.questions.forEach(function(question){
        //    question.forca = forca(question);
        //});
        //limpaform()
    //}
    
    //var forca = function(question){
    //    var forca = (question.taijutsu + question.ninjutsu + question.genjutsu)/3;
    //    return forca.toFixed(2);

    //}

    $scope.abreAddquestion = function(){
        $scope.editando = false;
        limpaform();
        $("#modal1").openModal();
    }

    $scope.addquestion = function(question){
        $http.post("https://serene-garden-00468.herokuapp.com/questions/",question).then($scope.carregarQuestion);
        //$scope.questions.push(question);
        $('#modal1').closeModal();
        limpaform(); 
    }

    $scope.editando = false;

    var questionEditar;

    $scope.editarquestion = function(question){
        console.log(question);
        $scope.editando = true;
        angular.copy(question,$scope.question);
        //console.log(test)
        $("#modal1").openModal();
        questionEditar = question;
        
    }

    $scope.salvarquestion = function(question){
        questionEditar.quest = question.quest;
        questionEditar.correct = question.correct;
        questionEditar.incorrecta = question.incorrecta;
        questionEditar.incorrectb = question.incorrectb;
        questionEditar.incorrectc = question.incorrectc;
        $('#modal1').closeModal();
    }

    $scope.deletarquestion = function(question,i){
        console.log(i);
        console.log(question);
        // for(var index in $scope.questions){
        //     var aux = $scope.questions[index];
        //     console.log($scope.questions.id);
        //     if(question === aux){
        //         $scope.questions.splice(index,1);
        //     }
        // }
        $scope.questions.splice(i,1);
        // $http.delete("https://serene-garden-00468.herokuapp.com/questions/"+question.id);
        $http.delete(`https://serene-garden-00468.herokuapp.com/questions/${question.id}`,function (response) {
            console.log(response);
        });
    }

    var limpaform = function(){
        $scope.question = {quest:"", correct:"", incorrecta:"", incorrectb:"", incorrectc:""};
    }
    //init();

});// Fim do Controller