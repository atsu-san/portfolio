// 入力値が半角の1～12であるかどうかを動的にチェック
// 全角の数字が入力された場合は半角に変換
const div = document.querySelector("div");
const input = document.querySelector("input");

input.addEventListener("keyup", function () {
    let str = input.value;

    let re = new RegExp(/[０-９]/, 'g');
    if (str.match(re)) {
        input.value = str = str.replace(re, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    re = new RegExp(/^([1-9]|(1[0-2]))$/);
    if (str != "" && !str.match(re)) {
        div.textContent = "数字（1～12）を入力してください。"
    } else {
        div.textContent = "";
    }
});