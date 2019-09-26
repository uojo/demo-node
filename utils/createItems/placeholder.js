const td = {
  a:1,b:2
}

const matchRule = /{{([^}]*)}}/g

const hasPlaceholder = (str)=> /{{/.test(str)

const evstrExp = (str,data)=>{
  let rlt
  try{
    rlt = eval(str)
  }catch(err){
    rlt = str
  }
  
  return rlt
}

// evstrExp("true?1:0")
// 1
// evstrExp("data.c?1:0",td)
// 0
evstrExp("data.c.d?1:0",td)
// 0

const replaceMatchedValue = (matchedStr, data) => {
  let rlt
  try {
    rlt = eval(`data.${matchedStr}`)
    if (matchedStr === 'index') {
      rlt += 1;
    }
    if (rlt === undefined) {
      rlt = `{{${matchedStr}}}`
    }
  } catch (err) {
    rlt = matchedStr
  }
  // 
  return rlt
}

// replaceMatchedValue("index",{index:1})
// => 2
// replaceMatchedValue("a",{})
// => {{a}}
// replaceMatchedValue("a.b",{})
// => {{a.b}}

const parseMatchStr = (str, data) => {
  let rlt
  if (hasPlaceholder(str)) {
    rlt = str.replace(matchRule, (mstr, m, mi) => {
      // 
      return replaceMatchedValue(m, data)
    })
  }else {
    rlt = str
  }
  // 
  return rlt
}

// parseMatchStr("1{{a}}2", td)
// => 112
// parseMatchStr("1{{a}}2{{b}}", td)
// => 1122
// parseMatchStr("1{{c}}2{{b}}", td)
// => 1{{c}}22