(function (window, angular) {
    'use strict';

    angular.module('App').service('$session', [
        '$http', '$q',
        function ($http, $q)
        {
            /**
             * Create new template on server
             * @return {promise}
             */
            function get()
            {
                var getDefer = $q.defer();

                    $http({
                        method: 'GET',
                        url: '/session/get'
                    })
                        .success(saveSuccess)
                        .error(saveError);

                function saveSuccess(data)
                {
                    getDefer.resolve(data);
                }

                function saveError(errors)
                {
                    getDefer.reject(errors);
                }

                return getDefer.promise;
            }

            /**
             * Create new template on server
             * @return {promise}
             */
            function save(variables)
            {
                var saveDefer = $q.defer();


                    $http({
                        method: 'POST',
                        url: '/session/save',
                        data: variables,
                        headers: {'Content-Type': 'text/json'}
                    })
                        .success(saveSuccess)
                        .error(saveError);



                function saveSuccess()
                {
                    saveDefer.resolve();
                }

                function saveError(errors)
                {
                    saveDefer.reject(errors);
                }

                return saveDefer.promise;
            }

            /**
             * Update existing contact on server
             * @return {promise}
             */
            function clear()
            {
                var clearDefer = $q.defer();

                    $http({
                        method: 'POST',
                        url: '/session/clear',
                        data: {}
                    })
                        .success(clearSuccess)
                        .error(clearError);



                function clearSuccess()
                {
                    clearDefer.resolve();
                }

                function clearError(errors)
                {
                    clearDefer.reject(errors);
                }

                return clearDefer.promise;
            }

            return {
                clear: clear,
                save: save,
                get: get
            }
        }
    ]);

})(window, angular);