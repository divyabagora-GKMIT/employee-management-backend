const mockCreateUser = jest.fn();
const mockSendNewUserEmail = jest.fn();

jest.mock("../../services", () => ({
  userService: {
    createUser: mockCreateUser,
  },
  mailService: {
    sendNewUserEmail: mockSendNewUserEmail,
  },
}));

const { createUser } = require("../../controllers/user.controller");
const { userService, mailService } = require("../../services");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("createUser Controller", () => {

  beforeEach(() => jest.clearAllMocks());

  test("should return 400 when required fields are missing", async () => {
    const req = { body: { name: "Divya" } };
    const res = mockResponse();

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Enter the required fields",
    });
  });

  test("should return service error when user exists", async () => {
    const req = { 
      body: {
        name: "Divya",
        email: "test@gmail.com",
        password: "123456",
        role_id: 2
      }
    };
    const res = mockResponse();

    mockCreateUser.mockResolvedValue({
      success: false,
      statusCode: 422,
      message: "User already exits"
    });

    await createUser(req, res);

    expect(mockCreateUser).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User already exits",
    });
  });

  test("should create a user and send email", async () => {
    const req = { 
      body: {
        name: "Divya",
        email: "test@gmail.com",
        password: "123456",
        role_id: 2
      }
    };
    const res = mockResponse();

    mockCreateUser.mockResolvedValue({
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: { id: 1 }
    });

    await createUser(req, res);

    expect(mockSendNewUserEmail).toHaveBeenCalledWith({
      to: "test@gmail.com",
      tempPassword: "123456",
      name: "Divya"
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "User created successfully",
      data: { id: 1 }
    });
  });

  test("should return 400 when an exception occurs", async () => {
    const req = { 
      body: {
        name: "Divya",
        email: "test@gmail.com",
        password: "123456",
        role_id: 2
      }
    };
    const res = mockResponse();

    mockCreateUser.mockRejectedValue(new Error("DB error"));

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});
