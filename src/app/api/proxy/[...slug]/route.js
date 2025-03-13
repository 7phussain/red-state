import { NextResponse } from "next/server";
import axios from "axios";

const backendBaseUrl = "https://test.hikalcrm.com/api";

export async function POST(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function GET(request, { params }) {
  return handleProxyRequest(request, params);
}

// Add other HTTP methods (PUT, DELETE, etc.) similarly

async function handleProxyRequest(request, { slug }) {
  const backendUrl = `${backendBaseUrl}/${slug.join("/")}`;
  const headers = {
    // Forward headers needed by your backend (e.g., cookies)
    cookie: request.headers.get("cookie") || "",
    ...Object.fromEntries(request.headers.entries()),
  };

  delete headers["content-length"]; // Let Axios handle this

  try {
    const response = await axios({
      method: request.method,
      url: backendUrl,
      data: await request.text(),
      headers: headers,
      withCredentials: true,
    });

    // Forward cookies from backend to frontend
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    if (response.headers["set-cookie"]) {
      nextResponse.headers.set("set-cookie", response.headers["set-cookie"]);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Proxy error" },
      { status: error.response?.status || 500 }
    );
  }
}
