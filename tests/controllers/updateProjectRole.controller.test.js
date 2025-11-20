const mockUpdateProjectRole = jest.fn();

jest.mock("../../services", () => ({
  projectMembersService: {
    updateProjectRole: mockUpdateProjectRole,
  },
}));

const { updateProjectRole } = require("../../controllers/projectMembers.controller");
const { projectMembersService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("updateProjectRole Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should update project role successfully", async () => {
    const req = { params: { id1: 1, id2: 2 }, body: { project_role: "lead" } };
    const res = mockResponse();

    mockUpdateProjectRole.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Project role updated successfully",
      data: { project_role: "lead" },
    });

    await updateProjectRole(req, res);

    expect(mockUpdateProjectRole).toHaveBeenCalledTimes(1);
    expect(mockUpdateProjectRole).toHaveBeenCalledWith({
      project_id: 1,
      user_id: 2,
      project_role: "lead",
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Project role updated successfully",
      data: { project_role: "lead" },
    });
  });

  test("should return error when service fails", async () => {
    const req = { params: { id1: 1, id2: 2 }, body: { project_role: "developer" } };
    const res = mockResponse();

    mockUpdateProjectRole.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "This user not found in this project",
    });

    await updateProjectRole(req, res);

    expect(mockUpdateProjectRole).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "This user not found in this project",
    });
  });

  test("should return 400 on exception", async () => {
    const req = { params: { id1: 1, id2: 2 }, body: { project_role: "lead" } };
    const res = mockResponse();

    mockUpdateProjectRole.mockRejectedValue(new Error("DB error"));

    await updateProjectRole(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
