<template>
<div>
    <el-select v-model="date_now" placeholder="请选择周" @change="changeDate($event)">
        <el-option
            v-for="(item,index) in date"
            :key="index"
            :label="item"
            :value="index">
        </el-option>
    </el-select>
    <el-button type="primary" v-if="change" @click="changeScore">修改</el-button>
    <el-table
    :data="dorm_score">
        <el-table-column
            prop="dormID"
            label="寝室号">
        </el-table-column>
        <el-table-column
            prop="scores"
            label="得分">
            <template slot-scope="scope">
                <el-radio :disabled="!change" v-model="scope.row.scores" :label='1'>1</el-radio>
                <el-radio :disabled="!change" v-model="scope.row.scores" :label='2'>2</el-radio>
                <el-radio :disabled="!change" v-model="scope.row.scores" :label='3'>3</el-radio>
                <el-radio :disabled="!change" v-model="scope.row.scores" :label='4'>4</el-radio>
                <el-radio :disabled="!change" v-model="scope.row.scores" :label='5'>5</el-radio>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    name:"dorm_list",
    data(){
        return{
            change:false,
            date_now:'',
            score_avaliable:[1,2,3,4,5],
            date:['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周',
            '第十四周','第十五周','第十六周','第十七周'],
            dorm_score:[],
            dormList:[],
        }
    },
    mounted(){
    },
    methods:{
        contains(arr,value){
            for(var i in arr){
                if(arr[i]['dormID']==value){
                    return true;
                }
            }
            return false;
        },
        getDorm(){
            this.$axios({
                method:'get',
                url:'/Dorm',
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
        })
        .then((res)=>{
            this.dormList=[]
            for(var i in res.data.dormList){
                if(this.contains(this.dormList,res.data.dormList[i].dormID)){
                    continue;
                }
                this.dormList.push({dormID:res.data.dormList[i].dormID})
            }
            this.dorm_score=this.dormList
            console.log(this.dorm_score)
        })
        },
        changeDate(event){
            this.$axios({
                method:'get',
                url:"/Score/"+(event+1),
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success==1){
                    this.dorm_score=res.data.scores
                    if(this.dorm_score.length!=0){
                        this.change=false
                    }
                    else{
                        this.change=true
                        this.getDorm();
                    }
                }
            })
        },
        changeScore(){
            for(var i in this.dorm_score){
                this.dorm_score[i].weekNum=Number(this.date_now+1)
            }
            this.$axios({
                method:'post',
                url:'/Score',
                data:this.dorm_score,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                if(res.data.success!=1){
                    window.alert(res.data.msg)
                }
                else{
                    window.alert('评分成功')
                    this.change=false
                }
            })
        },
    }
}
</script>

<style scoped>

</style>