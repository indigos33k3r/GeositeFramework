﻿require({
    packages: [
        {
            name: "underscore",
            location: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3",
            main: "underscore-min"
        }
    ]
});

define(
    ["dojo/_base/declare", "framework/PluginBase", "underscore"],
    function (declare, PluginBase, _) {
        return declare(PluginBase, {
            toolbarName: "Map Expand/Shrink",
            fullName: "Expand/shrink the map",
            toolbarType: "map",
            allowIdentifyWhenActive: true,
            closeOthersWhenActive: false,

            initialize: function (args) {
                declare.safeMixin(this, args);
                this.$sidebar = $('.nav-apps.plugins');
                this.manualSidebarNarrowClassName = 'nav-apps-narrow-manual';

                this.bindEvents();
            },

            bindEvents: function() {
                this.app.dispatcher.on('map-size:change', this.updateIcon, this);

                var debouncedUpdateIcon = _.debounce(_.bind(this.updateIcon, this), 250);
                $(window).resize(debouncedUpdateIcon);
            },

            renderLauncher: function () {
                var html = '<div id="map-expand"><i class="icon-resize-full"></i></div>';

                return html;
            },

            activate: function () {
                if (this.isSidebarNarrow()) {
                    this.$sidebar.removeClass(this.manualSidebarNarrowClassName);
                } else {
                    this.$sidebar.addClass(this.manualSidebarNarrowClassName);
                }

                this.updateIcon();
            },

            getClassName: function() {
                if (this.isSidebarNarrow()) {
                    return 'icon-resize-small';
                }

                return 'icon-resize-full';
            },

            isSidebarNarrow: function() {
                return this.$sidebar.hasClass(this.manualSidebarNarrowClassName);
            },

            updateIcon: function() {
                var $container = $('#map-expand');

                $container.find('i').attr('class', this.getClassName());
            }
        });
    }
);
