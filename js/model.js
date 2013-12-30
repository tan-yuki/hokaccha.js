App.Schedule = Backbone.Model.extend({

    defaults: {
        title: 'タイトル未定',
        datetime: null
    },

    validate: function(attrs) {
        if (!attrs.datetime) {
            return '日付は必須です';
        }

        if (!moment.isMoment(attrs.datetime) ||
            !attrs.datetime.isValid()) {
            return '日付のデータが不正です';
        }
    },

    dateFormat: function(f) {
        return this.get('datetime').format(f);
    },

    parse: function(attrs) {
        attrs.datetime = moment(attrs.datetime);
        return attrs;
    },

    emptyTitle: function() {
        return this.get('title') === this.defaults.title;
    }

});

App.Schedules = Backbone.Collection.extend({
    model: App.Schedule,

    localStorage: new Backbone.LocalStorage('calendar'),

    findByDate: function(date) {
        var format = 'YYYY-MM-DD';
        var targetDate = moment(date).format(format);

        return this.chain()
            .select(function(model) {
                return model.dateFormat(format) === targetDate;
            })
            .sortBy(function(model) {
                return model.get('datetime').valueOf();
            })
            .value();
    }
});
