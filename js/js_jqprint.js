// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------

(function($) {
    var opt;

    $.fn.jqprint = function (options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options);
        var $element = (this instanceof jQuery) ? this : $(this);
        
        var $iframe = $("<iframe  />");
        if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }
        $iframe.appendTo("body");
        var doc = $iframe[0].contentWindow.document;
        
        doc.write("<link type='text/css' rel='stylesheet' href='css_print.css' />");
        
        if (opt.printContainer) { doc.write($element.outer()); }
        else { $element.each( function() { doc.write($(this).html()); }); }

        doc.close();
        
        ($iframe[0].contentWindow).focus();
        setTimeout( function() {
        		($iframe[0].contentWindow).print(); 
        	}, 1000
        );
    }
    
    $.fn.jqprint.defaults = {
		debug: false,
		importCSS: true, 
		printContainer: true,
	};

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    jQuery.fn.outer = function() {
      return $($('<div></div>').html(this.clone())).html();
    } 
})(jQuery);