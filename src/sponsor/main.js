    /**
     * App Creation
     * @type {Marionette.Application}
     */
    var BumApp = new Marionette.Application();


    /**
     * Backbone Model.toJSON OVERRIDE for Yii
     * @returns {*|void|Object} YII_CSRF_TOKEN - default Yii Token
     */
    Backbone.Model.prototype.toJSON = function () {
        return $('meta[name=csrf]').length ? _(_.clone(this.attributes)).extend({
            'YII_CSRF_TOKEN':$('meta[name=csrf]').attr('content')
        }) : _.clone(this.attributes);
    };

    /**
     * Navigation Setup
     */
    BumApp.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route,options);
    }

    BumApp.getCurrentRoute = function() {
        return Backbone.history.fragment;
    }


    /**
     * Region Setup
     */
    BumApp.addRegions({
        contentRegion  : '#main-content',
        modalRegion : "#modal",
        sidebarRegion : '#sidebar-nav'
    });


    /**
     * Regional Events
     */
    // Animators
    BumApp.modalRegion.on("show", function() {
        this.$el.hide();
        this.$el.fadeIn("fast");
    });
    BumApp.modalRegion.on("close", function() {
        this.$el.fadeOut("fast");
    })

    // Highlighter of current active nav (route property)
    BumApp.contentRegion.on("show", function(view) {
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
        // Make sure modalRegion gets closed
        BumApp.modalRegion.close();
    });

    // Tentative file name: lib.js
    // Common Events
    var lib = {};
    lib.navhref = function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');
        BumApp.navigate($(e.target).attr('href'), {trigger:true});
    }

    // Tentative file name: controllers.js
    /**
     * Controllers Setup
     *  For now aka Marionette ItemViews
     */
    var Controllers = {};

    Controllers.SponsorForm = Marionette.ItemView.extend({
        template: "#sponsorForm",
        //  Note route is a workaround to get active nav to work.
        route: "dashboard/sponsor/new",
        events: {
            "click a": function(e) {
                lib.navhref(e);
            }
        }
    });
    Controllers.Sponsors = Marionette.ItemView.extend({
        template: "#sponsors",
        route: "dashboard/sponsor",
        events: {
            "click a": function(e) {
                lib.navhref(e);
            }
        }
    });
    Controllers.Sidebar = Marionette.ItemView.extend({
        template: "#sidebar",
        events: {
            "click a": function(e) {
                e.preventDefault();
                var $a = $(e.target);
                BumApp.navigate($a.data('nav'), {trigger:true});
            }
        }
    });


    // Tentative file name route.js

    /**
     * Router setup
     */

   /*  One thing that does suck about Marionette - routes
       The function specified in appRoutes is really only accessible
       *after* you instantiate:
        new Router({controller: RouterDefinition});
        RouterDefinition is Router = below
        Its really saying - the property name within the thing that gets passed in.
        (In the AddInitializer())
        */
   var Router = Marionette.AppRouter.extend({

        appRoutes: {
            'dashboard/sponsor': 'actionSponsorList',
            'dashboard/sponsor/new' : 'actionSponsorForm'
        }

    });


    /**
     * Router Controller
     */
    var RouteController = {
        actionSponsorList: function() {
            var sponsors = new Controllers.Sponsors();
            BumApp.contentRegion.show(sponsors);
        },
        actionSponsorForm: function() {
            var sponsorForm = new Controllers.SponsorForm();
            BumApp.contentRegion.show(sponsorForm);
        }
    };


    /**
     * Initializers  - for post-start() operations
     */
    BumApp.addInitializer(function() {
       BumApp.router = new Router({ controller:RouteController});
        var sidebar = new Controllers.Sidebar();
        BumApp.sidebarRegion.show(sidebar);
    });

    // TODO:  Why and when to use AddInitializer() vs on()
    BumApp.on("initialize:after", function() {
        if (Backbone.history) {
//            console.log('Backbone History Init');
            Backbone.history.start({pushState:true})

            if (Backbone.history.fragment === "") {
                this.navigate("dashboard/sponsor");
            }
        } else {
            console.log ('Backbone History not initialized');
        }

    });



