<template>
<div>
    <div class="author-info">
        <span class="author-name">{{postInfo.postAuthor}}</span>
        <span class="author-time">{{postInfo.postTime.replace('T',' ')}}</span>
    </div>
    <div class="icon-btn">
        <span @click="showReplyInput()"><i class="iconfont el-icon-s-comment"></i>{{replys.length}}</span>
    </div>
    <div class="talk-box">
        <p>
            <span class="reply">{{postInfo.postContent}}</span>
        </p>
    </div>
    <div class="reply-box">
        <div v-for="reply in replys" :key="reply.replyID" class="author-title">
            <div class="author-info">
                <span class="author-name">{{reply.userName}}</span>
                <span class="author-time">{{reply.replyTime.replace('T',' ')}}</span>
            </div>
            <div class="talk-box">
                <p>
                    <span>回复 {{postInfo.postAuthor}}:</span>
                    <span class="reply">{{reply.content}}</span>
                </p>
            </div>
        </div>
    </div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <div class="reply-info" >
                <div 
                tabindex="0" 
                contenteditable="true" 
                :id='postInfo.postID' 
                spellcheck="false" 
                placeholder="输入评论..." 
                class="reply-input" 
                @focus="showReplyBtn"  
                @input="onDivInput($event)"
                >
                </div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
                <el-button class="reply-btn" size="medium" @click="sendReply" type="primary">发表评论</el-button>
            </div>
        </div>
</div>
</template>
<script>
const clickoutside = {
    // 初始化指令
    bind(el, binding) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
            return false;
        }
    // 判断指令中是否绑定了函数
        if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
        }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default{
    name:"reply",
    data(){
        return{
            btnShow:false,
            replyContent:'',
            replys:[]
        }
    },
    props:['postInfo'],
    directives: {clickoutside},
    mounted(){
        this.getRplys();
    },
    methods:{
        getRplys(){
        this.$axios({
            method:"get",
            url:"/Reply/"+this.postInfo.postID,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res)=>{
            if(res.data.success==1){
                for(var i in res.data.replys){
                    res.data.replys[i].userName=res.data.userNames[i]
                }
            }
            this.replys=res.data.replys
        })
        },
        inputFocus(){
            var replyInput = document.getElementById(this.postInfo.postID);
            replyInput.style.padding= "8px 8px"
            replyInput.style.border ="2px solid blue"
            replyInput.focus()
        },  
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
        },
        sendReply(){
            console.log(this.replyContent)
            var reply={
                postID:Number(this.postInfo.postID),
                userID:Number(JSON.parse(localStorage.getItem('userInfo')).userID),
                content:this.replyContent,
            }
            console.log(reply)
            this.$axios({
                method:'post',
                url:'/Reply',
                data:reply,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    window.alert("回复成功")
                    let input =  document.getElementById(this.postInfo.postID)
                    this.replyContent = ''
                    input.innerHTML = '';
                    this.getRplys();
                }
                else{
                    window.alert(res.data.msg)
                }
            })
        },
        onDivInput: function(e) {
            this.replyContent = e.target.innerHTML;
        },
    }
}
</script>
<style lang="stylus" scoped>
.my-reply
    padding 10px
    background-color #fafbfc
    .reply-info    
        display inline-block
        margin-left 5px
        width 90%
        @media screen and (max-width:1200px) {
            width 80%
        }
        .reply-input
            min-height 20px
            line-height 22px
            padding 10px 10px
            color #ccc
            background-color #fff
            border-radius 5px
            &:empty:before
                content attr(placeholder)
            &:focus:before
                content none
            &:focus
                padding 8px 8px
                border 2px solid blue
                box-shadow none
                outline none
    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
            margin-right 15px
.my-comment-reply
    margin-left 50px
    .reply-input
        width flex
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    .author-info
        display inline-block
        margin-left 5px
        width 60%
        height 40px
        line-height 20px
        >span 
            display block
            cursor pointer
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .author-name
            color #000
            font-size 18px
            font-weight bold
        .author-time
            font-size 14px
    .icon-btn
        width 30%
        padding 0 !important 
        float right
        @media screen and (max-width : 1200px){
            width 20%
            padding 7px
        }
        >span 
            cursor pointer
        .iconfont 
            margin 0 5px
    .talk-box
        margin 0 50px
        >p
           margin 0
        .reply
            font-size 16px
            color #000
    .reply-box
        margin 10px 0 0 50px
        background-color #efefef
</style>
