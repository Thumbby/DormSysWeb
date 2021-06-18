<template>
<div>
    <el-table
    :data="applications">
        <el-table-column
            prop="applicationID"
            label="保修编号">
        </el-table-column>
        <el-table-column
            prop="userID"
            label="申请人">
        </el-table-column>
        <el-table-column
            prop="description"
            label="保修内容">
        </el-table-column>
        <el-table-column
            prop="applicationDate"
            label="申请日期">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="solveApplication(scope.row.applicationID)" type="text" size="small">处理完成</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    name:"repair_list",
    data(){
        return{
            applications:[],
        }
    },
    mounted(){
        this.$axios({
            method:'get',
            url:"/Repair",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res)=>{
            if(res.data.success==1){
                this.applications=res.data.applicaitons
            }
        })
    },
    methods:{
        removeByValue(arr, attr, value){ 
            var index=0;
            for(var i in arr){
                if(arr[i][attr]==value){
                    index=i;
                    break;
                }
            }
            arr.splice(index,1);
        },
        solveApplication(applicationID){
            this.$axios({
                method:"patch",
                url:"/Repair/"+Number(applicationID),
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.removeByValue(this.applications,'applicationID',applicationID)
                }
                else{
                    window.alert(res.data.msg)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>