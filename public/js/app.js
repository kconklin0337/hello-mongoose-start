angular.module('todoApp', []);

angular.module('todoApp')
       .controller('TodoController', TodoController);

TodoController.$inject = ['$scope', '$http'];

function TodoController($scope, $http){
     $scope.todos = [];
     initTodos();

  //Create a new todo
  $scope.saveTodo = function(){
    $http.post('/api/todos', $scope.newTodo)
          .then(function(response){
          initTodos();
          $scope.newTodo = {};
        })
        .catch(function(err){
          console.err(err);
        });
  }

$scope.deleteTodo = function(todo) {
      var id = todo._id;
      $http.delete('/api/todos/'+id)
           .then(function(response){
           initTodos();
         })
           .catch(function(err){
           console.err(err);
         });
  };

  function initTodos(){
    $http.get('/api/todos')
        .then(function(response){
          console.log(response);
          $scope.todos = response.data;
        })
        .catch(function(err){
          console.err(err);
        });
  }
}
