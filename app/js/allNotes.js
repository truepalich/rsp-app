// window.onpopstate = history.onpushstate = function () {
//     if (window.location.hash == '') {
//         console.log('homepage');
//     }
// }
if (window.location.hash == '') {
    generateContent();
}

$(window).on('popstate', function () {
    if (window.location.hash == '') {
        generateContent();
    }
})

function generateContent() {
    // 0) Очищаем js-content
    // 1) Функия создания портянки(списка) - TITLE
    // 2) href="#notes/23423423423423"
    // 3) href="#lists/23423423423423"
}
