module.exports=Backbone.View.extend({
    initialize:function (options) {
        this.render();
    },
    render:function(){
        this.$el.html('hello tester');
        this._initEvent();
        return this;
    },
    _initEvent:function(){
    },
    events:{

    }
});