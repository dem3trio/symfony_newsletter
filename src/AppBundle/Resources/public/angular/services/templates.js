(function (window, angular) {
    'use strict';

    angular.module('App').service('$templates', [
        '$http', '$q',
        function ($http, $q)
        {
            var templatesDefer;
            var baseTemplate = '/template';

            /**
             * Fetch contacts on server or from promise
             * @returns {promise}
             */
            function fetch ()
            {
                if (!templatesDefer) {
                    templatesDefer = $q.defer();
                    $http.get(baseTemplate + '/list') // hardcoded url
                        .success(templatesLoadSuccess)
                        .error(templatesLoadError);
                }

                /**
                 * Callback called when http request was successful
                 * @param response
                 */
                function templatesLoadSuccess(response)
                {
                    templatesDefer.resolve(response);
                    /*var contacts = [];

                    angular.forEach(response, function (value, key) {

                    });

                    templatesDefer.resolve(contacts);*/
                }

                /**
                 * Callback to be called when the http request failed
                 * @param response
                 */
                function templatesLoadError(response)
                {
                    templatesDefer.reject('Could not load the contacts from the server');
                }

                return templatesDefer.promise;
            }

            /**
             * Find all templates
             * @return {promise}
             */
            function findAll()
            {
                var findAllDefer = $q.defer();

                fetch().then(fetchSuccess, fetchFailure);

                /**
                 * Callback called when fetching contacts was successful
                 * @param contacts
                 */
                function fetchSuccess(templates)
                {
                    findAllDefer.resolve(templates);
                }

                /**
                 * Callback called when fetching the contacts failed
                 * @param reason
                 */
                function fetchFailure(reason)
                {
                    findAllDefer.reject('Could not find all templates: ' + reason);
                }

                return findAllDefer.promise;
            }

            /**
             * Create new template on server
             * @return {promise}
             */
            function create(contact, token)
            {
                var createDefer = $q.defer();

                if (!contact instanceof Contact) {
                    createDefer.reject('Not a valid contact');
                } else {

                    $http({
                        method: 'POST',
                        url: '/contact/add',
                        data: $.extend({ _token: token }, contact),
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                        .success(contactCreateSuccess)
                        .error(contactCreateError);
                }


                function contactCreateSuccess()
                {
                    templatesDefer = null; // clear contacts
                    createDefer.resolve();
                }

                function contactCreateError(errors)
                {
                    createDefer.reject(errors);
                }

                return createDefer.promise;
            }

            /**
             * Update existing contact on server
             * @return {promise}
             */
            function update(contact, token)
            {
                var updateDefer = $q.defer();

                if (!contact instanceof Contact) {
                    updateDefer.reject('Not a valid contact');
                } else {

                    $http({
                        method: 'POST',
                        url: '/contact/update',
                        data: $.extend({ _token: token }, contact),
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                        .success(contactUpdateSuccess)
                        .error(contactUpdateError);
                }


                function contactUpdateSuccess()
                {
                    templatesDefer = null; // clear contacts
                    updateDefer.resolve();
                }

                function contactUpdateError(errors)
                {
                    updateDefer.reject(errors);
                }

                return updateDefer.promise;
            }

            return {
                findAll: findAll,
                create: create,
                update: update
            }
        }
    ]);

})(window, angular);