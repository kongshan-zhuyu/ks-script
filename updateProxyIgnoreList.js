// 用于更新clasx白名单列表，初次使用请更改HostAddress以及ProxyIgnoreListAddress
var fs = require("fs");
// Nodejs下引入模块child_process实现调用shell
var child = require('child_process');
// 本地hosts文件的位置
const HostAddress = '/etc/hosts';
// clashx中白名单存放的位置
const ProxyIgnoreListAddress = '/Users/kongshan/.config/clash/proxyIgnoreList.plist';

const hosts = fs.readFileSync(HostAddress).toString();
const pattern = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})(:\d{1,5})?([\/\w\.-]*)*\/?(#[\S]+)?/gi;
const hostList = [...new Set(hosts.match(pattern))];
const IgnoreUrl = hostList.map((url) => `    <string>${url}</string>`).join('\n');
const content = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
    <string>192.168.0.0/16</string>
    <string>10.0.0.0/8</string>
    <string>172.16.0.0/12</string>
    <string>127.0.0.1</string>
    <string>localhost</string>
    <string>*.local</string>
    <string>*.crashlytics.com</string>
${IgnoreUrl}
</array>
</plist>
`
fs.writeFile(ProxyIgnoreListAddress, content, { flag: 'w' }, (err) => {
    if (err) {
        console.error(err)
    } else {
        // 白名单生效条件：重启clashX并且重新加载配置文件（tips：暂时未找到方法通过shell执行加载配置文件的操作）
        child.exec('killall ClashX & open -a ClashX.app', function (err, sto) {
            if (err) return console.log(err)
            console.log('白名单更新成功，clashX重启成功，请重新加载配置文件！')
        })
    }
})
