<template>
    <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <div class="reply-info" >
                <div 
                tabindex="0" 
                contenteditable="true" 
                id="postInput" 
                spellcheck="false" 
                placeholder="输入评论..." 
                class="reply-input" 
                @focus="showReplyBtn"  
                @input="onDivInput($event)"
                >
                </div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
            </div>
        </div>
        <div v-for="(item,index) in posts" :key="index" class="author-title reply-father">
            <Reply :postInfo="{postID:item.postID,postAuthor:item.userName,postContent:item.content,postTime:item.postTime}"/>
        </div>
    </div>
</template>

<script>
import Reply from "@/views/student/reply";
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
export default {
    name:'community',
    data(){
        return{
            btnShow: false,
            index:'0',
            postContent:'',
            userName:'',
            userID:'',
            posts:[],
            replys:[],
        }
    },
    components:{
        Reply
        },
    directives: {clickoutside},
    mounted(){
        var userInfo=JSON.parse(localStorage.getItem('userInfo'))
        this.userID=userInfo.userID
        this.userName=userInfo.userName
        this.getComment();
    },
    methods: {
        inputFocus(){
            var postInput = document.getElementById('postInput');
            postInput.style.padding= "8px 8px"
            postInput.style.border ="2px solid blue"
            postInput.focus()
        },  
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
        },
        showReplyInput(i){
            this.index =i
        },
        _inputShow(i){
            return this.comments[i].inputShow 
        },
        getComment(){
            this.replys=[]
            this.$axios({
                method:'get',
                url:'/Post',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.posts=res.data.posts;                    
                    for(var i=0;i<this.posts.length;i++){
                        this.posts[i].userName=res.data.userNames[i]
                    }
                }
                else{
                    this.posts=[]
                }
            })
        },
        sendComment(){
            if(!this.postContent){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                var post={}
                post.userID=Number(this.userID)
                post.content=this.postContent
                this.$axios({
                    method:'post',
                    url:'/Post',
                    data:post,
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((res)=>{
                    if(res.data.success==1){
                        let input =  document.getElementById('postInput')
                        this.postContent = ''
                        input.innerHTML = '';
                        this.getComment();
                        window.alert('发送成功')
                    }
                    else{
                        window.alert(res.success.msg)
                    }
                })
            }
        },
        onDivInput: function(e) {
            this.postContent = e.target.innerHTML;
        },
    },    
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