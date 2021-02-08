// const changeText = () => {
//     let str = document.getElementById('text').innerText;
//     let strtwo = document.getElementById("texttwo").innerText;
//     console.log(str);
//     strtwo.innerHTML = str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
// }
// window.onload = changeText();

// Не пойму почему не работало, сделал 2й вариант.)

function changeText() {
  document.getElementById("texttwo").innerHTML = document
    .getElementById("text")
    .innerHTML.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
}

window.onload = changeText();
