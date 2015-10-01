app = new angular.module('app',['ngRoute' , 'angularUtils.directives.dirPagination', 'ngResource']);

app.config(['$routeProvider',function($routeProvider){
  $routeProvider.
  when('/',{controller:'mainController',
  templateUrl:'templates/main.html'}).
  when('/usuarios',{controller:'userController',
  templateUrl:'templates/user.html'}).
  when('/cliente',
  {controller:'clienteController',
  templateUrl:'templates/cliente.html'
})
.when('/cliente/novo',{controller:'addclienteController',
  templateUrl:'templates/addCliente.html'})
  .when('/cliente/:id',{
  controller:'editClienteController',
  templateUrl:'templates/editCliente.html'
}).
  when('/grupos',{controller:'grupoController',
  templateUrl:'templates/grupo.html'}).
  when('/mensagens',{controller:'mensagemController',
  templateUrl:'templates/grupo.html'}).
  when('/grupo_usuarios',{controller:'grupo_usuarioController',
  templateUrl:'templates/grupo_usuario.html'}).
  when('/login',{controller:'loginController',
  templateUrl:'templates/login.html'}).
  otherwise({redirectTo:'/'});
}]);
app.controller('mainController',function ($scope) {
  $scope.userName="Open";
})


.controller('clienteController',function ($scope,$http) {
  $scope.clientes = [];
  $scope.$on('$viewContentLoaded', function(){
    $http.get("api/cliente").then(function(response){
      console.log(response);
      $scope.clientes = response.data;
      $scope.viewby = 5;
      $scope.pageSize = 10;
      $scope.totalItems = $scope.clientes.length / $scope.viewby;
      $scope.currentPage = 1;
      $scope.itemsPerPage = $scope.viewby;
      $scope.maxSize = 5; //Number of pager buttons to show
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first paghe
      };
    },function(response){
      console.warn(response);
    });
  });

})
.controller('addclienteController',function ($scope,$http){
  ///adicionar o cliente
    $scope.addCliente = function() {
            $http.post('api/cliente',$scope.c)
            .success(function(data, status, headers, config){
               $('#sucessModal').modal('show');
               $scope.c="";
            }).error(function(data) {
               $('#erroModal').modal('show');
            });
        };
})

.controller('editClienteController', function($scope, $routeParams, $http) {
    $scope.c = $scope.clientes[$routeParams.id];
    console.log($routeParams.id);

$scope.editCliente = function(id){
  $http.put('api/cliente/'+$routeParams.id ,$scope.c)
  .success(function(data, status, headers, config){
     $('#sucessModal').modal('show');
     $scope.c="";
  }).error(function(data) {
     $('#erroModal').modal('show');
  });
};

});
