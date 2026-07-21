import { headers } from "next/headers";

type HealthData = {
  status: string;
  service: string;
  timestamp: string;
};

async function getHealth(): Promise<HealthData | null> {
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/health`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HealthPage() {
  const data = await getHealth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">System Health</h1>
      {data ? (
        <div
          className="border rounded-md p-4 space-y-2 text-sm"
          style={{ borderColor: "var(--border)" }}
        >
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="text-green-600 font-semibold">{data.status}</span>
          </p>
          <p>
            <span className="font-medium">Service:</span> {data.service}
          </p>
          <p>
            <span className="font-medium">Checked at:</span> {data.timestamp}
          </p>
        </div>
      ) : (
        <p className="text-red-600 text-sm">
          Unable to reach the health endpoint.
        </p>
      )}
    </div>
  );
}
