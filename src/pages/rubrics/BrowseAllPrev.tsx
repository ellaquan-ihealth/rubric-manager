import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Edit, Copy } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface RubricSelection {
  domain: string;
  subdomain: string;
  category: string;
}

interface RubricDropdownsProps {
  selection: RubricSelection;
  onSelectionChange: (selection: RubricSelection) => void;
}

const DOMAINS = {
  'glycemic-trends': {
    name: 'Glycemic Trends',
    subdomains: {
      'postmeal-hyperglycemia': {
        name: 'Post-meal Hyperglycemia',
        categories: {
          'glycemia_pattern_postmeal': 'Post-meal Pattern Analysis',
          'carb_counting_accuracy': 'Carbohydrate Counting Accuracy',
          'insulin_timing_optimization': 'Insulin Timing Optimization'
        }
      },
      'dawn-phenomenon': {
        name: 'Dawn Phenomenon',
        categories: {
          'glycemia_pattern_dawn': 'Dawn Effect Pattern',
          'basal_insulin_adjustment': 'Basal Insulin Adjustment'
        }
      }
    }
  },
  'medication-safety': {
    name: 'Medication Safety',
    subdomains: {
      'sglt2-risk': {
        name: 'SGLT2 Risk Assessment',
        categories: {
          'medication_safety_sglt2': 'SGLT2 Safety Protocol',
          'dka_risk_assessment': 'DKA Risk Assessment'
        }
      },
      'hypoglycemia-prevention': {
        name: 'Hypoglycemia Prevention',
        categories: {
          'medication_safety_hypo': 'Hypoglycemia Prevention',
          'insulin_dosing_safety': 'Insulin Dosing Safety'
        }
      }
    }
  },
  'lifestyle-management': {
    name: 'Lifestyle Management',
    subdomains: {
      'exercise-planning': {
        name: 'Exercise Planning',
        categories: {
          'exercise_glucose_management': 'Exercise Glucose Management',
          'activity_timing_optimization': 'Activity Timing Optimization'
        }
      },
      'nutrition-counseling': {
        name: 'Nutrition Counseling',
        categories: {
          'meal_planning_personalization': 'Meal Planning Personalization',
          'dietary_adherence_support': 'Dietary Adherence Support'
        }
      }
    }
  }
};
