/**
 * 
 */
var app = angular.module('app', [ 'ngAnimate',                // support for CSS-based animations
    'ngTouch',                  //for touch-enabled devices
    'ui.grid',                  //data grid for AngularJS
    'ui.grid.pagination',       //data grid Pagination
    'ui.grid.resizeColumns',    //data grid Resize column
    'ui.grid.moveColumns',      //data grid Move column
    'ui.grid.pinning',          //data grid Pin column Left/Right
    'ui.grid.selection',        //data grid Select Rows
    'ui.grid.autoResize',       //data grid Enabled auto column Size
    'ui.grid.exporter'          //data grid Export Data
    ]);
app
		.controller(
				'mainCTRL',
				[
						'$scope',
						'$http',
						function($scope, $http) {
							var total = 0;
							$scope.gridOptions = [];

							// Pagination
							$scope.pagination = {
								paginationPageSizes : [25, 50, 75],
								ddlpageSize : 25,
								pageNumber : 1,
								pageSize : 25,
								totalItems : 0,

								getTotalPages : function() {
									return Math
											.ceil(total / this.pageSize);
								},
								pageSizeChange : function() {
									if (this.ddlpageSize == "All")
										this.pageSize = $scope.pagination.totalItems;
									else
										this.pageSize = this.ddlpageSize

									this.pageNumber = 1
									$scope.GetMessage();
								},
								firstPage : function() {
									if (this.pageNumber > 1) {
										this.pageNumber = 1
										$scope.GetMessage();
									}
								},
								nextPage : function() {
									if (this.pageNumber < this.getTotalPages()) {
										this.pageNumber++;
										$scope.GetMessage();
									}
								},
								previousPage : function() {
									if (this.pageNumber > 1) {
										this.pageNumber--;
										$scope.GetMessage();
									}
								},
								lastPage : function() {
									if (this.pageNumber >= 1) {
										this.pageNumber = this.getTotalPages();
										$scope.GetMessage();
									}
								}
							};
							$scope.GetMessage = function() {

								$scope.gridOptions = {
									enablePaginationControls : false,
									columnDefs : [ {
										name : "name",

									}, {
										name : "gender",
									}, {
										name : "company",
									} ],
									exporterAllDataFn : function() {
										return getPage(1,
												$scope.gridOptions.totalItems,
												paginationOptions.sort)
												.then(
														function() {
															$scope.gridOptions.useExternalPagination = false;
															$scope.gridOptions.useExternalSorting = false;
															getPage = null;
														});
									},
								};

								var NextPage = (($scope.pagination.pageNumber - 1) * $scope.pagination.pageSize);
								var NextPageSize = $scope.pagination.pageSize;
								$http.get(
										'http://localhost:8082/ui_grid/data?param1='
												+ NextPage + '&param2='
												+ NextPageSize).success(
										function(response) {
											$scope.pagination.totalItems=response.length;
											$scope.gridOptions.data = response;
											$scope.loaderMore = false;
										}, function(error) {
											console.log("Error: " + error);
										});

							}
							$scope.totalSize = function() {
								$http.get(
										'http://localhost:8082/ui_grid/totalPages').success(
										function(response) {
											console.log(response);
											total = response;
											
										}, function(error) {
											console.log("Error: " + error);
										});


							};
							// Default Load
							$scope.totalSize();
							$scope.GetMessage();

						
						} ])