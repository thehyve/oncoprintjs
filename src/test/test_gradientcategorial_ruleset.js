var OncoprintRuleSet = require("../js/oncoprintruleset.js");
var assert = require("chai").assert;
var $ = require('jquery');

describe("GradientCategoricalRuleSet", function() {

    var mixParams = {
        type: 'gradient+categorical',
        legend_label: "this is a label",
        value_key: "profile_data",
        value_range: [1,8],
        value_stop_points: [1,2,8],
        colors: [[255,0,0],[0,0,0],[0,255,0]],
        null_color: 'rgba(224,224,224,1)',
        category_key: "category"
    }

    var categoryDatum1 = {
        category: ">8",
        profile_data: 8,
        truncation: ">"
    }
    
    var gradientDatumLargest = {
        category: undefined,
        profile_data: 8,
        truncation: ""
    }

    var gradientDatumSmallest = {
        category: undefined,
        profile_data: 1,
        truncation: undefined
    }

    var naDatum = {
        category: undefined,
        profile_data: undefined,
        truncation: undefined
    }

    it("Is created from params", function() {
        var mixRuleSet = new OncoprintRuleSet(mixParams);
        assert.equal(mixRuleSet.constructor.name, "GradientCategoricalRuleSet");
    });

    it("Formats gradient value", function() {
        var mixRuleSet = new OncoprintRuleSet(mixParams);
        var elements = mixRuleSet.apply([gradientDatumLargest, gradientDatumSmallest, naDatum], 12, 12);
        assert.equal(elements.length, 3);
        assert.equal(elements[0][0].fill,'rgba(0,255,0)');
        assert.equal(elements[1][0].fill,'rgba(255,0,0,NaN)');
        assert.equal(elements[2][0].fill,'rgba(224,224,224,1)');
    });

    it("Formats categorical value", function() {
        var mixRuleSet = new OncoprintRuleSet(mixParams);
        var elements = mixRuleSet.apply([categoryDatum1], 12, 12);
        assert.equal(elements.length, 1);
    });

    it("Removes duplicate No Data rules", function() {
        var mixRuleSet = new OncoprintRuleSet(mixParams);
        var elements = mixRuleSet.getRulesWithId();
        assert.equal(elements.length, 1);
    });

});
