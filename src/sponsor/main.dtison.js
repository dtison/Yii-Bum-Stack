/**
 *  src/sponsor/main.js
 */


// Use ECMAScript 5 Strict Mode
"use strict";


/*  For Yii: Override Backbone.Model.toJSON to include CSRF cookie validation */
Backbone.Model.prototype.toJSON = function () {
    return $('meta[name=csrf]').length ? _(_.clone(this.attributes)).extend({
        // yii defaults to YII_CSRF_TOKEN, we can easily change that on main.php
        'YII_CSRF_TOKEN':$('meta[name=csrf]').attr('content')
    }) : _.clone(this.attributes);
};



//  Start Marionette

var BumApp = new Marionette.Application();
console.log ('App is type: ' + typeof(BumApp));


BumApp.addRegions({
    mainRegion: "#main-region"
});


BumApp.StaticView = Marionette.ItemView.extend({
    template: "#static-template"
});

BumApp.on("initialize:after", function(){
    var staticView = new BumApp.StaticView();
    BumApp.mainRegion.show(staticView);
});


// This goes to models.js?

BumApp.Sponsor = Backbone.Model.extend({});












// Move to footer
//BumApp.start();







//GN.App.router = Router;



  //  Backbone.history.start({ pushState: Modernizr.history, silent: true });




/*
 App.modalRegion.on("show", function() {
 this.$el.hide();
 this.$el.fadeIn("fast");
 });

 // TODO:  Move these to libraries
 // Mcfar - for modal windows
 App.modalRegion.on("show", function() {
 this.$el.hide();
 this.$el.fadeIn("fast");
 });
 App.modalRegion.on("close", function() {
 this.$el.fadeOut("fast");
 })

 // Mcfar - makes navbar relative menu item active

 App.contentRegion.on("show", function(view) {
 this.$el.hide();   this.$el.fadeIn("fast");
 if (view.route) {
 var route = view.route;
 var a = 'a[data-nav="'+
 route +
 '"]';
 var $a = $(a);
 $('li').removeClass('active');
 $a.parent('li').addClass('active');
 }


 });

 */


