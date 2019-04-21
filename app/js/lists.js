
(function () {
    console.log('listjs loaded');
    const form = $('.js-content');
    let formData =
        {
            title: "Title of list",
            list: [
                {
                    text: "text of list",
                    status: true
                }
            ],
            type: "lists"
        };

    const bodyTag = $('body');

    function appendForm() {
        form.empty();
        form.append(`
<div class="row js-common-section" id="add-list-section" style="display: block">
   <div class="col">
      <h4>Add list</h4>
      <form>
         <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" id="list-title">
         </div>
         <div class="form-group js-form-group">
            <div class="input-group">
               <input type="text" class="form-control list-elem-data" placeholder="Enter text" aria-label="Input group example" aria-describedby="btnGroupAddon">
               <div class="input-group-prepend">
                  <button class="input-group-text" id="btnGroupAddon">+</button>
               </div>
            </div>
         </div>
         <button type="submit" class="btn btn-primary btn-block js-submit-list">Submit</button>
      </form>
   </div>
</div>`);
    }




    bodyTag.on('click', '#btnGroupAddon', function (e) {
        e.preventDefault();
        $(this).parent().append(`<button class="input-group-text" id="removeItem">-</button>`);
        this.remove();
        $('.js-form-group').append(`
<div class="input-group">
    <input type="text" class="form-control list-elem-data" placeholder="Enter text" aria-label="Input group example" aria-describedby="btnGroupAddon">
    <div class="input-group-prepend">
       <button class="input-group-text" id="btnGroupAddon">+</button>
    </div>
</div>`)
    });


    bodyTag.on('click', '#removeItem', function (e) {
        $(this).parents('.input-group').remove()
    });


    function sendFormData() {
        let list = [];
        $('.list-elem-data').each(function () {
            list.push(
                {
                    text: $(this).val(),
                    status: true
                }
            )
        });

        formData =
            {
                title: $('#list-title').val(),
                list: list,
                type: "lists"
            };

        $('.js-preloader').show();

        axios.post('http:/localhost:3000/api/lists',formData)
          .then(function (res) {
              window.location.hash = '#';
              $('.js-preloader').hide()
    })

    }


    bodyTag.on('click', '.js-submit-list', function (e) {
        e.preventDefault();
        checkForm(sendFormData);
    });

    function checkForm(callback) {
        const formControl = $('.form-control');
        formControl.each(function () {
            $(this).removeClass('border-danger')
        });

        let empty = formControl.filter(function () {
            return this.value === ''
        });

        empty.map(function () {
            $(this).addClass('border-danger');
        });

        if (empty.length === 0) {
            callback();
        }
    }

    $(window).on('popstate', function () {
        if (window.location.hash === '#lists') {
            appendForm()
        }
    });

})();


