<template>
	<div class="">
		<div class="cover-block" style="text-align: center; padding:50px;">
			<div>
				<div v-if="info.HU !== ''">
					<img style="margin:0 auto;" id="preview" class="avatar project-avatar" :src="info.HU">
				</div>
				<div v-else>
					<div class="detailAvatar" style="margin:0 auto; background-color: #cce7ff; color: #555">{{info.TN.substring(0,1).toUpperCase()}}</div>
				</div>
			</div>
			<div class="">
				<h3>{{info.TN}}</h3>
			</div>
			<div class="proj-desc">
				<p>{{info.TS}}</p>
			</div>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">详情</div>
		<div class="panel-body">
			<form>
				<fieldset>
					<legend>基本信息：</legend>
					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">报表名称：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.CD | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">所属项目：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.CD | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">创建时间：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.CD | Date 'yyyy-MM-dd'">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">
							创建者：
						</label>
						<div class="col-sm-10">
							<input class="form-control" readonly value="{{info.CU}}">
						</div>
					</div>

					<div class="col-sm-12">
						<label class="col-sm-2 align-rt">布局：</label>
						<div class="col-sm-10">
							<input class="form-control" readonly :value="info.CD">
						</div>
					</div>
				</fieldset>
			</form>

			<fieldset>
				<legend>报表简介：</legend>
				<div>
					<textarea disabled class="form-control" maxlength="250" rows="3" style="width:100%; resize:vertical" v-model="info.TS">{{info.TS}}</textarea>
				</div>
			</fieldset>

			<fieldset>
				<legend>组件列表：</legend>
				<div>
					<table class="table table-striped">
						<tr>
							<th>用户名</th><th>创建时间</th><th>上次登录时间</th><th>状态</th>
						</tr>
						<tr>
							<td>Donald Trump</td><td>2016/06/01</td><td>2016/06/11</td><td>在职</td>
						</tr>
						<tr>
							<td>Clinton Hillary</td><td>2016/06/01</td><td>2016/06/11</td><td>在职</td>
						</tr>
					</table>
				</div>
			</fieldset>
			<div class="form-actions">
				<button type="button" class="btn btn-sm btn-success" v-link="{name: 'editProject', params: {id: $route.params.id}}">编辑项目</button>
				<button type="button" class="btn btn-sm btn-danger" @click="deleteProject">删除项目</button>
			</div>

			</form>
		</div>
	</div>
</template>
<style>
</style>
<script>
</script>
