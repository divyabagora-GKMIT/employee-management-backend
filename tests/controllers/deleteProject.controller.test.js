const mockDeleteProject = jest.fn();

jest.mock("../../services", () => ({
  projectService: {
    deleteProject: mockDeleteProject,
  },
}));

const { deleteProject } = require("../../controllers/project.controller");
const { projectService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("deleteProject Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should delete project successfully", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDeleteProject.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Project deleted successfully",
    });

    await deleteProject(req, res);

    expect(mockDeleteProject).toHaveBeenCalledTimes(1);
    expect(mockDeleteProject).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Project deleted successfully",
    });
  });

  test("should return project not found", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDeleteProject.mockResolvedValue({
      success: false,
      statusCode: 404,
      message: "Project not found",
    });

    await deleteProject(req, res);

    expect(mockDeleteProject).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Project not found",
    });
  });

  test("should return 500 on exception", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    mockDeleteProject.mockRejectedValue(new Error("DB error"));

    await deleteProject(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      error: "DB error",
    });
  });

});
