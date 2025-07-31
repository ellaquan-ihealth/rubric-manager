import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

<div className="space-y-4 pt-6">
  <h2 className="text-sm font-semibold text-muted-foreground">Pending Reviews</h2>
  {rubricsToReview.map((rubric) => (
    <Card key={rubric.id} className="p-3 bg-yellow-50 border">
      <CardHeader>
        <CardTitle className="text-sm">{rubric.name}</CardTitle>
        <CardDescription className="text-xs italic">
          Proposed change: {rubric.proposedName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            const updated = rubrics.map((r) =>
              r.id === rubric.id ? { ...r, name: rubric.proposedName } : r
            );
            setRubrics(updated);
            setRubricsToReview((prev) =>
              prev.filter((r) => r.id !== rubric.id)
            );
          }}
        >
          Approve
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            setRubricsToReview((prev) => prev.filter((r) => r.id !== rubric.id))
          }
        >
          Reject
        </Button>
      </CardContent>
    </Card>
  ))}
</div>
