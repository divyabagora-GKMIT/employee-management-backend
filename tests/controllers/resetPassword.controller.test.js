const mockResetPassword = jest.fn();

jest.mock("../../services", () => ({
  authService: {
    resetPassword: mockResetPassword,
  },
}));

const { resetPassword } = require("../../controllers/auth.controller");
const { authService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("resetPassword Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 when email or newPassword is missing", async () => {
    const req = { body: { email: "", newPassword: "" } };
    const res = mockResponse();

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Credentials are required",
    });
  });

  test("should return failure response when user is not found", async () => {
    const req = { body: { email: "test@gmail.com", newPassword: "pass123" } };
    const res = mockResponse();

    mockResetPassword.mockResolvedValue({
      statusCode: 404,
      success: false,
      message: "User not found",
    });

    await resetPassword(req, res);

    expect(mockResetPassword).toHaveBeenCalledTimes(1);
    expect(mockResetPassword).toHaveBeenCalledWith({
      email: "test@gmail.com",
      newPassword: "pass123"
    });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found",
    });
  });

  test("should return success response with status 200", async () => {
    const req = { body: { email: "test@gmail.com", newPassword: "pass123" } };
    const res = mockResponse();

    mockResetPassword.mockResolvedValue({
      statusCode: 200,
      success: true,
      message: "Password updated successfully",
    });

    await resetPassword(req, res);

    expect(mockResetPassword).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Password updated successfully",
    });
  });

  test("should return 500 when an internal error occurs", async () => {
    const req = { body: { email: "test@gmail.com", newPassword: "pass123" } };
    const res = mockResponse();

    mockResetPassword.mockRejectedValue(new Error("DB error"));

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      error: "DB error",
    });
  });

});
