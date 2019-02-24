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
    methods: {
        doAction(){ //下注
            const eos = scatter.eos(config.network, Eos, {});
            // eos.getTableRows({"scope": config.contractName, "code": config.contractName, "table":"game", "json": true}).then((res) => {
            //     console.log(res);
            // }).catch((err) => {
            //     console.log(err);
            // });
            // '[ "yanwankun111", "myeosgame111", "3.0000 EOS", "gamebet:28:1:test"]'
            let betopt = {
                from: this.account.name, 
                to: 'myeosgame111',
                quantity: '10.0000 EOS',
                memo: `gamebet:28:1:${this.account.name}` 
            }
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

