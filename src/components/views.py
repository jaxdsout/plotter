import requests
from frontend.forms import UserForm, LoginForm, ProfileForm
from user.models import User
from agent.models import Profile
from agent.serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from django.views import generic
from django.contrib import messages
from django.urls import reverse, reverse_lazy
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import authenticate, logout
from django.http import HttpResponseRedirect
from django.contrib.auth.mixins import LoginRequiredMixin


from rest_framework_simplejwt.tokens import BlacklistedToken, RefreshToken


class HomePage(generic.TemplateView):
    template_name = "home.html"
    permission_classes = [AllowAny]


class UserRegister(generic.FormView):
    template_name = "user_register.html"
    permission_classes = [AllowAny]
    form_class = UserForm
    success_url = "/login/"

    def form_valid(self, form):
        user = User.objects.create_user(
            first_name=form.cleaned_data['first_name'],
            last_name=form.cleaned_data['last_name'],
            email=form.cleaned_data['email'],
            password=form.cleaned_data['password'],
            re_password=form.cleaned_data['re_password'],
        )
        user.save()

        return redirect(self.success_url)


class UserVerify(generic.TemplateView):
    template_name = "user_verify.html"
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('uid')
        token = kwargs.get('token')
        user = get_object_or_404(User, pk=user_id)

        if default_token_generator.check_token(user, token):
            self.set_active(user)
            messages.success(request, 'Your account has been activated successfully.')
            return redirect(reverse('user_login'))
        else:
            messages.error(request, 'The activation link is invalid or has expired.')
            return redirect(reverse('user_signup'))

    def set_active(self, user):
        user.is_active = True
        user.save()


class UserLogin(generic.FormView):
    template_name = "user_login.html"
    permission_classes = [AllowAny]
    form_class = LoginForm
    success_url = "/user/dashboard/"

    def form_valid(self, form):
        user = authenticate(email=form.cleaned_data['email'], password=form.cleaned_data['password'])
        if user is not None and user.is_active:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            id_token = str(user.id)
            response = HttpResponseRedirect(self.success_url)
            response.set_cookie('access', access_token)
            response.set_cookie('refresh', refresh_token)
            response.set_cookie('id_token', id_token)
            return response
        else:
            messages.error(self.request, "Please enter valid email & password")
            return self.form_invalid(form)


class Dashboard(generic.TemplateView):
    template_name = "dashboard.html"
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id_token = request.COOKIES.get('id_token')
        if id_token:
            user = get_object_or_404(User, id=id_token)
            print(user)
            # serializer = UserSerializer(user)
            # return Response(serializer.data)
            return render(request, self.template_name, {'user': user})


class UserLogout(generic.RedirectView):
    url = '/'
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')
        refresh_token = request.COOKIES.get('refresh')
        if access_token and refresh_token:
            try:
                BlacklistedToken(access_token)
                BlacklistedToken(refresh_token)
            except Exception as e:
                print(f"Error blacklisting token: {e}")

        response = HttpResponseRedirect(self.url)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        logout(request)

        return response


class UserProfile(generic.TemplateView):
    permission_classes = [IsAuthenticated]
    template_name = "user_profile.html"

    def get(self, request, *args, **kwargs):
        id_token = request.COOKIES.get('id_token')
        raw_profile = get_object_or_404(Profile, user=id_token)
        serialize = ProfileSerializer(raw_profile)
        profile = serialize.data
        return render(request, self.template_name, {'profile': profile})


class EditUserProfile(generic.TemplateView):
    permission_classes = [IsAuthenticated]
    form_class = ProfileForm
    template_name = 'edit_user_profile.html'
    success_url = '/user/profile/'

    def get(self, request, *args, **kwargs):
        id_token = request.COOKIES.get('id_token')
        raw_profile = get_object_or_404(Profile, user=id_token)
        serialize = ProfileSerializer(raw_profile)
        profile = serialize.data
        form = self.form_class()
        return render(request, self.template_name, {'profile': profile, 'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            return self.form_valid(form)
        return self.form_invalid(form)

    def form_valid(self, form):
        id_token = self.request.COOKIES.get('id_token')
        profile = get_object_or_404(Profile, user=id_token)

        updated_profile = form.save(commit=False)
        updated_profile.user = profile.user
        updated_profile.save()

        access_token = self.request.COOKIES.get('access')
        if access_token:
            profile_id = updated_profile.id
            url = f'http://localhost:8000/api/profiles/{profile_id}/'
            headers = {'Authorization': f'Bearer {access_token}', 'Content-Type': 'application/json'}
            response = requests.get(url, headers=headers)
            data = response.json()
            # Handle the API response as needed

        return super().form_valid(form)

    def get_success_url(self):
        return self.success_url


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def save_profile(request):
    id_token = request.COOKIES.get('id_token')
    profile = get_object_or_404(Profile, user_id=id_token)
    serializer = ProfileSerializer(profile, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)











