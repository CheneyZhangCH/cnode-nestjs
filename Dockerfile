# 依据哪个镜像创建你的容器
FROM node:12.14.1

# 在容器中创建一个目录
RUN mkdir -p /usr/src/node_app/hammer-god

# 定位到容器的工作目录
WORKDIR /usr/src/node_app/hammer-god

# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json /usr/src/node_app/hammer-god/package.json

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --registry=https://registry.npm.taobao.org

# 拷贝所有源代码到工作目录
COPY . /usr/src/node_app/hammer-god

# 暴露容器端口
EXPOSE 3000

# 启动node应用
CMD npm run start