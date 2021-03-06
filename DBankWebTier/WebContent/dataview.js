angular.module('app').controller(
		"dataCtrl",
		[
				'$scope',
				'$http',
				'LoginService',
				function($scope, $http, LoginService) {

					$scope.selectedView = 'homeView';

					$scope.logInStatus = 0;
					$scope.loggedInUser = "";

					$scope.selectedFilter = "";
					$scope.filteredInstrumentData = {};

					$scope.counterpartyDeals = {};
					$scope.filterOptions = [];

					$scope.dealsByDate = {};
					$scope.instrumentNames = [];
					$scope.selectedInstrument = "";
					$scope.filteredPriceData = {};

					$scope.avgPriceData = {};
					$scope.netProfitLossData={};

					$scope.netTradeData = {};

					$http.get("CounterPartyNames").then(function(response) {

						if (response.data == null) {
							console.log("counterpartynames null: ", response);

						} else {
							$scope.filterOptions = response.data;
							console.log("counterpartyname: ", response);
						}

					});

					$http.get("CounterPartyNames").then(function(response) {

						if (response.data == null) {
							console.log("counterpartynames null: ", response);

						} else {
							$scope.filterOptions = response.data;
							console.log("counterpartyname: ", response);
						}

					});

					$http.get("InstrumentNames").then(function(response) {

						if (response.data == null) {
							console.log("instrumentnames null: ", response);

						} else {
							$scope.instrumentNames = response.data;
							console.log("instrumentname: ", response);
						}

					});

					$http.get("BAServlet4").then(function(response) {

						if (response.data == null) {
							console.log("avg price data null: ", response);

						} else {
							$scope.avgPriceData = response.data;
							console.log("avg price data: ", response);
						}

					});
					
					$http.get("BAServlet6").then(function(response) {

						if (response.data == null) {
							console.log("avg price data null: ", response);

						} else {
							$scope.netProfitLossData = response.data;
							console.log("avg price data: ", response);
						}

					});

					$scope.$on('loginFail', function(event, data) {
						// you could inspect the data to see if what you care
						// about changed, or just update your own scope
						$scope.logInStatus = LoginService.getLoginStatus();
					});

					// different event names let you group your code and logic
					// by what happened
					$scope.$on('loginSuccess', function(event, data) {
						$scope.logInStatus = LoginService.getLoginStatus();
						$scope.loggedInUser = data;
					});

					$scope.changedSelectedFilter = function(newFilter) {
						$scope.selectedFilter = newFilter;

						$http({
							method : 'GET',
							url : 'BAServlet2',
							params : {
								"selected_id" : $scope.selectedFilter
							}
						}).then(function successCallback(response) {
							console.log("selected_id", $scope.selectedFilter);
							console.log(response);
							$scope.filteredInstrumentData = response.data;
						}, function errorCallback(response) {
							console.log(response);

						});
					};

					$scope.changedSelectedInstrument = function(newInstrument) {
						$scope.selectedInstrument = newInstrument;

						$http({
							method : 'GET',
							url : 'BAServlet3',
							params : {
								"selected_id" : $scope.selectedInstrument
							}
						}).then(
								function successCallback(response) {
									console.log("selected_instrument",
											$scope.selectedInstrument);
									console.log(response);
									$scope.filteredPriceData = response.data;
								}, function errorCallback(response) {
									console.log(response);

								});
					};

					$scope.changedSelectedFilterforTradeData = function(newFilter) {
						$scope.selectedFilter = newFilter;

						$http({
							method : 'GET',
							url : 'BAServlet5',
							params : {
								"selected_id" : $scope.selectedFilter
							}
						}).then(function successCallback(response) {
							console.log("selected filter for trade data: ", $scope.selectedFilter);
							console.log(response);
							$scope.netTradeData = response.data;
						}, function errorCallback(response) {
							console.log("error in filter for net trade data: ", response);

						});
					};

					
					
					$scope.setFocus = function(view) {
						if (view == 'filterView') {
							$scope.filteredInstrumentData = {};
						} else if (view == 'chartView') {
							$scope.filteredPriceData = {};
						} else if (view == 'tradesView') {
							$scope.selectedFilter = "";
							$scope.netTradeData = {};
						}
						$scope.selectedView = view;

					};

				} ]);