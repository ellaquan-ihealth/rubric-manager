import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronDown, Lightbulb } from "lucide-react";
import Papa from "papaparse";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";


export default function BrowseAll() {
  const [rubrics, setRubrics] = useState<any[]>([]);
  const [allRubrics, setAllRubrics] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRubric, setSelectedRubric] = useState<any | null>(null);
  const [editedName, setEditedName] = useState("");
  const [rubricsToReview, setRubricsToReview] = useState<any[]>([]);
  
  // Filter states
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedSubdomains, setSelectedSubdomains] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availableDomains, setAvailableDomains] = useState<string[]>([]);
  const [availableSubdomains, setAvailableSubdomains] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Color mapping for domains, subdomains, and categories
  const getColorForDomain = (domain: string) => {
    const colors: Record<string, string> = {
      "Safety": "bg-red-500 text-white hover:bg-red-600",
      "Relevancy": "bg-blue-500 text-white hover:bg-blue-600",
      "Trustworthiness": "bg-green-500 text-white hover:bg-green-600",
      "Privacy": "bg-purple-500 text-white hover:bg-purple-600",
      "Accuracy": "bg-orange-500 text-white hover:bg-orange-600",
      "Reliability": "bg-cyan-500 text-white hover:bg-cyan-600",
    };
    return colors[domain] || "bg-gray-500 text-white hover:bg-gray-600";
  };

  const getColorForSubDomain = (subdomain: string) => {
    const colors: Record<string, string> = {
      "Harmful Content": "bg-rose-100 text-rose-800 border-rose-300",
      "Bias": "bg-amber-100 text-amber-800 border-amber-300",
      "Misinformation": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "Quality": "bg-emerald-100 text-emerald-800 border-emerald-300",
      "Relevance": "bg-sky-100 text-sky-800 border-sky-300",
      "Completeness": "bg-indigo-100 text-indigo-800 border-indigo-300",
    };
    return colors[subdomain] || "bg-slate-100 text-slate-800 border-slate-300";
  };

  const getColorForCategory = (category: string) => {
    const colors: Record<string, string> = {
      "Medical": "bg-pink-50 text-pink-700 border-pink-200",
      "Legal": "bg-violet-50 text-violet-700 border-violet-200",
      "Financial": "bg-teal-50 text-teal-700 border-teal-200",
      "Educational": "bg-neutral-50 text-neutral-700 border-neutral-200",
      "General": "bg-neutral-50 text-neutral-700 border-neutral-200",
    };
    // Create a simple hash of the category string to assign consistent colors
    const hash = category.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const colorKeys = Object.keys(colors);
    const colorKey = colorKeys[hash % colorKeys.length];
    return colors[colorKey] || "bg-neutral-50 text-neutral-700 border-neutral-200";
  };

  // useEffect(() => {
  //   fetch("/api/rubrics.csv")
  //     .then((res) => res.text())
  //     .then((text) => {
  //       const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  //       const output = [];
  //       let idCounter = 1;

  //       parsed.data.forEach((row: any) => {
  //         const Domain = row["Domain"];
  //         const SubDomain = row["SubDomain"];
  //         const Category = row["Category/Scenario"];
  //         const RubricText = row["Case-Specific Criteria/Rubrics - Human Expert"];

  //         const matches = RubricText?.match(/(SAFETY|RELEVANCY|TRUSTWORTHINESS)([\s\S]*?)(?=(SAFETY|RELEVANCY|TRUSTWORTHINESS|$))/gi);
  //         matches?.forEach((section: string) => {
  //           const lines = section.split("\n").slice(1).map((l) => l.trim()).filter(Boolean);
  //           lines.forEach((line) => {
  //             output.push({
  //               id: idCounter++,
  //               name: line.replace(/^\d+\.\s*/, ""),
  //               domain: Domain?.trim(),
  //               subdomain: SubDomain?.trim(),
  //               category: Category?.trim(),
  //             });
  //           });
  //         });
  //       });

  //       setRubrics(output);
  //       setAllRubrics(output); // store full copy
        
  //       // Extract unique values for filters
  //       const domains = [...new Set(output.map(r => r.domain).filter(Boolean).map(d => d.trim()))];
  //       const subdomains = [...new Set(output.map(r => r.subdomain).filter(Boolean).map(s => s.trim()))];
  //       const categories = [...new Set(output.map(r => r.category).filter(Boolean).map(c => c.trim()))];
        
  //       setAvailableDomains(domains.sort());
  //       setAvailableSubdomains(subdomains.sort());
  //       setAvailableCategories(categories.sort());
  //     });
  // }, []);

  useEffect(() => {
    const testData = {
      name: "test from js",
      description: "if this works, that would be so cool",
      domain: "DM",
      sub_domain: "Lifestyle",
      scenario: "Safety",
      weight: 1,
      created_by: "16f7_DM_01",
      is_public: 1,
      usage_count: 123
    }

    fetch(`http://0.0.0.0:8000/insert_one_to_table`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    })
    .then((res) => res.json())
    .then((result) => console.log(result));

    const requestData = {
      num_rubrics: 5
    }

    fetch(`http://0.0.0.0:8000/fetch_recent_rubrics`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then((res) => res.json())
    .then((rubrics) => {
      const output = [];

      rubrics["rubrics"].forEach(rubric => {
        output.push({
          id: rubric[0],
          name: rubric[1],
          domain: rubric[3],
          subdomain: rubric[4],
          category: rubric[5],
        });
      });
      setRubrics(output);
      setAllRubrics(output); // store full copy

      // Extract unique values for filters
      const domains = [...new Set(output.map(r => r.domain).filter(Boolean).map(d => d.trim()))];
      const subdomains = [...new Set(output.map(r => r.subdomain).filter(Boolean).map(s => s.trim()))];
      const categories = [...new Set(output.map(r => r.category).filter(Boolean).map(c => c.trim()))];
      
      setAvailableDomains(domains.sort());
      setAvailableSubdomains(subdomains.sort());
      setAvailableCategories(categories.sort());
    })
  }, []);

  const handleSearch = () => {
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = allRubrics;

    // Apply search term filter
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter((rubric) =>
        [rubric.name, rubric.domain, rubric.subdomain, rubric.category]
          .some((field) => field?.toLowerCase().includes(term))
      );
    }

    // Apply domain filters
    if (selectedDomains.length > 0) {
      filtered = filtered.filter((rubric) => 
        selectedDomains.includes(rubric.domain)
      );
    }

    // Apply subdomain filters
    if (selectedSubdomains.length > 0) {
      filtered = filtered.filter((rubric) => 
        selectedSubdomains.includes(rubric.subdomain)
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((rubric) => 
        selectedCategories.includes(rubric.category)
      );
    }

    setRubrics(filtered);
  };

  const clearAllFilters = () => {
    setSelectedDomains([]);
    setSelectedSubdomains([]);
    setSelectedCategories([]);
    setSearchTerm("");
    setRubrics(allRubrics);
  };

  const getActiveFilterCount = () => {
    return selectedDomains.length + selectedSubdomains.length + selectedCategories.length;
  };

  // Apply filters whenever filter selections change
  useEffect(() => {
    applyFilters();
  }, [selectedDomains, selectedSubdomains, selectedCategories, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rubrics by name, filter by domain, or category..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        
        <Button onClick={handleSearch} className="shrink-0">
          Search
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getActiveFilterCount()}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto" align="end">
            <div className="flex items-center justify-between p-2">
              <DropdownMenuLabel className="p-0">Filters</DropdownMenuLabel>
              {getActiveFilterCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto p-1 text-xs">
                  Clear All
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            
            {/* Domain Filters */}
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              Domains
            </DropdownMenuLabel>
            <div className="max-h-24 overflow-y-auto">
              {availableDomains.map((domain) => (
                <DropdownMenuCheckboxItem
                  key={domain}
                  checked={selectedDomains.includes(domain)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedDomains([...selectedDomains, domain]);
                    } else {
                      setSelectedDomains(selectedDomains.filter(d => d !== domain));
                    }
                  }}
                  className="text-xs"
                >
                  {domain}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
            
            <DropdownMenuSeparator />
            
            {/* Subdomain Filters */}
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              Subdomains
            </DropdownMenuLabel>
            <div className="max-h-24 overflow-y-auto">
              {availableSubdomains.map((subdomain) => (
                <DropdownMenuCheckboxItem
                  key={subdomain}
                  checked={selectedSubdomains.includes(subdomain)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSubdomains([...selectedSubdomains, subdomain]);
                    } else {
                      setSelectedSubdomains(selectedSubdomains.filter(s => s !== subdomain));
                    }
                  }}
                  className="text-xs"
                >
                  {subdomain}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
            
            <DropdownMenuSeparator />
            
            {/* Category Filters */}
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              Categories
            </DropdownMenuLabel>
            <div className="max-h-24 overflow-y-auto">
              {availableCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                  className="text-xs"
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Rubrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Rubric</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full"
              />
            </div>
            <DialogHeader>
              <DialogTitle>Notes/Reasoning</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
              value=""
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  // TODO: Call API to refine the rubric
                  // For now, just show a placeholder action
                  console.log("Refining rubric:", editedName);
                  // Future: setRefinedSuggestion(apiResponse);
                }}
                className="flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-3" />
                AI Refine
              </Button>
              <Button
                onClick={() => {
                  if (selectedRubric) {
                    const proposedEdit = {
                      ...selectedRubric,
                      proposedName: editedName,
                      status: "pending_review",
                      timestamp: new Date().toISOString(),
                    };
                    setRubricsToReview((prev) => [...prev, proposedEdit]);
                    setEditOpen(false);
                  }
                }}
              >
                Submit for Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {rubrics.map((rubric) => (
          <Card key={rubric.id} className="shadow-card hover:shadow-professional transition-all p-3">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <CardTitle className="text-sm font-medium text-foreground">{rubric.name}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className={getColorForDomain(rubric.domain)}>
                      {rubric.domain}
                    </Badge>
                    <Badge variant="outline" className={getColorForSubDomain(rubric.subdomain)}>
                      {rubric.subdomain}
                    </Badge>
                    <Badge variant="outline" className={getColorForCategory(rubric.category)}>
                      {rubric.category}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRubric(rubric);
                      setEditedName(rubric.name);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 text-xs text-muted-foreground" />
          </Card>
        ))}
      </div>
    </div>
  );
}
