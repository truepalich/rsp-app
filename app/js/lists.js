const form = $('.js-content');
const link = 'https://shielded-earth-58434.herokuapp.com/';


$(document).ready(function () {
  console.log('listjs loaded');
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

  if (window.location.hash === '#lists') {
    appendForm()
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


  async function sendFormData() {
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

    try {
      await axios.post(`${link}api/lists`, formData);
      window.location.hash = '#';
      $('.js-preloader').hide()
    } catch (error) {
      console.error(error);
    }
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

    let emptyElements = formControl.filter(function () {
      return this.value === ''
    });

    emptyElements.map(function () {
      $(this).addClass('border-danger');
    });

    if (emptyElements.length === 0) {
      callback();
    }
  }

  $(window).on('popstate', function () {
    if (window.location.hash === '#lists') {
      appendForm()
    }
  });

});

$(document).ready(function () {

  let itemId = window.location.hash.split('/').pop();

  function generateListItem(data) {
    return `
        <ul class="list-group">
  ${data.list.map((item, i) => {
      return `<li class="list-group-item js-list-item
                ${data.list[i].status === 'false' ? "js-list-item-inactive" : ""}"
                data-status=${data.list[i].status}>${data.list[i].text}</li>`
    }).join('')}
</ul>
        <button type="button" class="btn btn-primary btn-lg btn-block js-update-list-item">Save</button>
        <button type="button" class="btn btn-primary btn-lg btn-block btn-danger js-delete-list-item">Delete list</button>
        <button type="button" class="btn btn-primary btn-lg btn-block js-back-to-index">Return to homepage</button>`
  }


  let errorCount = 0;

  async function getListItem(id) {

    try {
      const response = await axios.get(`${link}lists/${id}`);
      form.empty();
      form.append(generateListItem(response.data[0]))
    } catch (error) {
      errorCount++;
      if (errorCount === 5) {
        return $('.js-error').show()
      }
      getListItem(itemId);
    }
  }

  if (itemId.length === 24) {
    getListItem(itemId)
  }


  $('body').on('click', '.js-list-item', function () {
    // console.log(typeof $(this).data('status'));
    let statusValue = $(this).attr('data-status');

    if (statusValue === 'true') {
      $(this).addClass('js-list-item-inactive');
      statusValue = 'false'
      $(this).attr('data-status', statusValue)

    } else if (statusValue === 'false') {
      $(this).removeClass('js-list-item-inactive');
      statusValue = 'true';
      $(this).attr('data-status', statusValue)
    }

  });

  $('body').on('click', '.js-back-to-index', function () {
    window.location.hash = '#'
  });


  $('body').on('click', '.js-update-list-item', async function (e) {
    e.preventDefault();
    let data = [];
    $('.js-preloader').show();

    $('.js-list-item').each(function () {
      data.push(
        {
          text: $(this).text().replace('\n', ''),
          status: $(this).attr('data-status')
        }
      )
    });

    try {
      await axios.put(`${link}api/lists/${itemId}`, data);
      $('.js-preloader').hide();
    } catch (error) {
      return $('.js-error').show()
    }
  });



  $(window).on('popstate',function () {
     itemId = window.location.hash.split('/').pop();

     if (window.location.hash.includes('#lists/') && itemId.length === 24) {
       getListItem(itemId)
     }

  })



  $('body').on('click', '.js-delete-list-item', function (e) {

    form.append(
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
        '                        <button type="button" class="btn btn-primary js-btn-delete-list">Yes</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>'
    );

    e.preventDefault();
    $('.js-preloader').show();
    $('.js-modal').modal('show');

    $('.js-modal').on('hidden.bs.modal', function (e) {
      $('.js-modal').remove()
    })

    $('.js-btn-delete-list').on('click',async function () {
      try {
        await axios.delete(`${link}api/lists/${itemId}`);
        $('.js-preloader').hide();
        $('.js-modal').modal('hide')
        window.location.hash = '#';
      } catch (error) {
        return $('.js-error').show()
      }

    })




  });

});
