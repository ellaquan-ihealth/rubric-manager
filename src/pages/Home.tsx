import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TestTube, Brain, BarChart, Plus, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { MdPreview } from "react-icons/md";


export default function Home() {
  const quickActions = [
    {
      title: "Create New Rubric",
      description: "Build a new evaluation rubric",
      icon: Plus,
      link: "/rubrics/create",
      color: "bg-primary",
    },
    
    {
      title: "Browse Rubrics",
      description: "Explore all available evaluation rubrics",
      icon: BookOpen,
      link: "/rubrics/browse",
      color: "bg-accent",
    },
    {
      title: "Review New Rubric",
      description: "Review rubric from CaseBuilder",
      icon: MdPreview,
      link: "/rubrics/create",
      color: "bg-purple-500",
    },
    {
      title: "Run LLM Evaluation",
      description: "Test your LLM against existing rubrics",
      icon: TestTube,
      link: "/test-cases/run",
      color: "bg-secondary-accent",
    },
    {
      title: "View Analytics",
      description: "Monitor performance and agreement metrics",
      icon: BarChart,
      link: "/analytics/trends",
      color: "bg-success",
    },
  ];

  const recentActivity = [
    {
      action: "Created rubric",
      item: "Clinical Diagnosis Accuracy v2.1",
      time: "2 hours ago",
      type: "create",
    },
    {
      action: "Completed evaluation",
      item: "Medication Recommendation Test Set",
      time: "4 hours ago",
      type: "test",
    },
    {
      action: "Updated rubric",
      item: "Patient Safety Assessment Rules",
      time: "6 hours ago",
      type: "update",
    },
    {
      action: "Reviewed rubric",
      item: "Legacy Treatment Protocol v1.0",
      time: "1 day ago",
      type: "update",
    },
    {
      action: "Archived rubric",
      item: "Legacy Treatment Protocol v1.0",
      time: "1 day ago",
      type: "archive",
    },
  ];

  const stats = [
    { label: "Total Rubrics", value: "142", change: "+12", icon: BookOpen },
    { label: "Active Test Cases", value: "28", change: "+5", icon: TestTube },
    { label: "Avg Agreement", value: "94.2%", change: "+2.1%", icon: Brain },
    { label: "Monthly Evaluations", value: "1,847", change: "+234", icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage healthcare LLM evaluation rubrics and monitor performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-card hover:shadow-professional transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <span className="text-sm text-success font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started with rubric management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-3 hover:shadow-card transition-all"
              >
                <Link to={action.link}>
                  <div className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">{action.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and changes to your rubrics and evaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.action}</span>
                    <span className="mx-1">•</span>
                    <span className="text-muted-foreground">{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}