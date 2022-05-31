const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const w = localStorage.getItem('w')
console.log('w');
console.log(w);
const wObject = JSON.parse(w)
const hashMap = wObject || [{
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://bilibili.com'
    },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '')
        .replace(/\/.*/, '') //正则表达式删除/后的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
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
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        }) //代替a标签实现跳转
        $li.on('click', '.close', (e) => {

            e.stopPropagation() //阻止冒泡

            console.log(hashMap);
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()




$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加什么网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url);

        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        });
        render()
    });
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('w', string)

}

$(document).on('keypress', (e) => {
    console.log(e.key);
    // const keyCode = e.keyCode  可简写成下面这样
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            event.preventDefault() 
            window.open(hashMap[i].url)
        }

    }
})