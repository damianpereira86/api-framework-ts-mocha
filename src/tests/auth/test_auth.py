import os
import pytest
from src.models.services.AuthService import AuthService
from src.models.responses.SessionResponse import SessionResponse
from src.models.request.CredentialsModel import CredentialsModel

@pytest.fixture
def auth_service():
    return AuthService()

def test_sign_in_with_valid_credentials(auth_service):
    credentials = CredentialsModel(
        username=os.getenv("USER"),
        password=os.getenv("PASSWORD")
    )
    response = auth_service.signIn(credentials)
    assert response.status == 200

def test_sign_in_with_wrong_username(auth_service):
    credentials = CredentialsModel(
        username="wrong_username",
        password="pass"
    )
    response = auth_service.signIn(credentials)
    assert response.status == 200
    assert response.data["reason"] == "Bad credentials"

def test_sign_in_with_wrong_password(auth_service):
    credentials = CredentialsModel(
        username="admin",
        password="wrong_password"
    )
    response = auth_service.signIn(credentials)
    assert response.status == 200
    assert response.data["reason"] == "Bad credentials"
