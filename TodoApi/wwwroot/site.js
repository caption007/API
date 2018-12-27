const uri = 'api/todo';
let todos = null;
function getCount(data) {
    const el = $('#counter');
    let name = 'to-do';
    if (data) {
        if (data > 1) {
            name = 'to-dos';
        }
        el.text(data + ' ' + name);
    } else {
        el.html('No ' + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: 'GET',
        url: uri,
        cache: false,
        success: function (data) {
            $('#todos').empty();
            getCount(data.length);
            $.each(data, function (key, item) {
                const checked = item.isComplete ? 'checked' : '';
                $('<tr><td>' + item.id + '</td>' +
                    '<td>' + item.firstname + '</td>' +
                    '<td>' + item.lastname + '</td>' +
                    '<td>' + item.gender + '</td>' +
                    '<td>' + item.phoneNumber + '</td>' +
                    '<td>' + item.birthday + '</td>' +
                    '<td>' + item.address + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.department+'</td>'+
                    '<td><button onclick="editItem(' + item.id + ')">Edit</button></td>' +
                    '<td><button onclick="deleteItem(' + item.id + ')">Delete</button></td>' +
                    '</tr>').appendTo($('#todos'));
            });

            todos = data;
        }
    });
}

function addItem() {
    const item = {
        'id': $('#add-id').val(),
        'firstname': $('#add-firstname').val(),
        'lastname': $('#add-lastname').val(),
        'isComplete': false,
        'phoneNumber': $('#add-phonenumber').val(),
        'birthday': $('#add-birthday').val(),
        'gender': $('#add-gender').val(),
        'address': $('#add-address').val(),
        'email': $('#add-email').val(),
        'department': $('#add-department').val()
    };

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('here');
        },
        success: function (result) {
            getData();
            $('#add-firstname').val('');
            $('#add-lastname').val('');
            $('#add-gender').val('');
            $('#add-phonenumber').val('');
            $('#add-address').val('');
            $('#add-email').val('');
            $('#add-birthday').val('');
            $('#add-department').val('');
            
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + '/' + id,
        type: 'DELETE',
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(todos, function (key, item) {
        if (item.id === id) {
            $('#edit-id').val(item.id);
            $('#edit-firstname').val(item.firstname);
            $('#edit-lastname').val(item.lastname);
            $('#edit-birthday').val(item.birthday);
            $('#edit-phonenumber').val(item.phoneNumber);
            $('#edit-gender').val(item.gender);
            $('#edit-address').val(item.address);
            $('#edit-email').val(item.email);
            $('#edit-department').val(item.department);
        }
    });
    $('#spoiler').css({ 'display': 'block' });
}

$('.my-form').on('submit', function () {
    const item = {
        'id': $('#edit-id').val(),
        'isComplete': $('#edit-isComplete').is(':checked'),
        'firstname': $('#edit-firstname').val(),
        'lastname': $('#edit-lastname').val(),
        'gender': $('#edit-gender').val(),
        'birthday': $('#edit-birthday').val(),
        'phoneNumber': $('#edit-phonenumber').val(),
        'address': $('#edit-address').val(),
        'email': $('#edit-email').val(),
        'department': $('#edit-department').val()
    };

    $.ajax({
        url: uri + '/' + $('#edit-id').val(),
        type: 'PUT',
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });
    closeInput();
    return false;
});



function onSearch(obj) {//js函数开始
    var searchOption = $('#search').val();
    var searchCol = 0; //要搜索的哪一列，这里是第一列，从0开始数起


    switch (searchOption) {
        case "Id": searchCol = 0; break;
        case "Firstname": searchCol = 1; break;
        case "Lastname": searchCol = 2; break;
        case "Phone": searchCol = 4; break;
        case "Adderss": searchCol = 6; break;
        case "Email": searchCol = 7; break;
    }
    setTimeout(function () {//因为是即时查询，需要用setTimeout进行延迟，让值写入到input内，再读取
        var storeId = document.getElementById('Employeetable');//获取table的id标识
        var rowsLength = storeId.rows.length;//表格总共有多少行
        var key = obj.value;//获取输入框的值
      
        for (var i = 1; i < rowsLength; i++) {//按表的行数进行循环，本例第一行是标题，所以i=1，从第二行开始筛选（从0数起）
            var searchText = storeId.rows[i].cells[searchCol].innerHTML;//取得table行，列的值
            if (searchText.match(key)) {//用match函数进行筛选，如果input的值，即变量 key的值为空，返回的是ture，
                storeId.rows[i].style.display = '';//显示行操作，
            } else {
                storeId.rows[i].style.display = 'none';//隐藏行操作
            }
        }
    }, 200);//200为延时时间
}


function closeInput() {
    $('#spoiler').css({ 'display': 'none' });
}

function Open() {
    $('#add-spoiler').css({ 'display': 'block' });
}

function Close() {
    $('#add-spoiler').css({ 'display': 'none' });
}