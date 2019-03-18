<template>
    <section class="home">
        <!-- 展示本轮扑克牌 -->
        <div class="poker_result">
            <div class="poker_lfresult"></div>
            <div class="poker_rtresult"></div>
        </div>
        <!-- TODO:下注开奖倒计时 -->
        <div class="countdown-box" v-if="betstatus">
            <span v-if="betstatus == 1">下注倒计时：</span>
            <span v-if="betstatus == 2">开奖倒计时：</span>
            <vac ref="sendSMSCode" tag="span" :left-time="countdown" v-if="countdown"
            @onFinish="(vac) => finish(vac)">
                <span slot="process" slot-scope="{ timeObj }" class="countdown">{{ timeObj.h }}:{{ timeObj.m }}:{{ timeObj.s }}s</span>
            </vac>
        </div>
        <!-- 扑克下注面板 -->
        <div class="poker_panel">
            <div class="poker-betroutine">
                <div class="poker-betbigoptions" @click="doAction">
                    <div class="poker-betodds">
                        <span>点数2-8</span>
                        <em>1赔1</em>
                    </div>
                    <div class="poker-betrange">龙赢</div>
                </div>
                <div class="poker-betbigoptions middle" @click="doAction">
                    <div class="poker-betodds">
                        <span>点数相同</span>
                        <em>1赔8</em>
                    </div>
                    <div class="poker-betrange">和</div>
                </div>
                <div class="poker-betbigoptions" @click="doAction">
                    <div class="poker-betodds">
                        <span>点数9-A</span>
                        <em>1赔1</em>
                    </div>
                    <div class="poker-betrange">虎赢</div>
                </div>
            </div>
            <div class="poker-morebet">
                <div class="poker-morebetlf">
                    <div class="poker-morebet-item">
                        <span>龙单</span>
                        <em>0.75x</em>
                    </div>
                    <div class="poker-morebet-item">
                        <span>龙双</span>
                        <em>1.05x</em>
                    </div>
                    <div class="poker-morebet-item">
                        <span>龙黑</span>
                        <em>0.9x</em>
                    </div>
                    <div class="poker-morebet-item">
                        <span>龙红</span>
                        <em>0.9x</em>
                    </div>
                </div>
                <div class="poker-morebetrt">
                    <div class="poker-morebet-item">
                        <span>虎双</span>
                        <em>1.05x</em>
                    </div>
                    <div class="poker-morebet-item">
                        <span>虎单</span>
                        <em>0.75x</em>
                    </div>
                    <div class="poker-morebet-item">
                        <span>虎红</span>
                        <em>0.9x</em>
                    </div>
                    <div class="poker-morebet-item">
                        <span>虎黑</span>
                        <em>0.9x</em>
                    </div>
                </div>
            </div>
        </div>
        <!-- 固定底部 -->
        <footer-bet></footer-bet>
    </section>
</template>
<script>
import { mapGetters } from "vuex";
import Eos from 'eosjs';
import config from '@/utils/network';
export default {
    name: 'home',
    computed: {
        ...mapGetters(['currentEOS','account'])
    },
    watch: {
        account(val,old){
            if(val){
                this.getnextgameid();
            }
        }  
    },
    data () {
        return {
            betId: null, // TODO: 当前下注betID      
            betstatus: null, //TODO: 1下注，2开奖倒计时
            countdown: null, //TODO: 倒计时
        }
    },
    methods: {
        /**
         * @description 获取当前下注ID
         */
        async getnextgameid(){
            const eos = scatter.eos(config.network, Eos, {});
            try {
                let res = await eos.getTableRows({ 
                    "scope": config.contractName, 
                    "code": config.contractName, 
                    "table":"vardic", 
                    "json": true
                });
                if(res.rows && res.rows.length){
                    let findbetiditem = res.rows.find( item => item.id == 6);
                    if(findbetiditem){
                        this.betId = parseInt(findbetiditem.value - 1);
                    }else{
                        this.betId = 1;
                    }
                    this.getgamedetails();
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description 获取游戏详情
         */
        async getgamedetails(){
            const eos = scatter.eos(config.network, Eos, {});
            let currentgame = await  eos.getTableRows({ 
                "scope": config.contractName, 
                "code": config.contractName, 
                "table":"game", 
                "lower_bound": this.betId,
                "limit": 10,
                "json": true
            });
            if(currentgame.rows && currentgame.rows.length){
                let currentgameinfo = currentgame.rows[0];
                // TODO: 开奖阶段
                if(currentgameinfo.reveal_time>0 && currentgameinfo.reveal_time > currentgameinfo.bet_end_time){
                    this.betstatus = 2;
                    let diff = Number(currentgameinfo.reveal_time) - Number(currentgameinfo.bet_end_time);
                    if(diff > 0 ){
                        this.countdown = diff * 1000;
                    }else{
                        this.countdown = 0;
                    }
                }
                // TODO: 下注阶段
                if(!currentgameinfo.reveal_time && currentgameinfo.bet_end_time > currentgameinfo.create_time){
                    this.betstatus = 1;
                    let diff = Number(currentgameinfo.bet_end_time) - Number(currentgameinfo.create_time);
                    if(diff > 0){
                        this.countdown = diff * 1000;
                    }else{
                        this.countdown = 0;
                    }
                }
                console.log(this.$data);
            }
        },
        /**
         * @description 下注功能
         */
        doAction(){ //下注
            const eos = scatter.eos(config.network, Eos, {});
            let betopt = {
                from: this.account.name, 
                to: 'gentelmen123', //gentelmen123、gentlemen123
                quantity: '10.0000 EOS',
                memo: `gamebet:${this.betId}:1:test` 
            }
            eos.transfer(betopt).then((res) => {
                if(res.broadcast){
                    console.log('获取投注结果....');
                    this.getBetresult();
                }else{

                }
            }).catch((err) => {
                console.log(err);
            });
        },
        /**
         * @description 获取投注结果
         */
        getBetresult(){
            const eos = scatter.eos(config.network, Eos, {});
            eos.getTableRows({
                "scope": config.contractName, 
                "code": config.contractName,
                "table": "bet", 
                "lower_bound":4,
                "limit": 50,
                "json": true})
            .then((res) => {
                console.log('获取投注结果....');
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        },
        /**
         * @description 倒计时
         */
        finish(vac){
            console.log('倒计时结束...');
            console.log(this.betstatus);
            if(this.betstatus == 1){
                this.getgamedetails();
            }else{
                this.getnextgameid();
            }
            this.betstatus = null; //TODO: 1下注，2开奖倒计时
            this.countdown = null; //TODO: 倒计时
        }
    },
    components: {
        'FooterBet': () => import('@/base/footerbet/footerbet.vue')
    }
}
</script>
<style lang="stylus">
@import '../../stylus/home.styl';
</style>

