const mockUpdateProject = jest.fn();

jest.mock("../../services", () => ({
  projectService: {
    updateProject: mockUpdateProject,
  },
}));

const { updateProject } = require("../../controllers/project.controller");
const { projectService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("updateProject Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should update project successfully", async () => {
    const req = { params: { id: 1 }, body: { name: "Updated Project" } };
    const res = mockResponse();

    mockUpdateProject.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Project updated successfully",
    });

    await updateProject(req, res);

    // Ensure mock was called correctly
    expect(mockUpdateProject).toHaveBeenCalledTimes(1);
    expect(mockUpdateProject).toHaveBeenCalledWith(1, { name: "Updated Project" });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Project updated successfully",
    });
  });

  test("should return project not found", async () => {
    const req = { params: { id: 1 }, body: { name: "Test" } };
    const res = mockResponse();

    mockUpdateProject.mockResolvedValue({
      success: false,
      statusCode: 404,
      message: "Project not found",
    });

    await updateProject(req, res);

    expect(mockUpdateProject).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Project not found",
    });
  });

  test("should return 500 on exception", async () => {
    const req = { params: { id: 1 }, body: { name: "Test" } };
    const res = mockResponse();

    mockUpdateProject.mockRejectedValue(new Error("DB error"));

    await updateProject(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      error: "DB error",
    });
  });

});
