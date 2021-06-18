<template>
<div>
    <el-col :span="4" style="text-align:center">
        <el-card class="dormInfo">
            <h2 style="color:darkBlue">{{dormID}}号寝室</h2>
            <h3 style="color:skyblue">寝室成员</h3>
            <div v-for="item in memberList"
                :key="item.userID">
                <i class="el-icon-user"/>
                {{item.userName}}
            </div>
            <br/>
            <el-popover  
                v-if="isLeader==1"
                trigger="click">
                <el-form>
                    <el-form-item label="负责成员">
                        <el-select v-model="new_work.userID">
                            <el-option
                                v-for="item in memberList"
                                :key="item.userID"
                                :value="item.userID"
                                :label="item.userName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="宿务内容">
                        <el-input v-model="new_work.workName" label="请输入工作内容"/>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="createWork()">确认</el-button>
                <el-button slot="reference" type="primary">创建宿务</el-button>
            </el-popover>
        </el-card>
    </el-col>
    <el-col :span="18" :offset="1">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="我的宿务" name="work">
            <el-collapse v-model="activeName">
                <el-collapse-item 
                    v-for="item in work_list"
                    :key="item.workID"
                    :title="item.workName"
                    :name="item.workId">
                    <div>负责人:{{item.userID}}</div>
                    <div>创建时间:{{item.workDate}}</div>
                    <div>是否完成:{{item.isCompleted}}</div>
                    <el-button v-if="item.isCompleted!='1'" type="primary" size='mini' @click="completeWork(item.workID)">完成宿务</el-button>
                </el-collapse-item>
            </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="宿务评分" name="score">
            <el-select v-model="date_now" placeholder="请选择周" @change="changeDate()">
                <el-option
                    v-for="(item,index) in date"
                    :key="index"
                    :label="item"
                    :value="index">
                </el-option>
            </el-select>
            <el-table
                :data="dorm_score">
                    <el-table-column
                        prop="dormID"
                        label="寝室号">
                    </el-table-column>
                    <el-table-column
                    prop="scores"
                    label="得分">
                    </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
    </el-col>
</div>
</template>

<script>
export default{
    name:"my_dorm",
    data(){
        return{
            userID:'',
            isLeader:'',
            dormID:'',
            memberList:[],
            activeName:'',
            activeTab:'work',
            //宿务评分部分
            date:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周',
            '第十四周','第十五周','第十六周','第十七周'],
            date_now:0,
            dorm_score:[],
            work_list:[],
            new_work:{
                userID:'',
                workName:'',
            }
        }
    },
    mounted(){
        var userInfo=JSON.parse(localStorage.getItem('userInfo'))
        this.userID=userInfo.userID
        this.$axios({
            method:'get',
            url:'User',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res)=>{
            if(res.data.success==1){
                this.isLeader=res.data.userDorm.isLeader;
            }
        })
        this.$axios({
            method:'get',
            url:'/Dorm',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res)=>{
            if(res.data.success==1){
                this.dormID=res.data.dormID;
                this.memberList=res.data.roomates;
            }
        })
        this.getWork();
    },
    methods:{
        getWork(){
            this.$axios({
                method:'get',
                url:'/Work',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },   
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.work_list=res.data.works;
                    if(this.work_list.length!=0){
                        this.activeName=this.work_list[0].workID;
                    }
                    else{
                        this.activeName=''
                    }
                }
            })
        },
        getDormScore(){
            this.$axios({
                method:'get',
                url:"/Score/"+(this.date_now+1),
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.dorm_score=res.data.scores
                }
            })
        },
        findWorkByID(work_list,workID){
            for(var i in work_list){
                if(work_list[i].workID==workID){
                    work_list[i].isCompleted='1';
                    break;
                }
            }
        },
        //宿务部分
        completeWork(workID){
            this.$axios({
                method:'patch',
                url:'/Work/'+workID,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success!=1){
                    window.alert(res.data.msg)
                }
                else{
                    this.findWorkByID(this.work_list,workID)
                }
            })
        },
        createWork(){
            console.log(this.new_work)
            this.$axios({
                method:'post',
                url:'/Work',
                data:this.new_work,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    window.alert('创建成功')
                    if(this.new_work.userID==this.userID&&this.activeTab=='work'){
                        this.getWork();
                    }
                }
                else{
                    window.alert(res.data.msg)
                }
            })
        },
        //评分部分
        handleClick(){
            if(this.activeTab=='score'){
                this.date_now=0;
                this.getDormScore();
            }
            else{
                this.getWork();
            }
        },
        changeDate(){
            this.getDormScore();
        }
    }
}
</script>
