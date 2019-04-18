console.log('listjs loaded');

const content = $('.js-content');

const form = $(`<div class="row js-common-section" id="add-list-section" style="display: none">
   <div class="col">
      <h4>Add list</h4>
      <form>
         <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control">
         </div>
         <div class="form-group js-form-group">
            <div class="input-group">
               <input type="text" class="form-control" placeholder="Enter text" aria-label="Input group example" aria-describedby="btnGroupAddon">
               <div class="input-group-prepend">
                  <button class="input-group-text" id="btnGroupAddon">+</button>
               </div>
            </div>
         </div>
         <button type="submit" class="btn btn-primary btn-block">Submit</button>
      </form>
   </div>
</div>`);


content.append(form);
let show = false;
$('.js-link-add-list').click(function () {

    if (!show){
        $('#add-list-section').show()
        show = !show
    } else {
        $('#add-list-section').hide();
        show = !show
    }
})

$('body').on('click','#btnGroupAddon',function (e) {
    e.preventDefault();
    $(this).parent().append(`<button class="input-group-text" id="removeItem">-</button>`);
    this.remove();
    $('.js-form-group').append(`
<div class="input-group">
    <input type="text" class="form-control" placeholder="Enter text" aria-label="Input group example" aria-describedby="btnGroupAddon">
    <div class="input-group-prepend">
       <button class="input-group-text" id="btnGroupAddon">+</button>
    </div>
</div>`)
});


$('body').on('click','#removeItem',function (e) {
    $(this).parents('.input-group').remove()
});




