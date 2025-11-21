const mockDeleteDepartment = jest.fn();

jest.mock("../../services", () => ({
  departmentService: {
    deleteDepartment: mockDeleteDepartment,
  },
}));

const { deleteDepartment } = require("../../controllers/department.controller");
const { departmentService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("deleteDepartment Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should delete department successfully", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDeleteDepartment.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Department deleted successfully",
    });

    await deleteDepartment(req, res);

    expect(mockDeleteDepartment).toHaveBeenCalledTimes(1);
    expect(mockDeleteDepartment).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Department deleted successfully",
    });
  });

  test("should return error when department not found", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDeleteDepartment.mockResolvedValue({
      success: false,
      statusCode: 404,
      message: "Department not found",
    });

    await deleteDepartment(req, res);

    expect(mockDeleteDepartment).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Department not found",
    });
  });

  test("should return 500 on exception", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDeleteDepartment.mockRejectedValue(new Error("DB error"));

    await deleteDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      error: "DB error",
    });
  });

});
