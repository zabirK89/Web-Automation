const puppeteer = require("puppeteer")
const loginLink = 'https://www.hackerrank.com/auth/login'
const email = "zabirk89@gmail.com";
const password = "Akash@123"

let browserOpen = puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],

    defaultViewport: null
})
let page

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 })
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })
    return passwordIsEntered
}).then(function(){

    let loginbutton=page.click(`button[data-analytics="LoginPassword"]`,{delay:50})
 return loginbutton
}).then(function(){
    let algopromise=waitandclick(`.topic-card a[data-attr1="algorithms"]`,page)
    return algopromise
}).then(function () {
    let warmuppromise=waitandclick(`input[value="warmup"]`,page)
    return warmuppromise
}).then(function () {
    let waitfor3sec=page.waitFor(3000)
    return waitfor3sec
}).then(function () {
    let allchallenges=page.$$(`.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled`,{dalay:50})
    return allchallenges
}).then(function (questionArr) {
    console.log("number of question",questionArr.length);
    let questionwillbesolve=quessolve(questionArr[0])
    return questionwillbesolve
})

function quessolve(question) {
    return new Promise(function (resolve,reject) {
        let queswillbeclicked=question.click()
        queswillbeclicked.then(function(){
            let editorpromise=waitandclick(`.monaco-editor.no-user-select.vs`,page)
            return editorpromise
        }).then(function () {
            return waitandclick(`.checkbox-input`,page)
        }).then(function () {
            return page.waitForSelector(`textarea.custominput`,page)

        }).then(function () {
            
        })

    })
}



//wait for page reload because before reload selector does not come
function waitandclick(selector,cpage){
    return new Promise(function(resolve,reject){
        let waitformodepromise=cpage.waitForSelector(selector)
        waitformodepromise.then(function(){
            let clickmodal=cpage.click(selector)
            return clickmodal
        }).then(function(){
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}