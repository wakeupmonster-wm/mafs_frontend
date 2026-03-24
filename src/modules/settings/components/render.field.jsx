import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- REUSABLE FIELD RENDERER ---
export const RenderField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  options,
  description,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-gray-800 font-semibold font-jakarta tracking-wide text-sm">
            {label}
          </FormLabel>

          {type === "select" ? (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border border-slate-400 text-gray-800 h-12 focus:ring-brand-aqua">
                  <SelectValue
                    placeholder={placeholder || "Select an option"}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#1a1d27] border-gray-800 text-gray-200">
                {options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : type === "textarea" ? (
            <FormControl>
              <Textarea
                {...field}
                placeholder={placeholder}
                className="border border-slate-400 text-gray-800 min-h-[120px] focus-visible:ring-brand-aqua"
              />
            </FormControl>
          ) : (
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className="border border-slate-400 text-gray-800 h-12 focus-visible:ring-brand-aqua"
              />
            </FormControl>
          )}

          {description && (
            <FormDescription className="text-gray-800 text-xs">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-red-600 text-xs" />
        </FormItem>
      )}
    />
  );
};
