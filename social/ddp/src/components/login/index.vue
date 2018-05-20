<template>
	<div class="login-con">
		<header class="navbar navbar-fixed-top navbar-empty">
			<div class="container">
				<div class="center-logo">
					<h2>美信数据开发平台</h2>
				</div>
			</div>
		</header>
		<div class="container navless-container">
			<div class="row">
				<div class="col-sm-5 pull-right">
					<div>
						<div class="login-box">
							<div class="login-heading">
								<h3>登录</h3>
							</div>
							<div class="login-body">
								<input type="text" class="form-control input-sm" placeholder="用户名" autofocus="autofocus">
								<input type="password" class="form-control input-sm" placeholder="密码">
								<div class="remember-me checkbox">
									<label for="remember_me">
										<input type="checkbox" name="remember_me" id="remember_me" value="1">
										<span>记住密码</span>
									</label>
								</div>
								<button type="button" class="btn btn-sm btn-success">登录</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-7 brand-holder pull-left">
					<h1>美信数据开发平台</h1>
					<h3>灵活的数据平台</h3>
					<p>自定义数据</p>
				</div>
			</div>
		</div>
		<div class='login-footer'>
			<hr>
			<p>copyright@美信团队</p>
		</div>
	</div>
</template>
<style scoped>
.login-con {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background-color: #fff;
	overflow-y: auto;
}
.login-con .container {
	max-width: 960px;
}

header.navbar-empty {
	background: #fff;
	border-bottom: 1px solid #eee;
}

header.navbar-empty .center-logo {
	text-align: center;
	padding: 10px 0;
}

header.navbar-empty .center-logo h2 {
	line-height: 50px;
	color: #555;
	margin: 0;
}

.login-box {
	background: #fafafa;
	border-radius: 10px;
	box-shadow: 0 0 2px #ccc;
	padding: 15px
}

.login-body>input {
	margin: 15px 0;
}

.login-footer {
	height: 24px;
	margin-top: -55px;
	width: 100%;
}
.login-footer p {
	line-height: 24px;
	font-size: 14px;
	text-align: center;
}
.brand-holder p {
	color: #888;
}
.navless-container {
	margin-top: 80px;
	padding-top: 32px;
	height: calc(100% - 112px);
}
</style>
<script>
export default {
	name: 'login'
};
</script>
