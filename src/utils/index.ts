// 封装一个函数，让str中的target部分高亮显示，忽略大小写
export function highlight(str: string, target: string):string {
  const reg = new RegExp(target, 'gi')
  return str.replace(reg, `<span class="highlight">$&</span>`)
  // return str.replace(reg, (match) => `<span style="color:red;">${match}</span>`)
}