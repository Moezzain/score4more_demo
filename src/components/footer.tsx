import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
            <FileText className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">
            Built by <span className="font-medium">Mowaffaq</span>
          </span>
        </div>
      </div>
    </footer>
  );
} 