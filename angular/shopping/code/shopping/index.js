/**
 * Created by Inory on 2017/7/8.
 */
angular.module('shoppingList',[])
    .service('shoppingData',function () {
        return [{
            id:1000,
            name:'iphone5s',
            quantity:3,
            price:4300,
            totalPrice:12900
        },
        {
            id:3300,
            name:'iphone5',
            quantity:30,
            price:3300,
            totalPrice:99000
        },
        {
            id:232,
            name:'imac',
            quantity:4,
            price:23000,
            totalPrice:92000
        },
        {
            id:1400,
            name:'ipad',
            quantity:5,
            price:6900,
            totalPrice:24500
        }];
    })
    .controller('shoppingController',function ($scope,shoppingData) {
        $scope.shoppingData=shoppingData;

        /*
        *计算总价
        * */
        $scope.getTotalPrice=function () {
            var total=0;
            angular.forEach($scope.shoppingData,function (item,key) {
                total+=parseInt(item.quantity*item.price);
            });
            return total;
        };

        /*
         *计算总数
         * */
        $scope.getTotalQuantity=function () {
            var total=0;
            angular.forEach($scope.shoppingData,function (item,key) {
                total+=parseInt(item.quantity);
            });
            return total;
        };

        /*
        *删除点击行
        * */
        $scope.remove=function (id) {
            var index=-1;
            angular.forEach($scope.shoppingData,function (item,key) {
                if (item.id===id){
                    index=key;
                }
            });
            if(index!==-1){
                $scope.shoppingData.splice(index,1);
            }
        };


    })
;