const mockDeleteMemberFromDepartment = jest.fn();

jest.mock("../../services", () => ({
  departmentMembersService: {
    deleteMemberFromDepartment: mockDeleteMemberFromDepartment,
  },
}));

const { deleteMemberFromDepartment } = require("../../controllers/departmentMembers.controller");
const { departmentMembersService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("deleteMemberFromDepartment Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should delete member successfully", async () => {
    const req = { params: { id1: 1, id2: 2 } };
    const res = mockResponse();

    mockDeleteMemberFromDepartment.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Member successfully removed from the department",
    });

    await deleteMemberFromDepartment(req, res);

    expect(mockDeleteMemberFromDepartment).toHaveBeenCalledTimes(1);
    expect(mockDeleteMemberFromDepartment).toHaveBeenCalledWith({
      department_id: 1,
      user_id: 2,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Member successfully removed from the department",
    });
  });

  test("should return error when member not found", async () => {
    const req = { params: { id1: 1, id2: 2 } };
    const res = mockResponse();

    mockDeleteMemberFromDepartment.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "This member not found in this department",
    });

    await deleteMemberFromDepartment(req, res);

    expect(mockDeleteMemberFromDepartment).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "This member not found in this department",
    });
  });

  test("should return 400 on exception", async () => {
    const req = { params: { id1: 1, id2: 2 } };
    const res = mockResponse();

    mockDeleteMemberFromDepartment.mockRejectedValue(new Error("DB error"));

    await deleteMemberFromDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
