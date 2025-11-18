const mockViewUsers = jest.fn();

jest.mock("../../services", () => ({
  userService: {
    viewUsers: mockViewUsers,
  },
}));

const { viewUsers } = require("../../controllers/user.controller");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("viewUsers Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return success response with data", async () => {
    const req = {};
    const res = mockResponse();

    mockViewUsers.mockResolvedValue({
      statusCode: 200,
      success: true,
      data: [{ id: 1, name: "Divya" }],
    });

    await viewUsers(req, res);

    expect(mockViewUsers).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Data fetch successfully",
      data: [{ id: 1, name: "Divya" }],
    });
  });

  test("should return internal server error when service fails", async () => {
    const req = {};
    const res = mockResponse();

    mockViewUsers.mockResolvedValue({
      statusCode: 500,
      success: false,
    });

    await viewUsers(req, res);

    expect(mockViewUsers).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
    });
  });

  test("should return 400 when an exception occurs", async () => {
    const req = {};
    const res = mockResponse();

    mockViewUsers.mockRejectedValue(new Error("DB error"));

    await viewUsers(req, res);

    expect(mockViewUsers).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
