# function funname () 定义
# function funcNoReturn(){
#   echo "没有返回"
# }
# funcNoReturn
# # 读取函数返回值（0-255），当无返回时输出 0
# echo $? # 0

# funcWithReturn(){
#   echo "有返回值"
#   return 100 # 数值 0-255 
# }
# funcWithReturn
# echo $? # 读取函数返回值

# 传入参数
# funWithParam(){
#   echo "第一个参数为 $1 !"
#   echo "第二个参数为 $2 !"
#   echo "第十个参数为 ${10} !" # 输出 ""
#   echo "参数总数有 $# 个!"
#   echo "作为一个字符串输出所有参数 $* !" # 1 "b" 3
# }
# funWithParam 1 "b" 3
