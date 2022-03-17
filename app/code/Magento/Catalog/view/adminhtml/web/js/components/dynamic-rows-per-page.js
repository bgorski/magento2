/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'Magento_Ui/js/dynamic-rows/dynamic-rows',
    'underscore',
    'mageUtils',
    'uiLayout'
], function (DynamicRows, _, utils, layout) {
    'use strict';

    return DynamicRows.extend({
        defaults: {
            sizesConfig: {
                component: 'Magento_Ui/js/grid/paging/sizes',
                name: '${ $.name }_sizes',
                options: {
                    '20': {
                        value: 20,
                        label: 20
                    },
                    '30': {
                        value: 30,
                        label: 30
                    },
                    '50': {
                        value: 50,
                        label: 50
                    },
                    '100': {
                        value: 100,
                        label: 100
                    },
                    '200': {
                        value: 200,
                        label: 200
                    }
                },
                storageConfig: {
                    provider: '${ $.storageConfig.provider }',
                    namespace: '${ $.storageConfig.namespace }'
                },
                enabled: false
            },
            links: {
                options: '${ $.sizesConfig.name }:options',
                perPageSize: '${ $.sizesConfig.name }:value'
            },
            statefull: {
                perPageSize: true
            },
            listens: {
                'perPageSize': 'onPageSizeChange',
            },
            modules: {
                sizes: '${ $.sizesConfig.name }'
            }
        },

        /**
         * Initializes paging component.
         *
         * @returns {Paging} Chainable.
         */
        initialize: function () {
            this._super()
                .initSizes();

            return this;
        },

        /**
         * Initializes sizes component.
         *
         * @returns {Paging} Chainable.
         */
        initSizes: function () {
            if (this.sizesConfig.enabled) {
                layout([this.sizesConfig]);
            }

            return this;
        },

        /**
         * Initializes observable properties.
         *
         * @returns {Paging} Chainable.
         */
        initObservable: function () {
            this._super()
                .track([
                    'perPageSize'
                ]);

            return this;
        },

        /**
         * Handles changes of the page size.
         */
        onPageSizeChange: function () {
            if(!this.containers.length) {
                return;
            }
            if(this.perPageSize !== undefined) {
                this.pageSize = this.perPageSize;
                this.reload();
            } else {
                this.perPageSize = this.pageSize;
            }
        },
    });
});
