<template>
    <section class="home">
        <!-- 展示本轮扑克牌 -->
        <div class="poker_result">
            <div class="poker_lfresult"></div>
            <div class="poker_rtresult"></div>
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
        }
    },
    methods: {
        /**
         * @description 获取当前下注ID
         */
        getnextgameid(){
            const eos = scatter.eos(config.network, Eos, {});
            eos.getTableRows({
                "scope": config.contractName, 
                "code": config.contractName,
                "table":"vardic", 
                "json": true})
            .then((res) => {
                if(res.rows && res.rows.length){
                    let findbetiditem = res.rows.find( item => item.id == 6);
                    if(findbetiditem){
                        this.betId = parseInt(findbetiditem.value - 1);
                    }else{
                        this.betId = 1;
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
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
                memo: `gamebet:${this.betId}:1:${this.account.name}` 
            }
            console.log('下注参数。。。。');
            console.log(betopt);
            eos.transfer(betopt).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
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

