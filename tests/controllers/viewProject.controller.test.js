const mockViewProjects = jest.fn();

jest.mock("../../services", () => ({
  projectService: {
    viewProjects: mockViewProjects,
  },
}));

const { viewProjects } = require("../../controllers/project.controller");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("viewProjects Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return success with data", async () => {
    const req = {};
    const res = mockResponse();

    mockViewProjects.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Data fetch successfully",
      data: [{ id: 1, name: "Project A" }],
    });

    await viewProjects(req, res);

    expect(mockViewProjects).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Data fetch successfully",
      data: [{ id: 1, name: "Project A" }],
    });
  });

  test("should return internal server error if service fails", async () => {
    const req = {};
    const res = mockResponse();

    mockViewProjects.mockResolvedValue({
      success: false,
      statusCode: 500,
    });

    await viewProjects(req, res);

    expect(mockViewProjects).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
    });
  });

  test("should return 400 on exception", async () => {
    const req = {};
    const res = mockResponse();

    mockViewProjects.mockRejectedValue(new Error("DB error"));

    await viewProjects(req, res);

    expect(mockViewProjects).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });
});
