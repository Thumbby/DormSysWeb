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
    <el-button type="primary" v-if="!change" @click="changeScore">修改</el-button>
    <el-button type="primary" v-if="change" @click="postScore">保存</el-button>
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
            dorm_score:[]
        }
    },
    mounted(){
    },
    methods:{
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
                }
            })
        },
        changeScore(){
            this.change=true;
        },
        postScore(){
            console.log(this.dorm_score)
            this.$axios({
                method:'post',
                url:'/Score',
                data:this.dorm_score,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res)=>{
                console.log(res)
            })
        },
    }
}
</script>

<style scoped>

</style>