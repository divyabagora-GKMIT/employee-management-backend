const mockUpdateDepartment = jest.fn();

jest.mock("../../services", () => ({
  departmentService: {
    updateDepartment: mockUpdateDepartment,
  },
}));

const { updateDepartment } = require("../../controllers/department.controller");
const { departmentService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("updateDepartment Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return 422 when name is missing", async () => {
    const req = { params: { id: 1 }, body: {} };
    const res = mockResponse();

    await updateDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Nothing to Update",
    });
  });

  test("should return error when department not found", async () => {
    const req = { params: { id: 1 }, body: { name: "HR" } };
    const res = mockResponse();

    mockUpdateDepartment.mockResolvedValue({
      success: false,
      statusCode: 404,
      message: "Department not found",
    });

    await updateDepartment(req, res);

    expect(mockUpdateDepartment).toHaveBeenCalledTimes(1);
    expect(mockUpdateDepartment).toHaveBeenCalledWith(1, { name: "HR" });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Department not found",
    });
  });

  test("should update department successfully", async () => {
    const req = { params: { id: 1 }, body: { name: "Finance" } };
    const res = mockResponse();

    mockUpdateDepartment.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Department updated successfully",
    });

    await updateDepartment(req, res);

    expect(mockUpdateDepartment).toHaveBeenCalledTimes(1);
    expect(mockUpdateDepartment).toHaveBeenCalledWith(1, { name: "Finance" });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Department updated successfully",
    });
  });

  test("should return 500 on exception", async () => {
    const req = { params: { id: 1 }, body: { name: "Finance" } };
    const res = mockResponse();

    mockUpdateDepartment.mockRejectedValue(new Error("DB error"));

    await updateDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      error: "DB error",
    });
  });

});
