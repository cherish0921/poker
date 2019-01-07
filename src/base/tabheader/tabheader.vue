<template>
    <header class="app-header">
        <div class="app-header-left">
            <div class="nologin">登录</div>
            <div class="afterlogin">
                <img src="http://test.gdice.ppset.com.cn/Gdice/m_images/useravatar.png" alt="头像" class="img-response"/>
                <span class="username">用户昵称</span>
            </div>
        </div>
        <!-- <div class="app-header-logo">
            <img src="https://www.gdice.one/Gdice/images/logo.png" alt="Gdice" class="img-response"/>
        </div> -->
        <div class="app-header-menu">
            <i class="icon iconfont icon-menu-two"></i>
        </div>
    </header>
</template>
<script>
export default {
    name: 'app-header'
}
</script>
<style lang="stylus">
@import './tabheader.styl';
</style>
