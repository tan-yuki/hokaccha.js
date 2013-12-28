App.Schedule = Backbone.Model.extend({

    defaults: {
        title: null,
        datetime: null
    },

    validate: function(attrs) {
        if (!attrs.title) {
            return 'タイトルは必須です';
        }

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
    }

});

App.Schedules = Backbone.Collection.extend({
    model: App.Schedule,

    findByDate: function(date) {
        var format = 'YYYY-MM-DD';
        var targetDate = moment(date).format(format);

        return this.select(function(model) {
            return model.dateFormat(format) === targetDate;
        });
    }
});
