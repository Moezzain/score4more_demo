import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold mb-2">Init Project</h1>
      </Card>
    </main>
  );
}
