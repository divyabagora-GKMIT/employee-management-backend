const mockViewDepartments = jest.fn();

jest.mock("../../services", () => ({
  departmentService: {
    viewDepartments: mockViewDepartments,
  },
}));

const { viewDepartments } = require("../../controllers/department.controller");
const { departmentService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("viewDepartments Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return success response", async () => {
    const req = {};
    const res = mockResponse();

    mockViewDepartments.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Data fetch successfully",
      data: [{ id: 1, name: "HR" }],
    });

    await viewDepartments(req, res);

    expect(mockViewDepartments).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Data fetch successfully",
      data: [{ id: 1, name: "HR" }],
    });
  });

  test("should return error when service fails", async () => {
    const req = {};
    const res = mockResponse();

    mockViewDepartments.mockResolvedValue({
      success: false,
      statusCode: 500,
    });

    await viewDepartments(req, res);

    expect(mockViewDepartments).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
    });
  });

  test("should return 400 on exception", async () => {
    const req = {};
    const res = mockResponse();

    mockViewDepartments.mockRejectedValue(new Error("DB error"));

    await viewDepartments(req, res);

    expect(mockViewDepartments).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
