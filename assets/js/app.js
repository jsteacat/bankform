$(function() {
    var submitBtn = $('button[type="submit"]'),
        field = $('.validate input[type="text"]');
        noRus = $('.validate input[name="is_russian"][value="no"]');

    var isResolveSubmit = function() {
        var resolve;

        if($('.validate input[name="is_russian"]:checked').val() === 'no') {
            noRus.addClass('invalid');
            noRus.parents('.validate').addClass('touched');
            noRus.parents('.validate').find('.input-group__tooltip--invalid').addClass('display-error');
        } else {
            noRus.removeClass('invalid');
            noRus.parents('.validate').find('.input-group__tooltip--invalid').removeClass('display-error');
        }

        field.each(function() {
            var $this = $(this);

            if($this.val() === '') {
                $(this).addClass('invalid');

                $(this).parents('.validate').find('.input-group__tooltip--invalid').addClass('display-error');
            } else {
                $(this).removeClass('invalid');
                $(this).parents('.validate').find('.input-group__tooltip--invalid').removeClass('display-error');
            }

        });

        resolve = !$('.validate input').is($('.invalid'));

        return resolve;
    };

    field.on('change', function(){
        $(this).parents('.validate').addClass('touched');
    });

    $('.form :input').on('change', function() {
        if(isResolveSubmit()) {
            submitBtn.attr('disabled', false);
        } else {
            submitBtn.attr('disabled', true);
        }
    });
});