import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IconDeviceFloppy, IconLayout } from "@tabler/icons-react";

// --- Sub-Component: Section Editor ---
const SectionEditor = ({ data, onSave, onCancel }) => {
  const [formData, setFormData] = useState(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-sm font-black uppercase text-muted-foreground">
            Edit Section Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase">
              Section Heading
            </label>
            <Input
              value={formData.heading}
              onChange={(e) =>
                setFormData({ ...formData, heading: e.target.value })
              }
              placeholder="e.g. Data Protection"
              className="font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase">
              Paragraph Text
            </label>
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
              <ReactQuill
                theme="snow"
                value={formData.paragraph}
                onChange={(val) => setFormData({ ...formData, paragraph: val })}
                placeholder="Enter general text here..."
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => onSave(formData)}
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
            >
              <IconDeviceFloppy size={18} /> Save Section
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview of the specific Section */}
      <Card className="bg-slate-900 text-white border-none shadow-2xl min-h-[400px]">
        <CardHeader className="border-b border-white/10 flex flex-row items-center gap-2">
          <IconLayout size={18} className="text-blue-400" />
          <CardTitle className="text-[10px] font-black uppercase tracking-widest text-blue-400">
            Mobile App Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-10 px-10">
          <h3 className="text-2xl font-black mb-6">
            {formData.heading || "Section Heading"}
          </h3>
          <div
            className="text-slate-300 leading-relaxed text-sm break-words"
            dangerouslySetInnerHTML={{
              __html: formData.paragraph || "<i>No content yet...</i>",
            }}
          />
          {formData.list?.length > 0 && (
            <ul className="mt-4 space-y-3">
              {formData.list.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-slate-400 italic"
                >
                  <span className="text-blue-500">•</span> {item}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionEditor;
