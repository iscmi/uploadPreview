/**
 * Created by xming on 2017-05-06.
 */

;(function ($) {

    $.fn.uploadPreview = function (defaults) {
        var fileUpload = $(this),//上传窗口
            fileInput = fileUpload.children('.fileinput'),//上传input
            fileBtn = fileUpload.children('.fileupbtn');//上传按钮

        var options = {
            initial:1,//上传初始值
            maxUploadNum:5,//最大上传数
            pictureType:new Array('jpg','png','jpeg'),//上传图片限制格式
            },
            defOptions = $.extend(options,defaults);

        //触发上传事件
        fileBtn.on('click',function () {
            if (options.initial > options.maxUploadNum){
                alert('最多上传'+options.maxUploadNum+'张图片')
            }
            else {
                $(this).prev('.fileinput').click();
            };
        });


        //上传事件监控
        fileUpload.on('change','.fileinput',function () {

            var file = this,
                fileSign = file.value.lastIndexOf('.'),
                fileType = file.value.substr(fileSign+1).toLowerCase();

            if (defOptions.pictureType.toString().indexOf(fileType) > -1){

                if (file.files && file.files[0]) {

                    var fileReader = new FileReader();
                    fileReader.onload = function (evt) {

                        var fileViewHtml = "<span>" +
                            "<img src='" + evt.target.result + "'>" +
                            "<a><button class='enlargebtn'>查看大图</button>" +
                            "<button class='deletebtn'>删除</button></a></span>";

                        fileUpload.before(fileViewHtml);
                        fileUpload.prev('span').append(file);

                    };
                    fileReader.readAsDataURL(file.files[0]);

                }
                else{
                    var fileViewHtml = '<span>' +
                        '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>' +
                        '<a><button class="enlargebtn">查看大图</button> ' +
                        '<button class="deletebtn">删除</button></a></span>';

                    fileUpload.before(fileViewHtml);
                    fileUpload.prev('span').append(file);

                };

                options.initial += 1;
                fileBtn.before('<input name="fileupload" class="fileinput" type="file" accept="image/jpeg,image/jpg,image/png">');

            }else {
                alert('警告：格式不符合要求！');
                return false;
            }

        });

    };


})(jQuery);

