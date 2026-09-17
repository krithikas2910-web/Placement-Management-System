from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, CompanyViewSet, JobViewSet, ApplicationViewSet

router = DefaultRouter()

router.register('students', StudentViewSet)
router.register('companies', CompanyViewSet)
router.register('jobs', JobViewSet)
router.register('applications', ApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]