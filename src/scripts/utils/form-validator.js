
class Validator{
    static init(){
        $('[name]').keyup(function(){
            $(this).removeClass('is-invalid');
            $(this).parent().find('.invalid-feedback').remove();
        })
    }
    
    static handleError(errors){
        Object.keys(errors).map((field) => {
            errors[field].map((message) => {
                $(`[name='${field}']`).removeClass('is-invalid');
                $(`[name='${field}']`).parent().find('.invalid-feedback').remove();
    
                $(`[name='${field}']`).addClass('is-invalid')
                $(`[name='${field}']`).after(`<div class="invalid-feedback">${message}</div>`)
            })
        })
    }
}





module.exports = Validator