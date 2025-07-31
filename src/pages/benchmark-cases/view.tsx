import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronDown } from "lucide-react";
import Papa from "papaparse";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface Case {
  id: string;
  domain: string;
  subdomain: string;
  category: string;
  caseNo: string;
  patientId: string;
  trigger: string;
  triggerTime: string;
  rubric: string;
  keyData: string;
  thoughtProcess: string;
}

export default function CaseViewer() {
  const [cases, setCases] = useState<Case[]>([]);
  const [allCases, setAllCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
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

  useEffect(() => {
    fetch("/api/cases.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        const output: Case[] = parsed.data.map((row: any, idx: number) => ({
          id: idx.toString(),
          domain: row["Domain"]?.trim(),
          subdomain: row["SubDomain"]?.trim(),
          category: row["Category/Scenario"]?.trim(),
          caseNo: row["Case No."]?.trim(),
          patientId: row["Unified Care Patient ID /Portal Link/Case Reviewer"]?.trim(),
          trigger: row["Case Trigger (BP alerts, inactivity, questions)"]?.trim(),
          triggerTime: row["Case Trigger Time"]?.trim(),
          rubric: row["Case-Specific Criteria/Rubrics - Human Expert"]?.trim(),
          keyData: row["Key Data Points Needed"]?.trim(),
          thoughtProcess: row["Professional Thought Process"]?.trim(),
        }));
        setCases(output);
        setAllCases(output);
        
        // Extract unique values for filters
        const domains = [...new Set(output.map(c => c.domain).filter(Boolean).map(d => d.trim()))];
        const subdomains = [...new Set(output.map(c => c.subdomain).filter(Boolean).map(s => s.trim()))];
        const categories = [...new Set(output.map(c => c.category).filter(Boolean).map(c => c.trim()))];
        
        setAvailableDomains(domains.sort());
        setAvailableSubdomains(subdomains.sort());
        setAvailableCategories(categories.sort());
      });
  }, []);

  const handleSearch = () => {
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = allCases;

    // Apply search term filter
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter((c) =>
        [
          c.domain,
          c.subdomain,
          c.category,
          c.caseNo,
          c.patientId,
          c.trigger,
          c.rubric,
          c.keyData,
          c.thoughtProcess,
        ].some((field) => field?.toLowerCase().includes(term))
      );
    }

    // Apply domain filters
    if (selectedDomains.length > 0) {
      filtered = filtered.filter((c) => 
        selectedDomains.includes(c.domain)
      );
    }

    // Apply subdomain filters
    if (selectedSubdomains.length > 0) {
      filtered = filtered.filter((c) => 
        selectedSubdomains.includes(c.subdomain)
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((c) => 
        selectedCategories.includes(c.category)
      );
    }

    setCases(filtered);
  };

  const clearAllFilters = () => {
    setSelectedDomains([]);
    setSelectedSubdomains([]);
    setSelectedCategories([]);
    setSearchTerm("");
    setCases(allCases);
  };

  const getActiveFilterCount = () => {
    return selectedDomains.length + selectedSubdomains.length + selectedCategories.length;
  };

  // Apply filters whenever filter selections change
  useEffect(() => {
    applyFilters();
  }, [selectedDomains, selectedSubdomains, selectedCategories, searchTerm]);

  return (
    <div className="space-y-6 p-4">
      {/* Search Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases by domain, trigger, rubric, etc..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        
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

      {/* Case Cards */}
      <div className="grid grid-cols-1 gap-4">
        {cases.map((c) => (
          <Card key={c.id} className="p-4 border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant="secondary" className={getColorForDomain(c.domain)}>
                  {c.domain}
                </Badge>
                <Badge variant="outline" className={getColorForSubDomain(c.subdomain)}>
                  {c.subdomain}
                </Badge>
                <Badge variant="outline" className={getColorForCategory(c.category)}>
                  {c.category}
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Case #{c.caseNo}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p><strong>Patient ID:</strong> {c.patientId}</p>
              <p><strong>Trigger:</strong> {c.trigger}</p>
              <p><strong>Trigger Time:</strong> {c.triggerTime}</p>
              <p><strong>Rubric:</strong> {c.rubric}</p>
              <p><strong>Key Data Points:</strong> {c.keyData}</p>
              <p><strong>Thought Process:</strong> {c.thoughtProcess}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
