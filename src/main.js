const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const w = localStorage.getItem("w");
const inputWd = $(".wd");
console.log("w");
console.log(w);
const wObject = JSON.parse(w);
const hashMap = wObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://bilibili.com",
  },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //正则表达式删除/后的内容
};

 

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    // console.log(index);
    const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon" >
            <use xlink:href="#icon-close"></use>
        </svg></div>
        </div>
    </li>`).insertBefore($lastLi);
    
    
    $li.on("click", () => {
      window.open(node.url);
    }); //代替a标签实现跳转
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡

      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

// const color=()=>{
   
//         let r = parseInt(Math.random() * 256);
//         let g = parseInt(Math.random() * 256);
//         let b = parseInt(Math.random() * 256);
//         console.log($(".addButton"))
//         console.log("猪猪");
//        console.log($siteList); 

//         return ($('.addButton').background ="rgb(" + r + "," + g + "," + b + ")")   
//     }
//     color()

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加什么网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);

  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("w", string);
};


let isInput=false
$(document).on("keypress", (e) => {
    if (isInput) return;
  console.log(e);
  if (e.target == $("wd")) {
    e.stopPropagation();
  }
  console.log(e.key);
  // const keyCode = e.keyCode  可简写成下面这样
  const { key } = e;

  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
$('.search').on('focus' ,()=>isInput=true)
$('.search').on('blur' ,()=> isInput=false)
