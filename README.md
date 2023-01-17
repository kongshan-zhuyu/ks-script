# ks-script
Record some commonly used scripts

## updateProxyIgnoreList

#### 用途
MAC下使用ClashX设置系统代理后无法访问内网

#### 原理
- 读取本地 hosts 文件通过正则取到里面所有的地址去重存入列表
- 对地址进行字符串拼接
- 通过写文件的方式覆盖写到 proxyIgnoreList.plist 中
- 开启一个子进程，执行 shell ，重启 ClashX

#### 参考
https://www.jianshu.com/p/ecd02bc82a5a

#### 注意
- 由于路径不同首次使用请更改：`HostAddress` 和 `ProxyIgnoreListAddress`
- 执行完脚本后请手动重载 ClashX的配置文件