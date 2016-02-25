var isLeagueBoardPage=false,
    leagueBoardObj,
    oldLeaguedID='',
    oldRouter,
    ref='';

function clearPageData(){
    $content.off().html('<div class="loading"></div><div class="grey center">加载中...</div>');
}

module.exports=Backbone.Router.extend({
    initialize:function(){
        var that = this;
        this.bind('route',function(curRouter){
            //BI pv统计代码
//            console.log(location.href);
            getMsg(window.getBubbleMsg);
            //window.ht &&  ht.sendTrack(location.href,ref);
            ref=location.href;
            // 写入 checkFooter
            // window.HJApp && appGetPageTitle();
            setTimeout(function(){
                $('#changePageAnimate').fadeOut();
            },400);
            $(window).trigger('load');
        });
    },
    //before route
    _beforeRoute:function(curRouter){
        var noFooter={
            topicDetail:1,
            leagueHome:1,
            addressManage:1,
            shopCatalogue:1,
            teamAdd:1,
            activityTeamAdd:1,
            leagueTeamAdd:1,
            ztCiChang:1
        }
        if(curRouter=='leagueHome' && oldRouter=='leagueHome'){
            isLeagueBoardPage=true;
        }else{
            clearPageData();
            isLeagueBoardPage=false;
            oldLeaguedID='';
        }
        if(noFooter[curRouter]){
            $footer.hide();
        }else{
            $footer.show();
        }
        if(curRouter!='addTopic' || curRouter!='pageError'){
            $('#siteBubble').show();
        }else{
            $('#siteBubble').hide();
        }
        if(st.loadDate) st.loadDate.destory();
        if($.isWeixin() || $.isHJWebViewApp()) $.setShareWeixinInfo({title:'沪江社团 - 同兴趣_爱学习_在一起！',summary:'沪江社团旨在聚焦相同兴趣爱好的沪友，分享优质的语言、学习、人文、生活等的精品阅读资料，是最活跃最丰富的社团服务类网站。'});
        $.setWeixinTitle('沪江社团 - 同兴趣_爱学习_在一起！');
        oldRouter=curRouter;
        if(!ref){
            $body.append('<div class="change_page_loading" id="changePageAnimate"><div class="page_loading"></div></div>');
        }else{
            $('#changePageAnimate').show();
        }
//        sourceID= $.getCache('sourceID')||sourceID;
//        if(sourceID>1){
//            $.setCache('sourceID',sourceID);
//        }
//        $('body').prepend(sourceID);
    },




    routes:{
        '':                             'home',
        'st/*':                         'home',
        'st/global/*':                  'global',
        'st/hotTopic/*':                'hotTopic',
        'st/error/:errorID/*':          'pageError',
        'st/tag/:tagID/*':              'tagList',
        'st/explore/:typeId/*':         'leagueList',
        'st/redEnvelope/:redID/*':      'redEnvelope',

        //临时添加
        'st/mytopic/*':                 'replyMe',
        'st/myteam/*':                  'myTeam',
        'st/magzt/*':				    'magzt',
        'st/magzt/:ztID/*':				'magzt',


        'st/my/league/*':               'myLeague',
        'st/my/topic/*':                'myTopic',
        'st/my/reply/*':                'myReply',
        'st/my/replyMe/*':              'replyMe',
        'st/my/atMe/*':                 'atMe',
        'st/my/favorite/*':             'myFavorite',
        'st/my/team/*':					'myTeam',
        'st/my/mag/sub/*':			    'mySubMag',
        'st/my/mag/*':					'myMag',
        'st/my/event/*':				'myEvent',
        'st/my/msg/*':                  'myMessage',
        'st/my/fund/*':                 'fund',
        'st/my/fans/*':                 'myFans',
        'st/my/friends/*':              'myFriends',
        'st/my/follows/*':              'myFollows',
        'st/my/friendRequest/*':        'friendRequest',//用户好友请求

        'st/topic/:topicID/*':          'topicDetail',
        'st/topic/:topicID/?nav':       'topicDetail',
        'st/topic/:topicID/:postID/*':  'topicDetail',

        'st/mag/center/*':              'magCenter',
        'st/mag/category/:cateID/*':    'magCategory',
        'st/mag/category/:cateID/:subCateID/*':    'magCategory',
        'st/mag/category/*':            'magCategory',

        'st/mag/zt/*':                 'magZt',
        'st/mag/:magID/*':              'magDetail',
        'st/mag/:magID/share/*':        'magShare',
        'st/mag/:magID/info/*':         'magInfo',
        'st/mag/:magID/related/*':      'magRelated',

        'st/search/?key=:key&type=:type':'searchKeyType',
        'st/search/?key=:key':          'searchKeyType',
        'st/search/*':                  'search',

        // 商城
        'st/mall/*':                    'mall',
        'st/mall/my/*':                 'myCost',
        'st/mall/my/address/*':         'addressManage',
        'st/mall/my/confirm/:productID/*': 'shopCatalogue',
        'st/mall/lipin/:productId/*':   'product',


        //组队tag
        'st/tag/:tagID/team/*':         'teamTag',
        'st/tag/:tagID/team/:sid/*':    'teamTag',

        'st/team/*':                    'teamCenter',
        'st/team/add/*':                'teamAdd',
        'st/team/pk/:activityID/*':     'activityTeam',
        'st/team/pk/:activityID/teamAdd/*':'activityTeamAdd',//单活动下创建组队
        'st/team/pk/:activityID/detail/*': 'teamPkDetail',

        'st/team/:teamID/edit/*':       'teamAdd',

        'st/work/:workID/*':            'workDetail',

        'st/team/:teamID/*':            'teamDetail',
        'st/team/:teamID/info/*':       'teamInfo',
        'st/team/:teamID/rank/*':       'teamRank',
        'st/team/:teamID/apply/*':      'teamApplyMember',
        'st/team/:teamID/:userID/*':    'memberWorks',


        'st/user/active/*':             'activeAccount',
        'st/user/:userID/*':            'userCenter',
        'st/user/:userID/league/*':     'userLeague',
        'st/user/:userID/mag/*':        'userMag',
        'st/user/:userID/follows/*':    'userFollow',//用户关注
        'st/user/:userID/fans/*':       'userFan',//用户粉丝
        'st/user/:userID/friends/*':    'userFriend',//用户好友
        
        'st/user/:userID/reply/*':      'userReply',
        'st/user/:userID/topic/*':      'userTopic',
        'st/user/:userID/team/*':       'userTeam',
        'st/user/:userID/event/*':      'userEvent',

        'st/zt/teampk/*':               'ztTeampk',
        'st/floor/:postID/*':          'postDetail',

        'st/zt/cichang/*':              'ztCiChang',
        'st/zt/topicPage/:pageID/*':    'ztTopicPage',
        'st/:leagueID/*':               'leagueHome',
        'st/:leagueID/team/add/*':      'leagueTeamAdd',//单社团下创建组队
        'st/:leagueID/info/*':          'leagueInfo',
        'st/:leagueID/addTopic/*':      'addTopic',
        'st/:leagueID/userRank/*':      'leagueUserRank',
        'st/:leagueID/adminRank/*':     'leagueManageRank',
        'st/:leagueID/audit/*':         'leagueAudit',
        'st/:leagueID/:topicID/edit/*': 'editTopic',
        'st/:leagueID/:boardID/addTopic/*':      'addTopic',
        'st/:leagueID/:boardID/*':      'leagueHome'


    },
    magzt:function(){
        location.reload();
        return false;
    },
    home:function(){
        var Index=require('../views/index/index'),
            indexWrap=new Index({el:$content,site:curUserID>0?0:1}).$el;
        if(curUserID>0){
            var global=require('../views/index/global/global');
            new global({el:indexWrap.find('.index_content')});
        }else{
            var hotTopic=require('../views/index/hotTopic/hotTopic');
            new hotTopic({el:indexWrap.find('.index_content')});
        }
    },
    global:function(){
        var Index=require('../views/index/index');
        var indexWrap=new Index({el:$content,site:0}).$el;
        var global=require('../views/index/global/global');
        new global({el:indexWrap.find('.index_content')});
    },
    hotTopic:function(){
        var Index=require('../views/index/index');
        var indexWrap=new Index({el:$content,site:1}).$el;
        var hotTopic=require('../views/index/hotTopic/hotTopic');
        new hotTopic({el:indexWrap.find('.index_content')});
    },
    pageError:function(errorID,leagueID){
        var pageError=require('../views/error/error');
        new pageError({el:$content,errorID:errorID,leagueID:leagueID});
    },
    tagList:function(tagID){
        var tagList=require('../views/tag/tag');
        new tagList({el:$content,tagID:tagID});
    },
    leagueHome:function(leagueID,boardID) {
        if (!isLeagueBoardPage || oldLeaguedID != leagueID) {
            oldLeaguedID = leagueID;
            clearPageData();
            var leagueHome = require('../views/league/home/home');
            leagueBoardObj = new leagueHome({el: $content, leagueID: leagueID, boardID: boardID,userID: curUserID});
        } else {
            leagueBoardObj.loadBoard(boardID);
        }
    },
    leagueUserRank:function(leagueID){
        var leagueUserRank=require('../views/league/userRank/userRank');
        new leagueUserRank({el:$content,leagueID:leagueID});
    },
    leagueManageRank:function(leagueID){
        var leagueUserRank=require('../views/league/manageRank/manageRank');
        new leagueUserRank({el:$content,leagueID:leagueID});
    },
    leagueInfo:function(leagueID){
        var leaguesHome=require('../views/league/info/info');
        new leaguesHome({el:$content,leagueID:leagueID});
    },
    addTopic:function(leagueID,boardID){
        var addTopic=require('../views/topic/add/add');
        new addTopic({el:$content,leagueID:leagueID,boardID:boardID});
    },
    leagueList:function(typeId){
        var leagueList=require('../views/league/category/category');
        new leagueList({el:$content,typeId:typeId});
    },
    leagueAudit:function(leagueID){
        var leagueAudit=require('../views/league/audit/audit');
        new leagueAudit({el:$content,leagueID:leagueID});
    },
    editTopic:function(leagueID,topicID){
        var editTopic=require('../views/topic/edit/edit');
        new editTopic({el:$content,leagueID:leagueID,topicID:topicID});
    },
    topicDetail:function(topicID,postID){
        var topicDetail=require('../views/topic/detail/detail');
        new topicDetail({el:$content,topicID:topicID,postID:postID});
    },
    myLeague:function(){
        if($.checkUser()) {
            var myLeague = require('../views/user/league/league');
            new myLeague({el: $content, userID: curUserID});
        }
    },
    myTopic:function(){
        if($.checkUser()) {
            var myTopic = require('../views/user/topic/topic');
            new myTopic({el: $content, userID: curUserID});
        }
    },
    myReply:function(){
        if($.checkUser()) {
            var myReply = require('../views/user/reply/reply');
            new myReply({el: $content, userID: curUserID});
        }
    },
    replyMe:function(){
        if($.checkUser()) {
            var myReplyme = require('../views/user/replyMe/replyMe');
            new myReplyme({el: $content, userID: curUserID});
        }
    },
    atMe:function(){
        if($.checkUser()) {
            var myAt = require('../views/user/atMe/atMe');
            new myAt({el: $content, userID: curUserID});
        }
    },
    myFavorite:function(){
        if($.checkUser()) {
            var myFavorite = require('../views/user/favorite/favorite');
            new myFavorite({el: $content, userID: curUserID});
        }
    },
    myTeam:function(){
        if($.checkUser()) {
            var myTeam = require('../views/user/team/team');
            new myTeam({el: $content, userID: curUserID});
        }
    },
    mySubMag:function(){
        if($.checkUser()) {
            var subMag = require('../views/user/subMag/subMag');
            new subMag({el: $content});
        }
    },
    myMag:function(){
        if($.checkUser()) {
            var myMag = require('../views/user/mag/mag');
            new myMag({el: $content, userID: curUserID});
        }
    },
    myEvent:function(){
        if($.checkUser()) {
            var myEvent = require('../views/user/event/index');
            new myEvent({el: $content, userID: curUserID});
        }
    },
    myMessage:function(){
        if($.checkUser()) {
            var myEvent = require('../views/user/msg/msg');
            new myEvent({el: $content, userID: curUserID});
        }
    },
    fund:function(){
        if($.checkUser()) {
            var myEvent = require('../views/user/fund/fund');
            new myEvent({el: $content, userID: curUserID});
        }
    },
    myFriends:function(){
        if($.checkUser()){
            var userFriend=require('../views/user/friends/friend');
            new userFriend({el:$content,userID:curUserID});
        }
    },
    myFans:function(){
        if($.checkUser()){
            var fans=require('../views/user/fan/fan');
            new fans({el:$content,userID:curUserID});
        }
    },
    myFollows:function(){
        if($.checkUser()){
            var follow=require('../views/user/follow/follow');
            new follow({el:$content,userID:curUserID});
        }
    },
    friendRequest:function(){
        if($.checkUser()){
            var friendRequest=require('../views/user/friendRequest/friendRequest');
            new friendRequest({el:$content});
        }
    },
    magZt:function(){
        location.reload();
//        var magZt = require('../views/mag/zt/magZt');
//        new magZt({el:$content});
    },
    magDetail:function(magID){
        clearPageData();
        var magDetail=require('../views/mag/detail/detail');
        new magDetail({el:$content,magID:magID});
    },
    magShare:function(magID){
        location.reload();
//        var magShare=require('../views/mag/share/index');
//        new magShare({el:$content,magID:magID});
    },
    magInfo:function(magID){
        location.reload();
//        var magInfo=require('../views/mag/share/index');
//        new magInfo({el:$content,magID:magID});
    },
    magRelated:function(magID){
        location.reload();
//        var magRelated=require('../views/mag/share/index');
//        new magRelated({el:$content,magID:magID});
    },
    magCenter:function(){
        var magCenter=require('../views/mag/center/center');
        new magCenter({el:$content});
    },
    magCategory:function(cateID,subCateID){
        var magCenter=require('../views/mag/category/category');
        new magCenter({el:$content,cateID:cateID,subCateID:subCateID});
    },
    search:function(){
         var search=require('../views/search/search');
         new search({el:$content});
    },
    searchKeyType:function(key, type){
        var search=require('../views/search/search');
        new search({el:$content,key:key,type:type});
    },
    teamCenter:function(){
        var teamCenter=require('../views/team/center/center');
        new teamCenter({el:$content});
    },
    teamAdd:function(teamID){
        if($.checkUser()){
            var teamAdd=require('../views/team/add/add');
            var teamID = teamID ? teamID : '';
            new teamAdd({el:$content,leagueID:'',teamID : teamID});
        } 
    },
    leagueTeamAdd:function(leagueID){
        if($.checkUser()){
            var teamAdd=require('../views/team/add/add');
            new teamAdd({el:$content,leagueID:leagueID,teamID : ''});
        }
    },
    activityTeamAdd:function(activityID){
        if($.checkUser()){
            var teamAdd=require('../views/team/activityTeamAdd/activityTeamAdd');
            new teamAdd({el:$content,activityID:activityID});
        }
    },
    teamDetail:function(teamID){
        location.reload();
//        var teamDetail=require('../views/team/home/index');
//        new teamDetail({el:$content,teamID:teamID});
    },
    teamInfo:function(teamID){
        location.reload();
//        var teamInfo=require('../views/team/info/index');
//        new teamInfo({el:$content,teamID:teamID});
    },
    teamRank:function(teamID){
        location.reload();
//        var teamRank=require('../views/team/rank/rank');
//        new teamRank({el:$content,teamID:teamID});
    },
    teamApplyMember:function(teamID){
        location.reload();
//        var applyMember=require('../views/team/apply/index');
//        new applyMember({el:$content,teamID:teamID});
    },
    memberWorks:function(teamID,userID){
        location.reload();
//        var memberWorks=require('../views/team/apply/index');
//        new memberWorks({el:$content,teamID:teamID,userID:userID});
    },
    workDetail:function(workID){
        location.reload();
//        var workDetail=require('../views/team/work/detail/index');
//        new workDetail({el:$content,workID:workID});
    },
    activeAccount:function(){
        var activeAccount=require('../views/user/active/active');
        new activeAccount({el:$content});
    },
    userCenter:function(userID){
        location.reload();
//        var userCenter=require('../views/user/home/index');
//        new userCenter({el:$content,userID:userID});
    },
    userLeague:function(userID){
        var userLeague=require('../views/user/league/league');
        new userLeague({el:$content,userID:userID});
    },
    userMag:function(userID){
        var userMag=require('../views/user/mag/mag');
        new userMag({el:$content,userID:userID});
    },
    userFollow:function(userID){
        var userFollow=require('../views/user/follow/follow');
        new userFollow({el:$content,userID:userID});
    },
    userFan:function(userID){
        var userFan=require('../views/user/fan/fan');
        new userFan({el:$content,userID:userID});
    },
    userFriend:function(userID){
        var userFriend=require('../views/user/friends/friend');
        new userFriend({el:$content,userID:userID});
    },
    
    userReply:function(userID){
        var userReply=require('../views/user/reply/reply');
        new userReply({el:$content,userID:userID});
    },
    userTopic:function(userID){
        var userTopic=require('../views/user/topic/topic');
        new userTopic({el:$content,userID:userID});
    },
    userTeam:function(userID){
        var userTeam=require('../views/user/team/team');
        new userTeam({el:$content,userID:userID});
    },
    userEvent:function(userID){
        location.reload();
//        var userEvent=require('../views/user/event/index');
//        new userEvent({el:$content,userID:userID});
    },
    redEnvelope:function(redID){
        var redEnvelope=require('../views/redEnvelope/detail/detail');
        new redEnvelope({el:$content,redID:redID})
    },
    mall: function(){
        var mall = require('../views/mall/mall');
        new mall({el: $content});
    },
    myCost:function(){
        var myCost = require('../views/mall/myCost/myCost');
        new myCost({el:$content});
    },
    addressManage:function(){
        if($.checkUser()){
            var addressManage = require('../views/mall/addressManage/address');
            new addressManage({el:$content});            
        }
    },
    shopCatalogue:function(productID){
       if($.checkUser()){
            var shopCatalogue = require('../views/mall/shopCatalogue/shopCatalogue');
            new shopCatalogue({el:$content,productID:productID});
        }
    },
    product:function(productId){
        var product = require('../views/mall/product/product');
        new product({el:$content,productId:productId});
    },
    ztTeampk:function(){
        var ztTeampk = require('../views/zt/teampk/teampk');
        new ztTeampk({el:$content});
    },
    ztCiChang:function(){
        var ztCihui = require('../views/zt/cihui/cihui');
        new ztCihui({el:$content});
    },
    ztTopicPage:function(pageID){
        var ztTopicPage = require('../views/zt/topicPage/topicPage');
        new ztTopicPage({el:$content,pageID:pageID});
    },
    teamTag:function(tagID,sid){
        var teamTag=require('../views/tag/team/team');
         new teamTag({el:$content,tagID:tagID,sid:sid});
    },
    postDetail:function(postID){
        var postDetail = require('../views/topic/rvDetail/rvDetail');
        new postDetail({el:$content,postID:postID})
       
    },
    activityTeam:function(activityID){
        var activityTeam=require('../views/team/activityTeam/activityTeam');
        new activityTeam({el:$content,activityID:activityID}); 
    },
    teamPkDetail:function(activityID){
        var activityTeamList=require('../views/team/teamPkDetail/teamPkDetail');
        new activityTeamList({el:$content,activityID:activityID}); 
    }
});