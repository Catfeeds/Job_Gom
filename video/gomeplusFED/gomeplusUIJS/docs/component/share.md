<a name="share"></a>

## share(menus, actions, [options])
share 弹出式菜单

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| menus | <code>array</code> | 上层的选项 |
| menus[].label | <code>string</code> | 选项的文字 |
| menus[].onClick | <code>function</code> | 选项点击时的回调 |
| actions | <code>array</code> | 下层的选项 |
| actions[].label | <code>string</code> | 选项的文字 |
| actions[].onClick | <code>function</code> | 选项点击时的回调 |
| [options] | <code>object</code> | 配置项 |
| [options.className] | <code>string</code> | 自定义类名 |

**Example**
```js
opg.ui.share([
 {
     label: '微博',
     class:'weibo',
     onClick: function () {
         console.log('微博');
     }
 }, {
            label: '微信',
            class:'weixin',
            onClick: function () {
                console.log('微信');
            }
        }, {
            label: '朋友圈',
            class:'friends',
            onClick: function () {
                console.log('朋友圈');
            }
        }, {
            label: 'QQ',
            class:'qq',
            onClick: function () {
                console.log('QQ');
            }
        }, {
            label: 'QQ空间',
            class:'qzone',
            onClick: function () {
                console.log('QQ空间');
            }
        }
 ], [
 {
     label: '取消',
     onClick: function () {
         console.log('取消');
     }
 }
 ], {
        className: "custom-classname"
    });
```
