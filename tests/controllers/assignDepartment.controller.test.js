jest.mock("../../services", () => ({
  departmentMembersService: {
    assignDepartment: jest.fn(),
  },
}));

const { assignDepartment } = require("../../controllers/departmentMembers.controller");
const { departmentMembersService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("assignDepartment Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return 400 when required fields are missing", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await assignDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Enter required fields",
    });
  });

  test("should return error response from service", async () => {
    const req = { body: { department_id: 1, user_id: 2 } };
    const res = mockResponse();

    departmentMembersService.assignDepartment.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "Already in the department",
    });

    await assignDepartment(req, res);

    expect(departmentMembersService.assignDepartment).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Already in the department",
    });
  });

  test("should assign department successfully", async () => {
    const req = { body: { department_id: 1, user_id: 2 } };
    const res = mockResponse();

    departmentMembersService.assignDepartment.mockResolvedValue({
      success: true,
      statusCode: 201,
      message: "Member added to department",
      data: { id: 1 },
    });

    await assignDepartment(req, res);

    expect(departmentMembersService.assignDepartment).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Member added to department",
      data: { id: 1 },
    });
  });

  test("should return 400 on exception", async () => {
    const req = { body: { department_id: 1, user_id: 2 } };
    const res = mockResponse();

    departmentMembersService.assignDepartment.mockRejectedValue(
      new Error("DB error")
    );

    await assignDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });
});
