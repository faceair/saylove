var pressEvent;
var $cardModel;
var offset=0;
var limit=5;
var isLoading=false;
$(function() {
    pressEvent = "ontouchstart" in window ? "tap" : "click";
    isLogged=$("body").attr('data-is_logged')=="1";
    // 滚动到底时加载
    $(window).on("scroll",function(){
        if ($("body").scrollTop()+$(window).height()>=$(document).height()-15){
            loadMoreCards(limit);
        }
    });

    //关闭mask
    $(".closeMask").on("click", function(event) {
        $(".mask").hide();
        return false;
    },false);
    $(".mask").on('click', function(event) {
        event.preventDefault();
        if ($(event.target).hasClass('mask')){
            $(this).hide();
        }
    });

    //去表白
    $(".goSayLove").on('click', function(event) {
        event.preventDefault();
        $(".mask").show();
        $(".maskContent").hide();
        $("#sayLove").show();
    });

    //提交表白
    $(".sayLoveSubmit").on('click', function(event) {
        event.preventDefault();
        $form=$(this).parent();
        var target=$form.find(".toWhom").val();
        var nickname=$form.find(".nickname").val();
        var content=$form.find(".loveDeclaration").val();
        if (!target){
            showMessage("你想要向谁表白呢？~~");
            return false;
        }else if (!nickname){
            showMessage("你是谁呢？~~");
            return false;
        }else if (!content){
            showMessage("爱要大声说出来啊！");
            return false;
        }
        showMessage("正在提交~");
        $.post("/api/post",{
            target:target,
            content:content,
            nickname: nickname
        },function(response){
            response=$.parseJSON(response);
            if (response.status==1){
                showMessage("表白成功！");
                setTimeout(function(){
                    window.location.reload();
                },1000);
            }
        });
    });

    // 猜
    $(".guess").on("click",guess,false);
    function guess() {
        var $guessWrapper = $(this).parent().addClass('guessToLeft');
        $guessWrapper.find(".guessSubmit").on('click', function(event) {
            event.preventDefault();
            showMessage("正在验证~");
            $.post('/api/love_guess', {
                    _id: $guessWrapper.parent().attr("data-post_id"),
                    nickname: $guessWrapper.find(".guessInput").val()
                },
                function(response) {
                    response=$.parseJSON(response);
                    if (response.status == 1 && response.success == true) {
                        $(".maskContent").hide();
                        $(".mask").show();
                        $("#guessRight").show();
                        var $thisCard=$guessWrapper.parent();
                        $("#guessRight .targetName").text($thisCard.find(".targetName").text());
                        $("#guessRight .passage").html($thisCard.find(".passage").html());
                        $("#guessRight strong").text($thisCard.find(".guessInput").val());
                    } else if (response.status == 1 && response.success == false) {
                        $(".maskContent").hide();
                        $(".mask").show();
                        $("#guessWrong").show();
                    } else {
                        showMessage(response.msg);
                    }
                });
        });
    }

    //搜索姓名
    $(".submitName").on('click', function(event) {
        event.preventDefault();
        var name=$(this).parent().find(".searchName").val();
        showMessage("正在搜索...");
        $.get('/api/search',{
            keywords:name,
        },function(response) {
            response=$.parseJSON(response);
            if (response.status==1&&response.data.length>0){
                $(".card").remove();
                var lists=response.data;
                for (var i = 0; i < lists.length; i++) {
                    var $card=$cardModel.clone();
                    var list=lists[i];
                    $card.find(".targetName").text(list.target);
                    $card.find(".passage").text(list.content);
                    $card.find(".guess").on("click",guess,false);
                    $card.attr('data-post_id', list._id);
                    $card.appendTo('.content');
                };
            }
            else{
                showMessage("似乎没有对这个这个人的表白呢...");
                return false;
            }
        });
    });

    // 加载更多
    function loadMoreCards(limit){
        showMessage("正在加载...");
        offset+=limit;
        $.get("/api/posts",{
            offset:offset-limit,
            limit:limit,
        },function(response){
            response=$.parseJSON(response);
            if (response.status==1&&response.data.length>0){
                var lists=response.data;
                for (var i = 0; i < lists.length; i++) {
                    var list=lists[i];
                    var $card=$cardModel.clone();
                    $card.find(".targetName").text(list.target);
                    $card.find(".passage").text(list.content);
                    $card.find(".guess").on("click",guess,false);
                    $card.appendTo('.content');
                    $card.attr('data-post_id', list._id);
                };
            }
            else{
                offset-=limit;
                showMessage("没有了呢~");
                return false;
            }
        });
    }

    function preload(){
        $cardModel=$($(".card")[0]).clone();
        $($(".card")[0]).remove();
        loadMoreCards(30,0);
        var shareData = {
            "appId": "", // 服务号可以填写appId
            "imgUrl": "http://23.236.72.171:4890/img/background.png",
            "link": "http://23.236.72.171:4890",
            "desc": '表白墙-有什么敢说的不敢说的，来这里表白吧！',
            "title": '表白墙-有什么敢说的不敢说的，来这里表白吧！'
        };
        WeixinApi.ready(function(api) {
            api.hideToolbar();
        });
        WeixinApi.ready(function(api) {
            api.shareToTimeline(shareData, {});
        });
    }

    preload();
});
// 展示提示信息
function showMessage(msg,time){
    time=time||2000;
    var $message=$(".message");
    $message.text(msg);
    $message.css("color","white");

    $message.show();
    setTimeout(function(){
        $message.hide();
    },time);
}

function hideMessage() {
    $(".message").hide();
}