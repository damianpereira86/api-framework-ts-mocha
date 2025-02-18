class SessionManager:
    auth_token_cache = {}
    token_expiry_duration = 15 * 60 * 1000  # 15 minutes

    @staticmethod
    def get_cached_token(username: str, password: str) -> str:
        cache_key = f"{username}:{password}"
        cached_data = SessionManager.auth_token_cache.get(cache_key)

        if cached_data:
            current_time = int(time() * 1000)
            token_age = current_time - cached_data["timestamp"]

            if token_age < SessionManager.token_expiry_duration:
                return cached_data["token"]
            else:
                del SessionManager.auth_token_cache[cache_key]

        return None

    @staticmethod
    def store_token(username: str, password: str, token: str) -> None:
        cache_key = f"{username}:{password}"
        SessionManager.auth_token_cache[cache_key] = {
            "token": token,
            "timestamp": int(time() * 1000),
        }
