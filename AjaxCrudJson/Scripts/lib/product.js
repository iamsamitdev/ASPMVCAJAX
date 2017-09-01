$(function () {
    // Load function getProducts
    getProducts();
});

// ประกาศตัวแปรไว้ตรวจสอบว่าเป็นการ update หรือ insert
var isUpdateable = false;

// clear form เมื่อกดปิดหน้าต่าง
$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
    isUpdateable = false;
});

// Get product list from json to table
function getProducts() {
    $.ajax({
        url: '/Product/GetProducts/',
        type: 'GET',
        dataType: 'json',
        /*headers: {
            'Authorization': 'basic' + baot(username + ':' + password)
        },
        */
        success: function (data) {
            //console.log(data);
            // loop data json to table
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>";
                rows += "<td>" + item.Id + "</td>";
                rows += "<td>" + item.Name + "</td>";
                rows += "<td>" + item.Price + "</td>";
                rows += "<td><button type='button' id='btnEdit' class='btn btn-warning' onclick='return getProductById(" + item.Id + ")'>Edit</button>";
                rows += "&nbsp;&nbsp;<button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteProductById(" + item.Id + ")'>Delete</button>";
                rows += "</td>";
                rows += "</tr>";
            });

            $('#listProducts tbody').html(rows);
        },
        error: function (err) {
            console.log("Error: " + err.responseText);
        }
    });
}


// Get product by id
function getProductById(id) {
    $('#title').text('Product Detail');
    $.ajax({
        url: '/Product/Get/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#Id").val(data.Id);
            $('#Name').val(data.Name);
            $('#Price').val(data.Price);
            isUpdateable = true;
            // เปิด pouup (Modal)
            $('#productModal').modal('show');
        },
        error: function (err) {
            console.log("Error: " + err.responseText);
        }
    });
}

// Validate form Insert and Update
$('#add_update_form').validate({
    rules: {
        Name: {
            required: true
        },
        Price: {
            required: true
        }
    },
    messages: {
        Name: {
            required: "กรอกชื่อสินค้าก่อน"
        },
        Price: {
            required: "กรอกราคาสินค้าก่อน"
        }
    },
    errorClass: "error-valid",
    errorPlacement: function (error, element) {
        error.appendTo(element.parent());
    },
    submitHandler: function (form) {
        // Post /Product/Create
        var input_data = {
            Id: $("#Id").val(),
            Name: $('#Name').val(),
            Price: $('#Price').val()
        };

        if (!isUpdateable) {
            $.ajax({
                url: '/Product/Create/',
                type: 'POST',
                dataType: 'json',
                data: input_data,
                success: function (data) {
                    // load all data
                    getProducts();
                    // Close popup (Modal)
                    $('#productModal').modal('hide');
                    // Clear data in popup
                    clear();
                },
                error: function (err) {
                    console.log("Error: " + err.responseText);
                }
            });
        }
            // update data
        else {
            $.ajax({
                url: '/Product/Update/',
                type: 'POST',
                dataType: 'json',
                data: input_data,
                success: function (data) {
                    // load all data
                    getProducts();
                    isUpdateable = false;
                    // Close popup (Modal)
                    $('#productModal').modal('hide');
                    // Clear data in popup
                    clear();
                },
                error: function (err) {
                    console.log("Error: " + err.responseText);
                }
            });
        }
    }

});

// Delete product by id
function deleteProductById(id) {
    var conf = confirm("Are you sure to delete ?");
    if (conf) {
        $.ajax({
            url: "/Product/Delete/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                getProducts();
                $("#confirmModal").modal('hide');
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });
        e.preventDefault();
    }
}

// Set title for create new
$("#btnCreate").click(function () {
    $("#title").text("Create New");
});

// Clear data in form
function clear() {
    $('#Name').val('');
    $('#Price').val('');
}