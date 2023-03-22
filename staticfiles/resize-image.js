document.querySelector('#resize-form').addEventListener('submit', function (event) {
    event.preventDefault(); // 防止表單提交
    var fileInput = document.getElementById('fileInput');
    var widthInput = document.getElementById('widthInput');
    var heightInput = document.getElementById('heightInput');

    if (fileInput.files.length > 0) {
        var formData = new FormData();
        formData.append('fileInput', fileInput.files[0]);
        formData.append('widthInput', widthInput.value);
        formData.append('heightInput', heightInput.value);

        // 發送POST請求
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/resize/', true);
        xhr.responseType = 'arraybuffer'; // 返回二進制數據
        xhr.onload = function () {
            if (xhr.status === 200) {
                // 下載文件
                var url = window.URL.createObjectURL(new Blob([xhr.response], { type: 'image/jpeg' }));
                var link = document.createElement('a');
                link.href = url;
                link.download = 'resized-image.png';
                link.click();

                // 釋放 URL 對象
                window.URL.revokeObjectURL(url);

                // 顯示結果
                var resultDiv = document.getElementById('result');
                resultDiv.innerHTML = 'The image was resized and downloaded as "resized-image.jpg".';
            } else {
                alert('There was an error resizing the image.');
            }
        };
        xhr.send(formData);
    }
});
