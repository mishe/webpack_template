module.exports=Backbone.View.extend({
    initialize:function (options) {
        this.render();
    },
    render:function(){
        this.$el.html('<span>sssss</span>');
        this._initEvent();
        return this;
    },
    _initEvent:function(){
    },
    events:{
        'tap span':'changePage'
    },
    changePage:function(){
        router.navigate('st', {trigger:true,replace:false});
    }
});