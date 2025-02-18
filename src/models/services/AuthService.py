from src.base.ServiceBase import ServiceBase
from src.models.request.CredentialsModel import CredentialsModel

class AuthService(ServiceBase):
    def __init__(self):
        super().__init__("/auth")

    def signIn(self, credentials: CredentialsModel):
        return self.post(self.url, credentials)
