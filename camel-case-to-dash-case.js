export default function transformer(file, api) {
  const { source, path } = file;
    const { jscodeshift: j } = api;
    const root = j(source);   
    let usedKeys = [];
  
    root.find(j.ImportDeclaration).filter(p => {
      return p.value.source.type === 'StringLiteral' &&
      p.value.source.value.endsWith('.scss')
    })
    .forEach(p => {
      p.value.specifiers.forEach(s=>{
        if(s.type == 'ImportNamespaceSpecifier'){
          if(!usedKeys[s.local.name]){
            usedKeys.push(s.local.name)
          }
        }
      })
    })
    usedKeys.map(n=>{
      root.find(j.MemberExpression,{
        object: { name: n}
      }).forEach(p => {
        if(p.value.property.type == 'Identifier'){
          p.value.property.name =  `"${p.value.property.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}"`
          p.value.property.raw= `"${p.value.property.name }"`
          p.value.computed =true
        }
      })
    })
  
    return root.toSource({ quote: 'single' }); 
  }
