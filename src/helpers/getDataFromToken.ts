import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  // add other properties if needed
}

export default function getDataFromToken(token: string): string | null {
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
    return decodedToken.id;
  } catch {
    // Optionally log or handle the error
    return null;
  }
}