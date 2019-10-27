# %s 字符

printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234 
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543 
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876

echo "\n"

printf '%d %s\n' 1 "abc"

printf %s 12345

echo "\n"

printf %s 123 456

echo "\n"

printf "%s %s %s\n" a b c d e f g h i

# printf "a string, no processing:<%s>\n" "A\nB"

printf "a string, no processing:<%b>\n" "A\nB"

printf "www.runoob.com \n\t水平制表符\n"