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
    if (($scope.newTask.title.length < 5) || ($scope.newTask.body.length < 5)){
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

  $scope.toggleStatus = function(index){
    task = $scope.tasks[index]
    $scope.tasks[index].status = !task.status;
    Task.update($scope.tasks[index])
  }

  $scope.editTitle = function(index){
    var conteiner = $(document).find("#task-title-form-"+index),
        text = conteiner.prev().find('span').text()
    if (text.length < 5){ return false; }
    conteiner.prev().fadeOut();
    conteiner.find('input').val(text);
    conteiner.delay(350).fadeIn();
  }
  $scope.doneTitle = function(index){
    var conteiner = $(document).find("#task-title-view-"+index),
        text = conteiner.next().find('input').val()
    if (text.length < 5){ return false; }
    conteiner.next().fadeOut();
    conteiner.find('span').text(text);
    conteiner.delay(350).fadeIn();

    $scope.tasks[index].title = text;
    Task.update($scope.tasks[index])
  }

  $scope.editBody = function(index){
    var conteiner = $(document).find("#task-body-form-"+index),
        text = conteiner.prev().find('p').text()
    if (text.length < 5){ return false; }
    conteiner.prev().fadeOut();
    conteiner.find('textarea').text(text);
    conteiner.delay(350).fadeIn();
  }
  $scope.doneBody = function(index){
    var conteiner = $(document).find("#task-body-view-"+index),
        text = conteiner.next().find('textarea').val()
    if (text.length < 5){ return false; }
    conteiner.next().fadeOut();
    conteiner.find('p').text(text);
    conteiner.delay(350).fadeIn();

    $scope.tasks[index].body = text
    Task.update($scope.tasks[index])
  }

  $scope.filtered = $scope.tasks;
  $scope.filterProducts = function(prop, value) {
    if(!prop && !value) {
        $scope.filtered = $scope.tasks;
        return false;
    }
    $scope.filtered = $scope.tasks.filter(function(item) {
        return item[prop] === value;
    });
  };

}]);
