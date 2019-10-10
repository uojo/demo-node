# 可以加 function funname () 定义
# function funcNoReturn(){
#   echo “没有返回”
# }
# funcNoReturn
# echo $? # 读取函数返回值

# funcWithReturn(){
#   echo "有返回值"
#   return 100 # 跟数值 0-255 
# }
# funcWithReturn
# echo $? # 读取函数返回值

# 传入参数
# funWithParam(){
#     echo "第一个参数为 $1 !"
#     echo "第二个参数为 $2 !"
#     echo "第十个参数为 $10 !"
#     echo "第十个参数为 ${10} !"
#     echo "第十一个参数为 ${11} !"
#     echo "参数总数有 $# 个!"
#     echo "作为一个字符串输出所有参数 $* !"
# }
# funWithParam 1 2 3

# grep 匹配到为 0，反之为 1
# echo "Hello World !" | grep -e Hello
# echo $?
# echo "Hello World !" | grep -e Bye
# echo $?

. ./testVariable.sh
echo $uojo


function branch_name_current {
  br=`git branch | grep "*"`
  echo ${br/* /}
}

function create_branch(){
  execMessage=`git branch $1`
  execCode=$?
  # echo ${#execMessage}
  if [ $execCode -eq 0 ]; then
    echo "分支 $1 创建成功。"
  else
    echo $execMessage
  fi
}
# createBranch t1234
# 批量创建分支
# branch_i=1;
# while(($branch_i<=5));do
# create_branch "t${branch_i}"
# # echo "t${branch_i}"
# ((++branch_i))
# done