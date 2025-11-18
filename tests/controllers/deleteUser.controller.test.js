const mockDeleteProjectMember = jest.fn();

jest.mock("../../services", () => ({
  projectMembersService: {
    deleteProjectMember: mockDeleteProjectMember,
  },
}));

const { deleteProjectMember } = require("../../controllers/projectMembers.controller");
const { projectMembersService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("deleteProjectMember Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should delete project member successfully", async () => {
    const req = { params: { id1: 1, id2: 2 } };
    const res = mockResponse();

    mockDeleteProjectMember.mockResolvedValue({
      success: true,
      statusCode: 200,
      message: "Member successfully removed from the project",
    });

    await deleteProjectMember(req, res);

    expect(mockDeleteProjectMember).toHaveBeenCalledTimes(1);
    expect(mockDeleteProjectMember).toHaveBeenCalledWith({
      project_id: 1,
      user_id: 2,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Member successfully removed from the project",
    });
  });

  test("should return error when user not found in project", async () => {
    const req = { params: { id1: 1, id2: 2 } };
    const res = mockResponse();

    mockDeleteProjectMember.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "This user not found in this project",
    });

    await deleteProjectMember(req, res);

    expect(mockDeleteProjectMember).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "This user not found in this project",
    });
  });

  test("should return 400 on exception", async () => {
    const req = { params: { id1: 1, id2: 2 } };
    const res = mockResponse();

    mockDeleteProjectMember.mockRejectedValue(new Error("DB error"));

    await deleteProjectMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
