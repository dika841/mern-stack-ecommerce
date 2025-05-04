import jwt from "jsonwebtoken";
export const generateToken = (id: string, role: string) => {
  const access_token = jwt.sign(
    { id: id, role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );
  const refresh_token = jwt.sign(
    { id: id, role },
    process.env.REFRESH_SECRET as string,
    {
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );
  return { access_token, refresh_token };
};
