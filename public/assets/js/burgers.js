$(function() {
    // click event for "devour" button
    $('.change-devour').on('click', function(event) {
        var id = $(this).data('id');
        var newDevour = $(this).data('newdevour');

        var newDevourState = {
            devoured: newDevour
        };

        // send the PUT request using ajax
        $.ajax('/api/burgers' + id, {
            type: 'PUT',
            data: newDevourState
        }).then(
            function() {
                console.log('changed devour state to', newDevour);

                location.reload();
            }
        );
    });

    // click event for adding a new burger
    $('#create-burger').on('submit', function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $('#textarea1').val().trim(),
            devoured: 0
        };

        // send POST request using ajax
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(function() {
            console.log('new burger created: ${JSON.stringify(newBurger)}');
            // reload page to get updated list
            location.reload();
        });
    });
});