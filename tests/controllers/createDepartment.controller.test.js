const mockCreateDepartment = jest.fn();

jest.mock("../../services", () => ({
  departmentService: {
    createDepartment: mockCreateDepartment,
  },
}));

const { createDepartment } = require("../../controllers/department.controller");
const { departmentService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("createDepartment Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 422 when name is missing", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await createDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Provide required fields",
    });
  });

  test("should return error when service responds unsuccessfully", async () => {
    const req = { body: { name: "HR" } };
    const res = mockResponse();

    mockCreateDepartment.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "Department already exists",
    });

    await createDepartment(req, res);

    expect(mockCreateDepartment).toHaveBeenCalledTimes(1);
    expect(mockCreateDepartment).toHaveBeenCalledWith({ name: "HR" });

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Department already exists",
    });
  });

  test("should create department successfully", async () => {
    const req = { body: { name: "HR" } };
    const res = mockResponse();

    mockCreateDepartment.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Department created successfully",
      data: { id: 1, name: "HR" },
    });

    await createDepartment(req, res);

    expect(mockCreateDepartment).toHaveBeenCalledTimes(1);
    expect(mockCreateDepartment).toHaveBeenCalledWith({ name: "HR" });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Department created successfully",
      data: { id: 1, name: "HR" },
    });
  });

  test("should return 400 on exception", async () => {
    const req = { body: { name: "HR" } };
    const res = mockResponse();

    mockCreateDepartment.mockRejectedValue(new Error("DB error"));

    await createDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
