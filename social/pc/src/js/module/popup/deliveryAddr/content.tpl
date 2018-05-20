<div class="edit-add-box">
    <dl class="receiver clearfix">
        <dt>收货人:</dt>
        <dd>
            <input type="text" data-node="name" data-name="{{name}}" placeholder="请输入姓名" value="{{name}}">
        </dd>
    </dl>
    <p class="warn-txt" data-node="nameTip">收货人姓名为2-20个字符</p>
    {{if isCross}}
    <dl class="receiver clearfix">
      <dt>身份证号:</dt>
      <dd>
        <input type="text" data-node="idCard" data-idcard="{{idCard}}" {{if hasIdCardVal}}readonly="true"{{/if}} placeholder="请输入身份证号" value="{{idCard}}">
      </dd>
    </dl>
    <p class="warn-txt" data-node="idCardTip">请填写与收货人姓名对应的身份证号码</p>
    {{/if}}
    <dl class="area clearfix">
        <dt>所在地区:</dt>
        <dd data-node="areaList">
            <div data-node="province" data-provinceId={{provinceId}}>{{province}}</div>
            <div data-node="city" data-cityId={{cityId}}>{{city}}</div>
            <div data-node="borough" data-boroughId={{boroughId}}>{{borough}}</div>
            <div data-node="area" data-areaId={{areaId}}>{{area}}</div>
        </dd>
    </dl>
    <p class="warn-txt" data-node="areaTip">请补充地址</p>
    <dl class="detail-add clearfix">
        <dt>详细地址:</dt>
        <dd>
            <input type="text" data-node="addr" placeholder="请如实填写详细地址" value="{{addr}}">
        </dd>
    </dl>
    <p class="warn-txt" data-node="addrTip">限制为5-60个字符</p>
    <dl class="phone clearfix">
        <dt>电话/手机:</dt>
        <dd>
            <input type="text" data-node="phone" placeholder="请输入电话/手机号" value="{{phone}}">
        </dd>
    </dl>
    <p class="warn-txt" data-node="phoneTip">请输入手机号/电话号码</p>
    <div class="set-default-add">
        <label data-node="setDefault" data-checked="{{if isDefault === true}}true{{else}}false{{/if}}">
            <span class="menu-radio {{if isDefault === true}}menu-radio-checked{{else}}''{{/if}}"></span>设置为默认地址
        </label>
    </div>
</div>
