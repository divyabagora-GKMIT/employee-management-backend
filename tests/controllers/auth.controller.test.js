const mockLoginUser = jest.fn();

jest.mock("../../services", () => ({
  authService: {
    loginUser: mockLoginUser,
  },
}));

const { loginUser } = require("../../controllers/auth.controller");
const { authService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("loginUser Controller", () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 422 when email or password is missing", async () => {
    const req = { body: { email: "", password: "" } };
    const res = mockResponse();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Credentials are required",
    });
  });

  test("should return failure response when login service fails", async () => {
    const req = { body: { email: "test@gmail.com", password: "123456" } };
    const res = mockResponse();

    mockLoginUser.mockResolvedValue({
      success: false,
      statusCode: 401,
      message: "Invalid credentials",
    });

    await loginUser(req, res);

    expect(mockLoginUser).toHaveBeenCalledTimes(1);
    expect(mockLoginUser).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "123456",
    });

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid credentials",
    });
  });

  test("should return success response with status 200", async () => {
    const req = { body: { email: "test@gmail.com", password: "123456" } };
    const res = mockResponse();

    mockLoginUser.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Login successful",
      token: "jwt-token",
    });

    await loginUser(req, res);

    expect(mockLoginUser).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Login successful",
      token: "jwt-token",
    });
  });

  test("should return 500 on internal error", async () => {
    const req = { body: { email: "test@gmail.com", password: "123456" } };
    const res = mockResponse();

    mockLoginUser.mockRejectedValue(new Error("DB error"));

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      error: "DB error",
    });
  });

});
