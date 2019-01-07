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
                <div class="poker-betbigoptions">
                    <div class="poker-betodds">
                        <span>点数11-17</span>
                        <em>1赔1</em>
                    </div>
                    <div class="poker-betrange">龙赢</div>
                </div>
                <div class="poker-betbigoptions middle">
                    <div class="poker-betodds">
                        <span>点数相同</span>
                        <em>1赔8</em>
                    </div>
                    <div class="poker-betrange">和</div>
                </div>
                <div class="poker-betbigoptions">
                    <div class="poker-betodds">
                        <span>点数11-17</span>
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
    </section>
</template>
<style lang="stylus">
@import '../../stylus/home.styl';
</style>

