// Gets and renders all todo list items

function getTodoItems() {
    $.ajax({
        url: "php/getToDo.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            
            if (result['status']['name'] == "ok") {

                renderTodoItems(result['data']);

            }
		
        },
        error: function(jqXHR, textStatus, errorThrown) {

            // alerts the user of an error and prints it to the console
            console.log(jqXHR, textStatus, errorThrown);
            alert(textStatus);
            
        }
    }); 
}

function renderTodoItems(data) {

    var dataHTML = data.map(item => `<tr id="Row${item['id']}">
        <td>${item['item']}</td>
        <td><button class="DeleteSubmit" id="Button${item['id']}">Done</button></td>
    </tr>`);

    $('#ToDoTable').html(dataHTML);

}

$(window).on('load', function () {
    getTodoItems();
});

// adds a todo list item

var validateText = function(text) {

    var regex = new RegExp(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/);

    if (regex.test(text)) {
        return true;
    } else {
        return false;
    }

}

$('#AddSubmit').on('click', function() {
    if (validateText($('#AddInput').val())) {
        $.ajax({
            url: "php/addToDo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                inputText: $('#AddInput').val()
            },
            success: function(result) {
                
                if (result['status']['name'] == "ok") {
    
                    getTodoItems();
                    $('#AddInput').css('outline', '0');
                    $('#AddInput').val("");
    
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
    
                // alerts the user of an error and prints it to the console
                console.log(jqXHR, textStatus, errorThrown);
                alert(textStatus);
                
            }
        });
    } else {
        $('#AddInput').css('outline', '2px solid red');
    }
});

// deletes a todo list item

$('body').on('click', '.DeleteSubmit', function (event) {

    var rowId = event.target.id;
    var id = rowId.replace("Button", "");

    $.ajax({
        url: "php/deleteToDo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(result) {

            if (result['status']['name'] == "ok") {

                getTodoItems();

            }

        },
        error: function(jqXHR, textStatus, errorThrown) {

            // alerts the user of an error and prints it to the console
            console.log(jqXHR, textStatus, errorThrown);
            alert(textStatus);
            
        }
    });
});