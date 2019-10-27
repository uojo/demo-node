# 获取指令执行结果信息
# a=$(git push)
# b=$(echo $a|grep -c husky)
# echo $b

# sourceBranch=$(git branch | grep \* | cut -d ' ' -f2)
# git checkout -b ${sourceBranch}_bk

# 分支合并时是否存在冲突
# echo $(git merge origin b1|egrep -c "^CONFLICT")
# local_git_status=$(git status|egrep -c "^Untracked|^Changes") # 1 表示存在未暂存文件

# TARGET_BRANCH="release-2"
# parse_target_branch=$(echo $TARGET_BRANCH | egrep -o "[a-z0-9]+-\d+" )
# # if [ ${#parse_target_branch} == 1 ]; then # 判断字符串长度
# if [ -n "$parse_target_branch" ]; then # 判断字符串长度不为 0
# ab=$parse_target_branch
# fi
# echo $ab

# function branch_name_current {
#   cur_branch=`git branch | grep "*"`
#   echo ${cur_branch/* /} # 过滤掉单行中的 /* / 
# }

function create_branch(){
  execMessage=$(git branch $1 2>&1)
  if [ $? -eq 0 ]; then
    echo "分支 $1 创建成功。"
  else
    echo $execMessage
  fi
}
create_branch master