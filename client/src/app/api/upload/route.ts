import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextApiRequest) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: NextApiRequest) {
  // Do whatever you want
  // console.log(request.body);
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}