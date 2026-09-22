// Self-hosted OAuth provider for Decap CMS's GitHub backend.
//
// Implements the two endpoints Decap's `github` backend expects:
//   GET /auth      - redirects to GitHub's OAuth consent screen
//   GET /callback  - exchanges the code for a token and hands it back to
//                    the Decap admin UI via postMessage
//
// Requires two secrets (never commit these): GITHUB_CLIENT_ID,
// GITHUB_CLIENT_SECRET, from a GitHub OAuth App. See ./README.md.

// TEMPORARY marker + /debug route for diagnosing an env-binding issue.
// Remove both once GITHUB_CLIENT_ID/SECRET are confirmed reaching the
// worker at runtime.
const DEBUG_BUILD_MARKER = "debug-build-1";

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/debug") {
      return new Response(
        JSON.stringify(
          {
            buildMarker: DEBUG_BUILD_MARKER,
            hasClientId:
              typeof env.GITHUB_CLIENT_ID === "string" &&
              env.GITHUB_CLIENT_ID.length > 0,
            hasClientSecret:
              typeof env.GITHUB_CLIENT_SECRET === "string" &&
              env.GITHUB_CLIENT_SECRET.length > 0,
            envKeys: Object.keys(env),
          },
          null,
          2,
        ),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(request, url, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

export default worker;

function handleAuth(url, env) {
  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/callback`;

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo");
  authorizeUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      "Set-Cookie": `oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax`,
    },
  });
}

async function handleCallback(request, url, env) {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = (request.headers.get("Cookie") || "").match(
    /oauth_state=([^;]+)/,
  )?.[1];

  if (!code || !state || state !== cookieState) {
    return new Response("Invalid OAuth state or missing code.", {
      status: 400,
    });
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/callback`,
      }),
    },
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error || !tokenData.access_token) {
    return new Response(
      `GitHub OAuth error: ${tokenData.error_description || tokenData.error || "unknown error"}`,
      { status: 400 },
    );
  }

  const messageJson = JSON.stringify({
    token: tokenData.access_token,
    provider: "github",
  });

  const html = `<!doctype html>
<title>Authorizing...</title>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(
      "authorization:github:success:" + ${JSON.stringify(messageJson)},
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
