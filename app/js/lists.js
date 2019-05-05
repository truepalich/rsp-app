const form = $('.js-content');


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
      await axios.post('http:/localhost:3000/api/lists', formData);
      window.location.hash = '#';
      $('.js-preloader').hide()
    } catch (error) {
      console.error(error);
    }

    //     axios.post('http:/localhost:3000/api/lists',formData)
    //       .then(function (res) {
    //           window.location.hash = '#';
    //           $('.js-preloader').hide()
    //          })

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

})

$(document).ready(function () {

  const itemId = window.location.hash.split('/').pop();

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
<button type="button" class="btn btn-primary btn-lg btn-block js-back-to-index">Return to homepage</button>`
  }


  form.empty();
  let errorCount = 0;

  async function getListItem(id) {

    try {
      const response = await axios.get(`http://localhost:3000/lists/${id}`);
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

  if (window.location.hash.includes('#api/lists/')) {
    if (checkUrl()){
      getListItem(itemId)
    }
  }

  function checkUrl(){
    if (window.location.hash === '#api/lists/' || window.location.hash === '#api/lists' ){
      window.location.hash = '#';
      return false
    }else {
      return true
    }
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

    $('.js-list-item').each(function () {
      data.push(
        {
          text: $(this).text().replace('\n', ''),
          status: $(this).attr('data-status')
        }
      )
    });

    try {
      await axios.put(`http://localhost:3000/api/lists/${itemId}`, data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });



  $(window).on('popstate',function () {
    if (window.location.hash.includes('#api/lists/')) {
      if (checkUrl()){
        getListItem(itemId)
      }
    }
  })

});




$(window).on('popstate', function () {
  if (window.location.hash === '' || window.location.hash === '#') {
    form.empty()
  }
});