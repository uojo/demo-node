const createItem = (item, options) => {
  
  let finalItem = {}
  for (let key in item) {
    const itemValue = item[key]
    let finalValue
    if (typeof itemValue == 'string') {
      const mRlt = itemValue.match(/^{{([^}]*)}}$/)
      if (mRlt) {
        const placeHolderValues = mRlt[1].split('|')
          .filter(e => e !== '')
          .map(e => {
            let rlt
            try {
              rlt = eval(`options.${e}`)
              if (e === 'index') {
                rlt += 1;
              }
              if(rlt===undefined){
                rlt = `{{${e}}}`
              }
            } catch (err) {
              rlt = e
            }
            return rlt
          })
        finalValue = placeHolderValues[options.index%placeHolderValues.length]
      }
    }
    
    if(finalValue===undefined){
      finalValue = itemValue
    }
    finalItem[key] = finalValue
  }
  return finalItem;
}

const createItems = (n,itemTpl,options) => {
  return new Array(n).fill().map((e,index)=>{
    return createItem(itemTpl,Object.assign({},options,{index}))
  });
}

const data = {
  string: {
    id:'123',
    long: "hello",
    short:'hhh'
  },
  url: {
    image: "world",
  },
};

// createItem({
//   id: "{{index|string.long|url.image}}"
// }, Object.assign({
//   index: 11
// }, data))

// createItems(4, {
//   id: "{{index|string.long|url.image|number.short}}"
// }, Object.assign({
//   index: 11
// }, data))


// const mdata = createItems(3, {
//   id: '{{string.id}}',
//   articleWechatPublishTime: 1558929160000,
//   title: '测试孕检助手标签',
//   content: '<p>1111111111111</p>',
//   columnIds: '',
//   choice: true,
//   important: false,
//   likes: 0,
//   readCount: 2,
//   authorId: '',
//   coverImageUrl: '',
//   brief: '{{string.long|string.empty|string.short|}}',
//   hidden: false,
//   channel: 'xzs',
//   detailLastModifyTime: 1563440795000,
//   pgcCategoryIds: '',
//   pgcCategories: [],
// },data)

// console.log('TCL: mdata', mdata);

const parseCreateItemsOptions = (item,total) => {
  const keyAliasMap = {
    title: ['string.long', 'string.short'],
    desc: ['string.long', 'string.short', 'string.empy'],
    cover: ['image.reactangle', 'image.reactangle'],
  };
  let finalItem = {}
  let matchedKeys = []
  for(const key in item){
    let finalItemValue
    const itemValue = item[key]
    if(typeof itemValue === 'string'){
      // itemValue => '{{string.long|string.short}}'
      const mRlt = itemValue.match(/^{{([^}]*)}}$/);
      if(mRlt){
        // matchKeys => ['string.long','string.short']
        let matchKeys = mRlt[1].split('|').filter(e=>e!=='');
        if(matchKeys.length === 1){
          const td = keyAliasMap[matchKeys[0]]
          if(td){
            finalItemValue = `{{${td.join("|")}}}`
            matchedKeys.push(td.length)
          }
        }else{
          matchedKeys.push(matchKeys.length)
        }
      }
    }
    
    finalItem[key] = finalItemValue ? finalItemValue : itemValue;
  }

  const createItemsTotal = total?total:(matchedKeys.length?matchedKeys.sort((a,b)=>(b-a))[0]:3) 
  console.log('TCL: createItemsTotal', createItemsTotal);
  console.log('TCL: finalItem', finalItem);
}


const mdata = createItemsParser({
  id: '{{string.id}}',
  title: '{{title}}',
  content: '<p>1111111111111</p>',
  columnIds: '',
  choice: true,
  important: false,
  likes: 0,
  readCount: 2,
  brief: '{{string.long|string.empty|string.short|}}',
  detailLastModifyTime: 1563440795000,
  pgcCategories: [],
});
console.log('TCL: mdata', mdata);

module.exports = createItems