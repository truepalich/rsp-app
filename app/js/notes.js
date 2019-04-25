$(window).on('popstate', function () {
    // Load Add-note page after refresh
    if (window.location.hash && window.location.hash == '#notes') {
        showAddNoteForm();
    }

    // Load Edit-note page after refresh
    if (window.location.hash && window.location.hash.includes('#notes/')) {
        showEditNoteForm();
        //#notes/5cbc96c47c2b9b029beef540
    }
})



// $(document ).ready(function() {
    // $(window).on('popstate', function () {

        // Load Add-note page after refresh
        if (window.location.hash && window.location.hash == '#notes') {
            showAddNoteForm();
        }

        // Load Edit-note page after refresh
        if (window.location.hash && window.location.hash.includes('#notes/')) {
            showEditNoteForm();
            //#notes/5cbc96c47c2b9b029beef540
        }

        // Load Add-note page after click
        $('.js-link-add-note').click(function () {
            showAddNoteForm();
        })

        // Render Add-note page
        function showAddNoteForm() {
            preShowContent();

            // Markup of Add-note page
            let htmlTemplate = '<div class="row js-common-section" id="add-note-section">\n' +
                '                <div class="col">\n' +
                '                    <h4>Add note</h4>\n' +
                '                    <form>\n' +
                '                        <div class="form-group">\n' +
                '                            <label>Title:</label>\n' +
                '                            <input type="text" class="form-control js-form-note-title">\n' +
                '                        </div>\n' +
                '                        <div class="form-group">\n' +
                '                            <label>Description:</label>\n' +
                '                            <textarea class="form-control js-form-note-text" rows="3"></textarea>\n' +
                '                        </div>\n' +
                '                        <button type="submit" class="btn btn-primary btn-block js-submit-form">Submit</button>\n' +
                '                    </form>\n' +
                '                </div>\n' +
                '            </div>';

            $('.js-content').html(htmlTemplate);

            // Add-note action
            $('.js-submit-form').click(function (e) {
                e.preventDefault();
                let formTitle = $('.js-form-note-title').val();
                let formText = $('.js-form-note-text').val();
                if (formTitle.length > 0 && formText.length > 0) {
                    $('.js-error').hide();
                    // $('.js-common-section').hide();
                    $('.js-preloader').show();

                    axios.post('http://localhost:3000/api/notes/', {
                        title: formTitle,
                        desc: formText,
                        type: 'notes'
                    })
                        .then(function (response) {
                            // window.location.href = window.location.origin + window.location.pathname;
                            window.location.hash = '#';
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
                    // Validate form
                    if (formTitle.length == 0) {
                        $('#add-note-section .js-form-note-title').addClass('border-danger');
                    } else {
                        $('#add-note-section .js-form-note-title').removeClass('border-danger');
                    }
                    if (formText.length == 0) {
                        $('#add-note-section .js-form-note-text').addClass('border-danger');
                    } else {
                        $('#add-note-section .js-form-note-text').removeClass('border-danger');
                    }
                    $('.js-error').text('Please enter Title and Description');
                    $('.js-error').show();
                }
            })
        }

        // Render Edit-note page
        function showEditNoteForm() {
            preShowContent();

            // Markup of Edit-note page
            let htmlTemplate = '<h4>Single note</h4>\n' +
                '        <form id="edit-note-section">\n' +
                '            <div class="form-group">\n' +
                '                <label>Title:</label>\n' +
                '                <input type="text" class="form-control js-form-note-title">\n' +
                '            </div>\n' +
                '            <div class="form-group">\n' +
                '                <label>Description:</label>\n' +
                '                <textarea class="form-control js-form-note-text" rows="3"></textarea>\n' +
                '            </div>\n' +
                '            <button type="submit" class="btn btn-primary btn-block js-btn-edit">Edit</button>\n' +
                '            <a href="#" class="btn btn-primary btn-block" data-toggle="modal" data-target="#modal">Delete</a>\n' +
                '            <a href="#" class="btn btn-primary btn-block">Back to notes</a>\n' +
                '        </form>\n' +
                '        <div class="modal js-modal" id="modal" tabindex="-1" role="dialog" aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <h5 class="modal-title">Are you sure, you want to delete?</h5>\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                            <span aria-hidden="true">&times;</span>\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>\n' +
                '                        <button type="button" class="btn btn-primary js-btn-delete-note">Yes</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>';

            $('.js-preloader').show();
            $('.js-content').html(htmlTemplate);
            $('.js-content').hide();

            // Add data to Edit-note page
            if (window.location.hash && window.location.hash.includes('#notes/')) {
                axios.get('http://localhost:3000/notes/' + window.location.hash.replace('#notes/', ''))
                    .then(function (response) {
                        $('.js-form-note-title').val(response.data.title);
                        $('.js-form-note-text').val(response.data.desc);
                        $('.js-content').show();
                    })
                    .catch(function (error) {
                        $('.js-error').text(error.message);
                        $('.js-error').show();
                    })
                    .then(function () {
                        // always executed
                        $('.js-preloader').hide();
                    });
            }

            // Delete-note action
            $('.js-btn-delete-note').click(function () {
                $('.js-modal').modal('hide');
                preShowContent();

                axios.delete('http://localhost:3000/api/notes/' + window.location.hash.replace('#notes/', ''))
                    .then(function (response) {
                        window.location.hash = '#';
                    })
                    .catch(function (error) {
                        $('.js-error').text(error.message);
                        $('.js-error').show();
                    })
                    .then(function () {
                        // always executed
                        $('.js-preloader').hide();
                    });
            })

            // Edit-note action
            $('.js-btn-edit').click(function (e) {
                let formTitle = $('.js-form-note-title').val();
                let formText = $('.js-form-note-text').val();

                if (formTitle.length > 0 && formText.length > 0) {
                    $('.js-preloader').show();

                    axios.put('http://localhost:3000/api/notes/' + window.location.hash.replace('#notes/', ''), {
                            title: formTitle,
                            desc: formText,
                            type: 'notes'
                        })
                        .then(function (response) {
                            window.location.hash = '#';
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
                    // Validate form
                    if (formTitle.length == 0) {
                        $('#edit-note-section .js-form-note-title').addClass('border-danger');
                    } else {
                        $('#edit-note-section .js-form-note-title').removeClass('border-danger');
                    }
                    if (formText.length == 0) {
                        $('#edit-note-section .js-form-note-text').addClass('border-danger');
                    } else {
                        $('#edit-note-section .js-form-note-text').removeClass('border-danger');
                    }
                    $('.js-error').text('Please enter Title and Description');
                    $('.js-error').show();
                }
                e.preventDefault();
            })
        }


        // Global functions
        function preShowContent() {
            $('.js-preloader').hide();
            $('.js-error').hide();
            $('.js-content').text('');
        }

    // });
// });