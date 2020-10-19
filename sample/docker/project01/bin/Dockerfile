FROM node:12-alpine

# 定义变量
ARG PROJECTPATH=/project01

# 设置工作目录，以下操作将在该目录执行(不存在则先创建)
WORKDIR ${PROJECTPATH}

# 拷贝项目代码
COPY ./sources .

#暴露端口给宿主机
EXPOSE 3000

#容器启动时执行的命令，启动应用
CMD node s1.js