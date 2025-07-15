import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getPool from "../db/pool.js";
import { insertUser } from "../models/user.models.js"; 

const pool = await getPool();

const registerUser = asyncHandler(async (req, res) => {
  const data = req.body;

  if (!data) {
    throw new ApiError(400, "No data found");
  }

  const newUser = await insertUser(pool, {
    name: data.name,
    email: data.email
  });

  if (newUser) {
    return res.status(200).json(
      new ApiResponse(200, {
        message: "Created user successfully",
        user: newUser
      })
    );
  }

  throw new ApiError(500, "User creation failed");
});

export { registerUser };
