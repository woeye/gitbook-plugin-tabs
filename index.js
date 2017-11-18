var _ = require('lodash');
var cheerio = require('cheerio');

module.exports = {
    website: {
        assets: "./assets",
        js: [
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
          "tabs.js"
        ],
        css: [
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
          "tabs.css"
        ]
    },

    // Map of hooks
    hooks: {},

    // Map of new blocks
    blocks: {
        tabs: {
            blocks: ['content'],
            process: function(block) {
                console.log(block);
                var content = "<ul class='nav nav-tabs' role='tablist'>";
                var classData = "active";
                _.map(block.kwargs, function(value, key) {
                    if (!_.startsWith(key, "__")) {
                        content += "<li role='presentation' class='" + classData + "'><a href='#" + key + "' aria-controls='" + key + "' role='tab' data-toggle='tab'>" + value + "</a></li>";
                        classData = "";
                    }
                });
                content += "</ul>";
                content +="<div class='tab-content'>";
                var activeState = 'active';
                _.map(block.blocks, function(b) {
                    // console.log(b);
                    content += "<div role='tabpanel' class='tab-pane " + activeState + "' id='" + b.args[0] + "'>" + b.body + "</div>";
                    activeState = "";
                });
                content += "</div>";
                console.log(content);
                return content;
            }
        }
    },

    // Map of new filters
    filters: {}
};
