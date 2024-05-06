# from msilib.schema import _Validation_records
from django.contrib.auth.decorators import login_required
from django.urls import path

from .views import Register, EditInfoView

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('termos', views.termos, name="termos"),
    path('login', views.login_view, name="login"),
    path('register', Register.as_view(), name="register"),
    path('satisfacao', views.satisfacao_view, name="satisfacao"),
    path('agradecimento', views.satisfacao_success, name="agradecimentos"),
    path('editar/<slug:pk>', EditInfoView.as_view(), name="edit"),
    path('delete/account', views.delete_account, name="delete_account"),
    path('logout', views.logout_view, name="logout"),
]

# Define the custom error handlers
handler404 = views.handler404
handler500 = views.handler500