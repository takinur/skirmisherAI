from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('', lambda r: redirect('base:api.getRoutes')), TODO: fix this //MadePUB
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),
    
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) #Media files
