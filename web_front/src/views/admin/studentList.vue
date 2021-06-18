<template>
<div>
    <el-tabs v-model="activeTab"  @tab-click="handleClick">
        <el-tab-pane label="学生列表" name="all">
            <el-table
                :data="students_list">
                <el-table-column
                    prop="userID"
                    label="学生学号">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="学生用户名">
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="寝室名单" name="arranged">
            <el-table
                :data="students_list">
                <el-table-column
                prop="userID"
                label="学生学号">
                </el-table-column>
                <el-table-column
                    prop="dormID"
                    label="所在寝室">
                </el-table-column>
                <el-table-column
                    prop="isLeader"
                    label="是否为寝室长">
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="寝室分配" name="not_arranged">
            <el-table
                :data="students_list">
                <el-table-column
                    prop="userID"
                    label="学生学号">
                </el-table-column>
                <el-table-column
                    label="安排寝室">
                    <template slot-scope="scope">
                        <el-popover
                            placement="right"
                            width="200"
                            trigger="click">
                            <el-select v-model="dorm_select" placeholder="请选择寝室">
                                <el-option
                                v-for="item in dorm_list"
                                :key="item"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select>
                            <br/><br/>
                            <el-select v-model="isLeader" placeholder="是否为寝室长">
                                <el-option
                                v-for="(item,index) in leader_list"
                                :key="index"
                                :label="item"
                                :value="index">
                                </el-option>
                            </el-select>
                            <br/><br/>
                            <el-button type="primary" @click="distributeDorm(scope.row)">确认</el-button>
                            <el-button slot="reference" size="mini">分配寝室</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    name:"student_list",
    data(){
        return{
            activeTab:'all',
            dorm_list:['1','2','3','4'],
            leader_list:['否','是'],
            dorm_select:'',
            isLeader:'',
            students_list:[],
        }
    },
    mounted(){
        this.getAllStudent();
    },
    methods:{
        getAllStudent(){
            this.$axios({
                method:'get',
                url:'/User',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                params:{
                    isNotArranged:false
                }
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.students_list=res.data.userList
                }
                else{
                    window.alert(res.data.msg)
                }
            })
        },
        getArrangedStudent(){
            this.$axios({
                method:'get',
                url:'/Dorm',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.students_list=res.data.dormList
                    for(var i in this.students_list){
                        this.students_list[i]['isLeader']=this.students_list[i]['isLeader']==1?'是':'否'
                    }
                }
                else{
                    window.alert(res.data.msg)
                }
            })
        },
        getNotArrangedStudent(){
            this.$axios({
                method:'get',
                url:'/User',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                params:{
                    isNotArranged:true
                }
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.students_list=res.data.userList
                }
                else{
                    window.alert(res.data.msg)
                }
            })
        },
        handleClick(){
            this.students_list=[]
            if(this.activeTab == 'all'){
                this.getAllStudent();
            }
            else if(this.activeTab == 'arranged'){
                this.getArrangedStudent();
            }
            else{
                this.getNotArrangedStudent();
            }
        },
        distributeDorm(row){
            console.log(row.userID)
            console.log(this.dorm_select)
        }
    }
}
</script>

<style scoped>

</style>