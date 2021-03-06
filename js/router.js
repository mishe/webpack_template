var oldRouter,
    ref='';

function clearPageData(){
    $content.off().html('<div class="loading"></div><div class="grey center">加载中...</div>');
}

module.exports=Backbone.Router.extend({
    initialize:function(){
        var that = this;
        this.bind('route',function(curRouter){
            //after Route
            ref=location.href;
            setTimeout(function(){
                $('#changePageAnimate').fadeOut();
            },400);
        });
    },
    //before route
    _beforeRoute:function(curRouter){
        //if(st.loadDate) st.loadDate.destory();

        oldRouter=curRouter;
        if(!ref){
            $body.append('<div class="change_page_loading" id="changePageAnimate"><div class="page_loading"></div></div>');
        }else{
            $('#changePageAnimate').show();
        }
    },

    routes:{
        'index.html':                             'home',
        'st/*':                             'st',
    },

    home:function(){
        clearPageData();
        var Index=require('../src/index/index');
        new Index({el:$content});
    },
    st:function(){
        alert('st');
    }

});