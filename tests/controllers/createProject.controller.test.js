const mockCreateProject = jest.fn();

jest.mock("../../services", () => ({
  projectService: {
    createProject: mockCreateProject,
  },
}));

const { createProject } = require("../../controllers/project.controller");
const { projectService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("createProject Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should return 422 when name is missing", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await createProject(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Provide required fields",
    });
  });

  test("should return error if service fails", async () => {
    const req = { body: { name: "Project A" } };
    const res = mockResponse();

    mockCreateProject.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "Project already exists",
    });

    await createProject(req, res);

    expect(mockCreateProject).toHaveBeenCalledTimes(1);
    expect(mockCreateProject).toHaveBeenCalledWith({ name: "Project A" });

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Project already exists",
    });
  });

  test("should create project successfully", async () => {
    const req = { body: { name: "Project A" } };
    const res = mockResponse();

    mockCreateProject.mockResolvedValue({
      success: true,
      statusCode: 201,
      message: "Project created successfully",
      data: { id: 1, name: "Project A" },
    });

    await createProject(req, res);

    expect(mockCreateProject).toHaveBeenCalledTimes(1);
    expect(mockCreateProject).toHaveBeenCalledWith({ name: "Project A" });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Project created successfully",
      data: { id: 1, name: "Project A" },
    });
  });

  test("should return 400 on exception", async () => {
    const req = { body: { name: "Project A" } };
    const res = mockResponse();

    mockCreateProject.mockRejectedValue(new Error("DB error"));

    await createProject(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });
});
