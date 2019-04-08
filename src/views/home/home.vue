<template>
    <section class="home">
        <!-- 
            lotteryinfo
                dragonColor: "red"
                dragonNumbertype: "odd"
                dragondesc: "红桃K"
                dragonvalue: "211"
                result: "tigerWin"
                resultstatus: 2
                tigerColor: "black"
                tigerNumbertype: "even"
                tigerdesc: "樱花10"
                tigervalue: "308"
         -->
        <!-- 展示本轮扑克牌 -->
        <div class="poker_result">
            <template v-if="!account">
                <div class="poker_lfresult"></div>
                <div class="poker_rtresult"></div>
            </template>
            <template v-else>
                <div class="poker_lfresult">
                    <span v-if="lotteryinfo.dragondesc" v-html="lotteryinfo.dragondesc"></span>
                </div>
                <div class="poker_rtresult">
                    <span v-if="lotteryinfo.tigerdesc" v-html="lotteryinfo.tigerdesc"></span>
                </div>
            </template>
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
import card_map from '@/utils/config';
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
            cardMapArray: null, //TODO: 扑克数组
            lotteryinfo: { //TODO: 开奖信息
                result: '', //TODO: 开奖结果
                resultstatus: 0, //TODO: 开奖结果状态码
                dragonvalue: '', //TODO: 龙牌value
                dragondesc: '', //TODO: 龙牌描述
                dragonColor: '', //TODO: 龙牌颜色
                dragonNumbertype: '', //TODO: 龙牌单双
                tigervalue: '', //TODO: 虎牌value
                tigerdesc: '', //TODO: 虎牌描述
                tigerColor: '', //TODO: 虎牌颜色
                tigerNumbertype: '' //TODO: 虎牌单双
            }
        }
    },
    created () {
        this.cardMapArray = Array.from(card_map);
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
                    let findbetiditem = res.rows.find( item => item.id == 5);
                    if(findbetiditem){
                        this.betId = parseInt(findbetiditem.value - 1);
                        console.log('当前下注ID....');
                        console.log(this.betId);
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
                    console.log('game....');
                    console.log(currentgameinfo);
                    this.betstatus = 2;
                    let diff = Number(currentgameinfo.reveal_time) - Number(currentgameinfo.bet_end_time);
                    this.computedresult(currentgameinfo.card_number1, currentgameinfo.card_number2);
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
            }
        },
        /**
         * @description 下注功能
         */
        doAction(){ //下注
            const eos = scatter.eos(config.network, Eos, {});
            let betopt = {
                from: this.account.name, 
                to: config.contractName, //gentelmen123、gentlemen123
                quantity: '0.1000 EOS',
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
            if(this.betstatus == 1){
                this.getgamedetails();
            }else{
                this.resetlotteryinfo();
                this.getnextgameid();
            }
            this.betstatus = null; //TODO: 1下注，2开奖倒计时
            this.countdown = null; //TODO: 倒计时
        },
        /**
         * @description 计算开奖结果
         * @param {Number} card_number1
         * @param {Number} card_number2
         */
        computedresult(card_number1, card_number2){
            this.lotteryinfo.dragonvalue = this.cardMapArray[card_number1][0];
            this.lotteryinfo.dragondesc = `${this.cardMapArray[card_number1][1].card_color_desc}${this.cardMapArray[card_number1][1].card_value}`;
            this.lotteryinfo.tigervalue = this.cardMapArray[card_number2][0];
            this.lotteryinfo.tigerdesc = `${this.cardMapArray[card_number2][1].card_color_desc}${this.cardMapArray[card_number2][1].card_value}`;
            let dragon_value = Math.floor(this.cardMapArray[card_number1][0] % 100);
            let dragon_color = Math.floor(this.cardMapArray[card_number1][0] / 100);
            let tiger_value = Math.floor(this.cardMapArray[card_number2][0] % 100);
            let tiger_color = Math.floor(this.cardMapArray[card_number2][0] / 100);
            // TODO: 判断输赢 和
            if (dragon_value < tiger_value) {
                this.lotteryinfo.result = 'dragonWin'; //TODO: 龙赢
                this.lotteryinfo.resultstatus = 1;
            }else if (dragon_value == tiger_value) {
                if (dragon_color < tiger_color) { 
                    this.lotteryinfo.result = 'dragonWin'; //TODO: 龙赢
                    this.lotteryinfo.resultstatus = 1;
                } else if (dragon_color == tiger_color) { 
                    this.lotteryinfo.result = 'same'; //TODO: 和
                    this.lotteryinfo.resultstatus = 3;
                } else { 
                    this.lotteryinfo.result = 'tigerWin'; //TODO: 和
                    this.lotteryinfo.resultstatus = 2;
                } 
            }else { 
                this.lotteryinfo.result = 'tigerWin'; //TODO: 和
                this.lotteryinfo.resultstatus = 2;
            } 
            // TODO: 判断颜色
            if (dragon_color == 1 || dragon_color == 3) {
                this.lotteryinfo.dragonColor = 'black';
            } else { 
                this.lotteryinfo.dragonColor = 'red';
            } 
            if (tiger_color == 1 || tiger_color == 3) { 
                this.lotteryinfo.tigerColor = 'black';
            } else { 
                this.lotteryinfo.tigerColor = 'red';
            } 
            // TODO: 判断单双
            if (dragon_value % 2 == 1 || dragon_value == 12) { 
                this.lotteryinfo.dragonNumbertype = 'odd';
            } else { 
                this.lotteryinfo.dragonNumbertype = 'even';
            } 
            if (tiger_value % 2 == 1 || tiger_value == 12) { 
                this.lotteryinfo.tigerNumbertype = 'odd';
            } else { 
                this.lotteryinfo.tigerNumbertype = 'even';
            } 
            console.log(this.lotteryinfo);
        },
        /**
         * @description 重置开奖信息
         */
        resetlotteryinfo(){
            this.lotteryinfo = Object.assign(this.lotteryinfo, {
                result: '', 
                resultstatus: 0, 
                dragonvalue: '',
                dragondesc: '',
                dragonColor: '',
                dragonNumbertype: '',
                tigervalue: '',
                tigerdesc: '',
                tigerColor: '',
                tigerNumbertype: ''
            });
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

