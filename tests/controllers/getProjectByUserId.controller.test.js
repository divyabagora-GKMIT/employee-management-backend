const mockGetProjectByUserId = jest.fn();

jest.mock("../../services", () => ({
  projectMembersService: {
    getProjectByUserId: mockGetProjectByUserId,
  },
}));

const { getProjectByUserId } = require("../../controllers/projectMembers.controller");
const { projectMembersService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("getProjectByUserId Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return projects successfully", async () => {
    const req = { params: { id: 5 } };
    const res = mockResponse();

    mockGetProjectByUserId.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Projects fetched successfully",
      data: [{ id: 1, name: "Project A" }],
    });

    await getProjectByUserId(req, res);

    expect(mockGetProjectByUserId).toHaveBeenCalledTimes(1);
    expect(mockGetProjectByUserId).toHaveBeenCalledWith(5);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Projects fetched successfully",
      data: [{ id: 1, name: "Project A" }],
    });
  });

  test("should return error if service fails", async () => {
    const req = { params: { id: 5 } };
    const res = mockResponse();

    mockGetProjectByUserId.mockResolvedValue({
      success: false,
      statusCode: 404,
      message: "No projects found for this user",
    });

    await getProjectByUserId(req, res);

    expect(mockGetProjectByUserId).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No projects found for this user",
    });
  });

  test("should return 400 on exception", async () => {
    const req = { params: { id: 5 } };
    const res = mockResponse();

    mockGetProjectByUserId.mockRejectedValue(new Error("DB error"));

    await getProjectByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
