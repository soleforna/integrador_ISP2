from django.shortcuts import render
from django.shortcuts import redirect
from social_django.utils import psa

@psa('social:complete')
def google_login(request, backend):
    return do_auth(request.backend, redirect_name='social:complete')
# Create your views here.
