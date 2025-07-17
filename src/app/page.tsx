import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold mb-2">Init Project</h1>
      </Card>
    </div>
  );
}
