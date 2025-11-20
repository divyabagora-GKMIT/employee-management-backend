const mockUpdateUser = jest.fn();

jest.mock("../../services", () => ({
  userService: {
    updateUser: mockUpdateUser,
  },
}));

const { updateUser } = require("../../controllers/user.controller");
const { userService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("updateUser Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return success response", async () => {
    const req = { params: { id: 1 }, body: { name: "Updated" } };
    const res = mockResponse();

    mockUpdateUser.mockResolvedValue({
      statusCode: 200,
      success: true,
      message: "User updated successfully",
      data: { id: 1 },
    });

    await updateUser(req, res);

    expect(mockUpdateUser).toHaveBeenCalledWith(1, { name: "Updated" });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "User updated successfully",
      data: { id: 1 },
    });
  });

  test("should return user not found", async () => {
    const req = { params: { id: 1 }, body: {} };
    const res = mockResponse();

    mockUpdateUser.mockResolvedValue({
      statusCode: 404,
      success: false,
      message: "User not found",
    });

    await updateUser(req, res);

    expect(mockUpdateUser).toHaveBeenCalledWith(1, {});

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found",
    });
  });

  test("should return 500 when an exception occurs", async () => {
    const req = { params: { id: 1 }, body: {} };
    const res = mockResponse();

    mockUpdateUser.mockRejectedValue(new Error("DB error"));

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      error: "DB error",
    });
  });

});
