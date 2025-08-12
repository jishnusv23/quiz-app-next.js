import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    if (!code) {
      return new Response(JSON.stringify({ error: "Missing code" }), {
        status: 400,
      });
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
        redirect_uri: "http://localhost:3000/api/github",
      }),
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const tokenData = tokenResponse.data;
    console.log("Token data:", tokenData);

    // Optionally: get user data from GitHub API
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = userResponse.data;
    console.log("GitHub User:", userData);

    // TODO: Save user in DB, create JWT/session, redirect
    return new Response(JSON.stringify({ user: userData, token: tokenData }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
