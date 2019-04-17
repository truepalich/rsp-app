$(document ).ready(function() {

    if (window.location.hash && window.location.hash == '#notes') {
        showAddNoteForm();
    }

    $('.js-link-add-note').click(function () {
        showAddNoteForm();
    })

    function showAddNoteForm() {
        preShowContent();

        let htmlTemplate = '<div class="row js-common-section" id="add-note-section">\n' +
            '                <div class="col">\n' +
            '                    <h4>Add note</h4>\n' +
            '                    <form>\n' +
            '                        <div class="form-group">\n' +
            '                            <label>Title</label>\n' +
            '                            <input type="text" class="form-control js-form-note-title">\n' +
            '                        </div>\n' +
            '                        <div class="form-group">\n' +
            '                            <label>Description</label>\n' +
            '                            <textarea class="form-control js-form-note-text" rows="3"></textarea>\n' +
            '                        </div>\n' +
            '                        <button type="submit" class="btn btn-primary btn-block js-submit-form">Submit</button>\n' +
            '                    </form>\n' +
            '                </div>\n' +
            '            </div>';

        $('.js-content').html(htmlTemplate);

        $('.js-submit-form').click(function (e) {
            let formTitle = $('.js-form-note-title').val();
            let formText = $('.js-form-note-text').val();
            if (formTitle.length > 0 && formText.length > 0) {
                $('.js-error').hide();
                $('.js-common-section').hide();
                $('.js-preloader').show();

                axios.post('http://localhost:3000/api/notes/', {
                    title: formTitle,
                    desc: formText,
                    type: 'note'
                })
                    .then(function (response) {
                        console.log(window.location);
                        window.location.href = window.location.origin + window.location.pathname;
                    })
                    .catch(function (error) {
                        $('.js-error').text(error.message);
                        $('.js-error').show();
                    })
                    .then(function () {
                        // always executed
                        $('.js-preloader').hide();
                    });

            } else {
                $('.js-error').text('Please enter Title and Description');
                $('.js-error').show();
            }
            e.preventDefault();
        })
    }

    function preShowContent() {
        $('.js-preloader').hide();
        $('.js-error').hide();
        $('.js-content').text('');
    }

});





