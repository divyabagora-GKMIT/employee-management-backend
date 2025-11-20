const mockGetDepartmentByUserID = jest.fn();

jest.mock("../../services", () => ({
  departmentMembersService: {
    getDepartmentByUserID: mockGetDepartmentByUserID,
  },
}));

const { getDepartmentByUserId } = require("../../controllers/departmentMembers.controller");
const { departmentMembersService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("getDepartmentByUserId Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return success response", async () => {
    const req = { params: { id: 5 } };
    const res = mockResponse();

    mockGetDepartmentByUserID.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Department fetched successfully",
      data: [{ id: 1, name: "HR" }],
    });

    await getDepartmentByUserId(req, res);

    expect(mockGetDepartmentByUserID).toHaveBeenCalledTimes(1);
    expect(mockGetDepartmentByUserID).toHaveBeenCalledWith(5);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Department fetched successfully",
      data: [{ id: 1, name: "HR" }],
    });
  });

  test("should return error when service fails", async () => {
    const req = { params: { id: 5 } };
    const res = mockResponse();

    mockGetDepartmentByUserID.mockResolvedValue({
      success: false,
      statusCode: 404,
      message: "User is in no department",
    });

    await getDepartmentByUserId(req, res);

    expect(mockGetDepartmentByUserID).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User is in no department",
    });
  });

  test("should return 400 on exception", async () => {
    const req = { params: { id: 5 } };
    const res = mockResponse();

    mockGetDepartmentByUserID.mockRejectedValue(new Error("DB error"));

    await getDepartmentByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
