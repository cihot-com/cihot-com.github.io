
在Worker下，频繁开启/关闭Worker，可以节省当前页面的CPU开销。

在当前页面频繁开启/关闭Worker，会占用当前页面的CPU开销。

减少当前页面的CPU开销，也许能够让页面更加流畅。
但是页面需要通过worker再传递给下一个worker，不知道这个传送复制对象会不会更耗内存。


SharedWorker可以让网页们有沟通，共享一个线程来进行数据处理。
如需要一个网站只能登录一个账号，这时我想应该可以使用这个SharedWorker来实现。

