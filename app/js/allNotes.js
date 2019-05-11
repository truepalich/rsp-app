// запрос на сервер получить коллекцию вынять title и копировать list вставляя в href=type/id
// 0) Очищаем js-content
// 1) Функия создания портянки(списка) - TITLE
// 2) href="#notes/23423423423423"
// 3) href="#lists/23423423423423"

if (window.location.hash == '') {
    generateContent();
}

$(window).on('popstate', function() {
    if (window.location.hash == '') {
        $('.js-error').hide();
        generateContent();
    }
})

function generateContent() {
    $('.js-content').empty();
    const listNotes = $('.js-content').append(`
<div class="row js-common-section" id="add-list-section" style="display: block">
   <div class="col">
      <h4 style="text-align: center">YOUR LIST OF NOTES</h4>
      <div class="list-group"></div>`);

    axios.get('https://shielded-earth-58434.herokuapp.com/api/all-notes')
        .then(function(response) {
            listNotes;

            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].title === undefined) response.data[i].title = "";
                if (response.data[i].type === "notes" || response.data[i].type === "lists") { $('.list-group').append(`<a href = "#${response.data[i].type}/${response.data[i]._id}" class="list-group-item list-group-item-action">${response.data[i].title}</a>`); }

            }
        })
        .catch(function(error) {
            $('.js-error').text(error.message);
            $('.js-error').show();
        })
        .then(function() {
            // always executed
            $('.js-preloader').hide();
        });
}