import React, { useState } from "react";
import { Save, Share2 } from "lucide-react";
import { SocialInput } from "../components/SocialInput";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { PageHeader } from "@/components/common/headSubhead";

export default function SocialMediaPage() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://web.facebook.com/keenasmustard",
    twitter: "",
    youtube: "https://www.youtube.com/channel/UCW1-o84XTDfAkHidhYE1clg",
    instagram: "https://www.instagram.com/keenasmustard",
    telegram: "https://t.me/+AsT66ANEu1hhZjY1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving Social Links:", socialLinks);
  };

  return (
    <main className="flex-1 p-6 pb-20 w-full">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
        <PageHeader
          heading="Social Media"
          icon={<Share2 className="w-9 h-9 text-white animate-pulse" />}
          color="bg-brand-aqua shadow-brand-aqua/30"
          subheading="Configure social media links for your application."
        />

        <button
          className="flex items-center gap-2 bg-brand-aqua/50 hover:bg-brand-aqua/60 text-black text-sm px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-slate-400/50"
          onClick={handleSave}
        >
          <Save size={16} /> Save
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input Fields */}
        <SocialInput
          label="Facebook URL"
          name="facebook"
          value={socialLinks.facebook}
          onChange={handleInputChange}
          placeholder="https://facebook.com/yourpage"
          icon={<FaFacebook size={18} className="text-blue-500" />}
        />

        <SocialInput
          label="Twitter URL"
          name="twitter"
          value={socialLinks.twitter}
          onChange={handleInputChange}
          placeholder="https://twitter.com/yourhandle"
          icon={<FaTwitter size={18} className="text-sky-400" />}
        />

        <SocialInput
          label="YouTube URL"
          name="youtube"
          value={socialLinks.youtube}
          onChange={handleInputChange}
          placeholder="https://youtube.com/c/yourchannel"
          icon={<FaYoutube size={18} className="text-red-500" />}
        />

        <SocialInput
          label="Instagram URL"
          name="instagram"
          value={socialLinks.instagram}
          onChange={handleInputChange}
          placeholder="https://instagram.com/yourprofile"
          icon={<FaInstagram size={18} className="text-pink-500" />}
        />

        <SocialInput
          label="Telegram URL"
          name="telegram"
          value={socialLinks.telegram}
          onChange={handleInputChange}
          placeholder="https://t.me/yourgroup"
          icon={<FaTelegram size={18} className="text-blue-400" />}
        />
      </div>
    </main>
  );
}
