var taskCenter = angular.module('TaskCenter', ['ngResource']);

taskCenter.factory("Task", function($resource) {
  return $resource("tasks/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' },
    //toggle_status:  { method: 'PUT', responseType: 'json' }
  });
})

taskCenter.controller("tasksController", ['$scope', 'Task', function($scope, Task) {
  $scope.tasks = Task.index()

  $scope.addTask = function() {
    $scope.newTask
    if ($scope.newTask == undefined){
      return false;
    }
    task = Task.save($scope.newTask)
    $scope.tasks.push(task)
    $scope.newTask = {}
  }

  $scope.deleteTask = function(index) {
    task = $scope.tasks[index]
    Task.delete(task)
    $scope.tasks.splice(index, 1);
  }

  $scope.editTask = function(index) {
    task = $scope.tasks[index]
    console.log(task);
    //Task.delete(task)
    //$scope.tasks.splice(index, 1);
  }

  $scope.toggleStatus = function(index){
    task = $scope.tasks[index]
    $scope.tasks[index].status = !task.status;
    Task.update($scope.tasks[index])
  }
  $scope.filtered = $scope.tasks;
  $scope.filterProducts = function(prop, value) {
            if(!prop && !value) {
                $scope.filtered = $scope.tasks;
                return;
            }

        $scope.filtered = $scope.tasks.filter(function(item) {
            return item[prop] === value;

        });
    };

}]);
