import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card className="shadow-card max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl text-foreground">Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development. We're working hard to bring you the best
            healthcare LLM evaluation tools.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Construction className="h-4 w-4" />
            <span className="text-sm">Under Construction</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Current path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
      </div>
    </div>
  );
}