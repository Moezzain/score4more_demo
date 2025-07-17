import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Welcome to Score4More</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Turn Sustainability into Success with our document management platform.
            </p>
            <div className="flex justify-center">
              <Link href="/documents">
                <Button size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  View Documents
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
