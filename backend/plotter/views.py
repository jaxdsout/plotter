from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import authenticate

from .models import User, Client, List, Option
from .serializers import UserSerializer, ClientSerializer, ListSerializer, OptionSerializer, LoginSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

class LoginView (APIView):
    serializer_class = LoginSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')
            user = authenticate(email=email, password=password)

            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    parser_classes = [MultiPartParser, FormParser]


class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    parser_classes = [MultiPartParser, FormParser]


class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    parser_classes = [MultiPartParser, FormParser]
