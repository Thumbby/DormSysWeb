<template>
<div>
    <el-col :span="16" :offset="4">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="换寝申请" name="change">
                <el-popover 
                    trigger="click">
                    <el-form>
                        <el-form-item label="申请寝室号">
                            <el-select v-model="change_application.destDormID" placeholder="选择寝室">
                                <el-option 
                                    v-for="(item,index) in dorm_list"
                                    :key="index"
                                    :value="item"
                                    :label="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请原因">
                            <el-input v-model="change_application.reason" type="textarea" :autosize="{minRows: 2}"/>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="applyChange()">确认</el-button>
                    <el-button slot="reference" type="primary">申请换寝</el-button>
                </el-popover>
                <el-collapse>
                    <el-collapse-item
                        v-for="item in change_application_list"
                        :key="item.applicationID"
                        :title="item.reason">
                        <div>目标寝室:{{item.destDormID}}号寝室</div>
                        <div>申请时间:{{item.applicationDate}}</div>
                        <div>申请内容:{{item.reason}}</div>
                        <br/>
                        <el-steps :active="item.isCompleted">
                            <el-step title="申请中"></el-step>
                            <el-step title="已完成"></el-step>
                        </el-steps>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="维修申请" name="repair">
                <el-popover 
                    trigger="click">
                    <el-form>
                        <el-form-item label="报修内容">
                            <el-input v-model="change_application.description" type="textarea" :autosize="{minRows: 2}"/>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="applyRepair()">确认</el-button>
                    <el-button slot="reference" type="primary">申请报修</el-button>
                </el-popover>
                <el-collapse>
                    <el-collapse-item
                        v-for="item in repair_application_list"
                        :key="item.applicationID"
                        :title="item.description">
                        <div>申请时间:{{item.applicationDate}}</div>
                        <div>申请内容:{{item.description}}</div>
                        <br/>
                        <el-steps :active="item.isCompleted">
                            <el-step title="申请中"></el-step>
                            <el-step title="已完成"></el-step>
                        </el-steps>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
        </el-tabs>
    </el-col>
</div>
</template>

<script>
export default{
    name:"my_application",
    data(){
        return{
            userInfo:{},
            activeTab:'change',
            change_application_list:[],
            dorm_list:[],
            change_application:{
                userID:'',
                destDormID:0,
                reason:'',
            },
            repair_application_list:[],
            repair_application:{
                userID:'',
                description:''
            }
        }
    },
    mounted(){
        this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
        this.change_application.userID=Number(this.userInfo.userID)
        this.repair_application.userID=Number(this.userInfo.userID)
        this.getChangeApplication();
        this.getRepairApplication();
    },
    methods:{
        getChangeApplication(){
            this.$axios({
                method:'get',
                url:'/Change',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.change_application_list=res.data.applications;
                }
            })
        },
        getRepairApplication(){
            this.$axios({
                method:'get',
                url:'/Repair',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.repair_application_list=res.data.applications;
                }
            })
        },
        handleClick(){
            if(this.activeTab=='click'){
                this.getChangeApplication();
            }
            else{
                this.getRepairApplication();
            }
        },
        applyChange(){
            this.$axios({
                method:'post',
                url:'/Change',
                data:this.change_application,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success!=1){
                    window.alert(res.data.msg)
                }
                else{
                    this.getChangeApplication();
                    window.alert('创建成功')
                }
            })
        },
        applyRepair(){
            this.$axios({
                method:'post',
                url:'/Repair',
                data:this.change_application,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success!=1){
                    window.alert(res.data.msg)
                }
                else{
                    this.getRepairApplication();
                    window.alert('创建成功')
                }
            })
        }
    }
}
</script>
