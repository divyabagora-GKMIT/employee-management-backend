const mockAssignProject = jest.fn();

jest.mock("../../services", () => ({
  projectMembersService: {
    assignProject: mockAssignProject,   // <-- pure mock function
  },
}));

const { assignProject } = require("../../controllers/projectMembers.controller");
const { projectMembersService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("assignProject Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 when required fields are missing", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await assignProject(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Enter required fields",
    });
  });

  test("should return failure when service returns error", async () => {
    const req = { body: { project_id: 1, user_id: 2, project_role: "admin" } };
    const res = mockResponse();

    mockAssignProject.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "Already assigned with project",
    });

    await assignProject(req, res);

    expect(mockAssignProject).toHaveBeenCalledTimes(1);
    expect(mockAssignProject).toHaveBeenCalledWith({
      project_id: 1,
      user_id: 2,
      project_role: "admin",
    });

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Already assigned with project",
    });
  });

  test("should assign project successfully", async () => {
    const req = { body: { project_id: 1, user_id: 2, project_role: "developer" } };
    const res = mockResponse();

    mockAssignProject.mockResolvedValue({
      success: true,
      statusCode: 201,
      message: "Member assigned to project",
      data: { id: 1 },
    });

    await assignProject(req, res);

    expect(mockAssignProject).toHaveBeenCalledTimes(1);
    expect(mockAssignProject).toHaveBeenCalledWith({
      project_id: 1,
      user_id: 2,
      project_role: "developer",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Member assigned to project",
      data: { id: 1 },
    });
  });

  test("should return 400 on exception", async () => {
    const req = { body: { project_id: 1, user_id: 2, project_role: "dev" } };
    const res = mockResponse();

    mockAssignProject.mockRejectedValue(new Error("DB error"));

    await assignProject(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
