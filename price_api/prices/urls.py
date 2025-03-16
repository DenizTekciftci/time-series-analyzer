from django.urls import path
from . import views

urlpatterns = [
    path("prices/", views.prices),
    path("load/", views.load),
    path("tickers/", views.tickers)
]