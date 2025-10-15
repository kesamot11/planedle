import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const beUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`;
  const beRes = await fetch(beUrl, {
    method: "POST",
    headers: { cookie: req.headers.get("cookie") ?? "" },
    redirect: "manual",
    cache: "no-store",
  });

  const body = await beRes.text();
  const res = new NextResponse(body, {
    status: beRes.status,
    headers: {
      "content-type": beRes.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });

  const setCookie = beRes.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie); 
  return res;
}
