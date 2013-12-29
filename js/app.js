window.App = {};

App.mediator = _.extend({}, Backbone.Events);

$(function() {
    var Router = Backbone.Router.extend({
        routes: {
            // *以降は何でもmatch
            // *だけだと何故かエラーになるらしい
            ':year-:month': 'calendar',
            '*default': 'today'
        },

        initialize: function() {
            this.schedules = new App.Schedules();
            this.schedules.fetch();

            this.calendarView = new App.CalendarView({
                el: '.calendar',
                collection: this.schedules
            });

            this.formDialogView = new App.FormDialogView({
                el: '.dialog',
                collection: this.schedules
            });

            this.calendarControlView = new App.CalendarControlView({
                el: '.calendar-control'
            });

            this.schedules.on('invalid', function(model, message) {
                alert('Error: ' + message);
            });

            this.listenTo(App.mediator, 'route:change', this.changeRoute);
        },

        changeRoute: function(route) {
            this.navigate(route);
        },

        today: function() {
            this.calendarView.toToday();
        },

        calendar: function(year, month) {
            this.calendarView.moveTo(year, month);
        }
    });

    App.router = new Router();
    Backbone.history.start();
});
