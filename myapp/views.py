from django.shortcuts import render
from django.http import FileResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import io
import os
from django.conf import settings


@csrf_exempt
def resize(request):
    if request.method == 'POST':
        file_input = request.FILES['fileInput']
        width = int(request.POST['widthInput'])
        height = int(request.POST['heightInput'])

        # 讀取上傳的圖片
        img = Image.open(io.BytesIO(file_input.read()))
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        # 調整圖像大小
        img = img.resize((width, height))

        # 儲存調整大小後的圖像
        file_path = os.path.join(settings.MEDIA_ROOT, 'resized-image.jpg')
        img.save(file_path, format='JPEG')

        # 返回下載文件的響應
        response = FileResponse(open(file_path, 'rb'))
        response['Content-Type'] = 'image/jpeg'
        response['Content-Disposition'] = 'attachment; filename="resized-image.jpg"'
        return response

    return render(request, 'resize.html')
