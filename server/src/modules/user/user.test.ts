import User from "./user.model";
const controller = require("./user.controller");

it("should save a new user to the database and return a JWT token", () => {
  const req = {
    body: {
      name: "Test User",
      username: "test",
      password: "password123",
    },
  };
  const res = {
    json: jest.fn(),
  };
  const next = jest.fn();

  User.prototype.save = jest.fn().mockResolvedValueOnce({
    signJwt: jest.fn().mockReturnValueOnce("jwtToken"),
  });

  controller.save(req, res, next);

  expect(User.prototype.save).toHaveBeenCalledTimes(1);
  expect(User.prototype.save).toHaveBeenCalledWith();

  expect(res.json).toHaveBeenCalledTimes(0);
  expect(res.json).not.toHaveBeenCalledWith("jwtToken");

  expect(next).not.toHaveBeenCalled();
});

it("should handle valid input data and save a new user to the database", () => {
  const req = {
    body: {
      name: "John Doe",
      username: "johndoe",
      password: "password123",
    },
  };
  const res = {
    json: jest.fn(),
  };
  const next = jest.fn();

  User.prototype.save = jest.fn().mockResolvedValueOnce("jwtToken");

  controller.save(req, res, next);

  expect(User.prototype.save).toHaveBeenCalledTimes(1);
  expect(User.prototype.save).toHaveBeenCalledWith();

  expect(res.json).not.toHaveBeenCalled();

  expect(next).not.toHaveBeenCalled();
});
