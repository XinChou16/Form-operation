/**
 *  @xin chou 
 * Create on: 2017-07-08
 */


$(function () {
    var formHandle = (function(){
        // 新增按钮添加新的一行
        function _newRow(data) {
            var btn = $('#btn');
            var info = $('#info');

            btn.click(function(){
                var tr = $('<tr></tr>');
                var trHtml = '';
                trHtml += '<td><span class="textShow nametxt" style="display:none;" >';
                trHtml += '</span><input  type="text" class="form-control name" placeholder="姓名" ></td><td><span class="textShow sextxt" style="display:none;" >';
                trHtml += '</span><input  type="text" class="form-control sex" placeholder="性别" ></td><td><span class="textShow agetxt" >';
                trHtml += '</span><input  type="text" class="form-control age" placeholder="年龄" ></td><td><span class="textShow schooltxt" style="display:none;" >';
                trHtml += '</span><input  type="text" class="form-control school" placeholder="学校" ></td>';
                trHtml += '<td><a href="#" class="modify" style="display:none;">修改</a>';
                trHtml += '<a href="#" class="delete" style="display:none;">删除</a>';
                trHtml += '<a href="#" class="confirm">确认</a>';
                trHtml += ' <a href="#" class="cancel">取消</a></td>';

                tr.html(trHtml);
                tr.prependTo(info);
                // 确认，取消  修改，删除
                _btnConfirm(data);
            })
        }

        // 确认提交等方法
        function _btnConfirm(data) {
            var info = $('#info');
            var confirm = $('.confirm');
            var cancel = $('.cancel');
            var modify = $('.modify');
            var del = $('.delete');
            var name = $('.name');
            var sex = $('.sex');
            var age = $('.age');
            var school = $('.school');
            var textShow = $('.textShow');
            var nameValue = $('.nametxt')
            var sexValue = $('.sextxt')
            var ageValue = $('.agetxt')
            var schoolValue = $('.schooltxt')
            
            //确认
            confirm.click(function(){
                if (!name[0].value || !sex[0].value || !age[0].value || !school[0].value ) {
                    alert('输入不完整，请重新输入');
                    return false;
                }
                // 提交数据
                $.post(
                    '/saveUser',
                    {
                        name: name.val(),
                        sex: sex.val(),
                        age: age.val(),
                        school: school.val()
                    },
                    function(data){
                        console.log('Post data success~666')
                        // 显示数据  
                        textShow.each(function(index){
                            $(this).show();
                            switch (index) {
                                case 0:
                                    $(this).html(data.name);
                                    break;
                                case 1:
                                    $(this).html(data.sex);
                                    break;
                                case 2:
                                    $(this).html(data.age);
                                    break;
                                case 3:
                                    $(this).html(data.school);
                                    break;
                                default:
                                    break;
                            }
                        })

                        // 显示数据，隐藏输入框
                        _showInput();
                        // 删除操作
                        _delInfo(data);
                        // 修改操作
                        _modifyInfo(data);
                    }
                )
            })

            // 取消
            cancel.click(function () {
                // 1.移除节点
                $('#info tr').get(0).remove();
            })

            // 修改
            function _modifyInfo(data){
                modify.click(function () {
                    confirm.unbind('click').click(function(){
                        // 检测数据是否发生变动，变动则提交修改数据请求
                        if (name[0].value != nameValue.text() || sex[0].value != sexValue.text() || age[0].value != ageValue.text() || school[0].value != schoolValue.text()) {
                            $.post(
                                '/modify',
                                {
                                    id: data._id,// 传id值给后台，后台再进行对数据库的操作  
                                    name: name.val(),
                                    sex: sex.val(),
                                    age: age.val(),
                                    school: school.val()
                                },
                                function(data) {
                                    // 显示数据  
                                    console.log(data)
                                    textShow.each(function(index){
                                        $(this).show();
                                        switch (index) {
                                            case 0:
                                                $(this).html(data.name);
                                                break;
                                            case 1:
                                                $(this).html(data.sex);
                                                break;
                                            case 2:
                                                $(this).html(data.age);
                                                break;
                                            case 3:
                                                $(this).html(data.school);
                                                break;
                                            default:
                                                break;
                                        }
                                    })
                                }
                            )
                            // 显示数据，隐藏输入框
                            _showInput();
                            // console.log('1')
                        }else{
                            alert('数据没有进行修改，请重新检查');
                        }
                    })
                    
                    textShow.each(function(index) {
                        $(this).hide()
                    })
                    _hideInput();
                })
            }

            // 删除
            function _delInfo(data){
                del.click(function () {
                    // 1.移除节点
                    $('#info tr').get(0).remove();
                    // 2.删除数据
                    $.post(
                        '/delete',
                        {
                            id: data._id,
                        },
                        function(data){
                            // 返回的data为字符串
                            console.log(data);
                        }
                    )
                })
            }
        }

        // 显示输入框
        function _showInput(){
            var confirm = $('.confirm');
            var cancel = $('.cancel');
            var modify = $('.modify');
            var del = $('.delete');
            var name = $('.name');
            var sex = $('.sex');
            var age = $('.age');
            var school = $('.school');
            name.hide();
            sex.hide();
            age.hide();
            school.hide();
            confirm.hide();
            cancel.hide();
            modify.show();
            del.show();
        }

        // 隐藏输入框
        function _hideInput(){
            var confirm = $('.confirm');
            var cancel = $('.cancel');
            var modify = $('.modify');
            var del = $('.delete');
            var name = $('.name');
            var sex = $('.sex');
            var age = $('.age');
            var school = $('.school');
            name.show();
            sex.show();
            age.show();
            school.show();
            confirm.show();
            cancel.show();
            modify.hide();
            del.hide();
        }

        // 渲染显示数据的方法
        function _renderInfo(data) {
            var info = $('#info');
            var html = '';

            html += '<tr><td><span class="show">';
            html += data[0].name +'</span><input style="display:none;" type="text" class="form-control" placeholder="姓名" id="name"></td><td><span class="show">';
            html += data[0].sex + '</span><input style="display:none;" type="text" class="form-control" placeholder="性别" id="sex"></td><td><span class="show">';
            html += data[0].age + '</span><input style="display:none;" type="text" class="form-control" placeholder="年龄" id="age"></td><td><span class="show">';
            html += data[0].school + '</span><input style="display:none;" type="text" class="form-control" placeholder="学校" id="school"></td>';
            html += '<td><a href="#" class="modify">修改</a>';
            html += ' <a href="#" class="delete" >删除</a>';
            html += '<a href="#" id="confirm" style="display:none;">确认</a>';
            html += ' <a href="#" id="cancel" style="display:none;">取消</a></td></tr>';
            
            info.html(html);
        }

        function init() {
            var data = [{
                name: '小明',
                sex: '男',
                age: 18,
                school: '河南大学'
            }];
            var modify = $('#modify');
            var del = $('#delete');
            
            // 渲染数据
            _renderInfo(data);
            // 绑定点击事件
            _newRow(data);

        }

        return {
            init: init
        }

    })();

    formHandle.init();
})


   

