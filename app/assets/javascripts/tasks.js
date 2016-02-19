var taskCenter = angular.module('TaskCenter', ['ngResource']);

taskCenter.factory("Task", function($resource) {
  return $resource("tasks/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
})

taskCenter.controller("tasksController", function($scope, Task) {
  $scope.tasks = Task.index()

  $scope.addTask = function() {
    $scope.newTask
    task = Task.save($scope.newTask)

    $scope.tasks.push(task)
    $scope.newTask = {}
  }

  $scope.deleteTask = function(index) {

    task = $scope.tasks[index]
    Task.delete(task)
    $scope.tasks.splice(index, 1);
  }
})
