import { type SessionResponse } from "../../models/responses/SessionResponse";
import { AuthService } from "../../models/services/AuthService.js";
import "chai/register-should.js";

describe("Sign In", () => {
  const authService = new AuthService();

  it("@Smoke - Sign In - with valid credentials", async () => {
    const response = await authService.signIn<SessionResponse>({
      username: process.env["USER"],
      password: process.env["PASSWORD"],
    });
    response.status.should.equal(200, JSON.stringify(response.data));
  });

  it("@Regression - Sign In - with a wrong username", async () => {
    const response = await authService.signIn<any>({
      username: "wrong_username",
      password: "pass",
    });
    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.reason.should.equal("Bad credentials", JSON.stringify(response.data));
  });

  it("@Regression - Sign In - with a wrong password", async () => {
    const response = await authService.signIn<any>({
      username: "admin",
      password: "wrong_password",
    });
    response.status.should.equal(200, JSON.stringify(response.data));
    response.data.reason.should.equal("Bad credentials", JSON.stringify(response.data));
  });
});
