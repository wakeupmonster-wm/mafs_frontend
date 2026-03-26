import React, { useEffect, useState } from "react";
import { Loader2, Save, Share2 } from "lucide-react";
import { SocialInput } from "../components/SocialInput";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { PageHeader } from "@/components/common/headSubhead";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSocialMediaStatus,
  fetchSocialMedia,
  updateSocialMediaAction,
} from "../store/social.media.slice";
import { toast } from "sonner";

// 1. Move config outside to avoid re-renders
const PLATFORM_CONFIG = {
  facebook: {
    label: "Facebook URL",
    title: "Facebook",
    icon: <FaFacebook size={20} className="text-blue-600" />,
    iconKey: "facebook",
    placeholder: "https://facebook.com/...",
    order: 1,
  },
  twitter: {
    label: "Twitter URL",
    title: "X (Twitter)",
    icon: <FaTwitter size={18} className="text-sky-400" />,
    iconKey: "twitter",
    placeholder: "https://twitter.com/...",
    order: 2,
  },
  youtube: {
    label: "YouTube URL",
    title: "YouTube",
    icon: <FaYoutube size={18} className="text-red-500" />,
    iconKey: "youtube",
    placeholder: "https://youtube.com/...",
    order: 3,
  },
  instagram: {
    label: "Instagram URL",
    title: "Instagram",
    icon: <FaInstagram size={18} className="text-pink-500" />,
    iconKey: "instagram",
    placeholder: "https://instagram.com/...",
    order: 4,
  },
  telegram: {
    label: "Telegram URL",
    title: "Telegram",
    icon: <FaTelegram size={18} className="text-blue-400" />,
    iconKey: "telegram",
    placeholder: "https://t.me/...",
    order: 5,
  },
};

export default function SocialMediaPage() {
  const dispatch = useDispatch();
  const { list, loading, error, successMessage } = useSelector(
    (state) => state.socialMedia,
  );

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
    instagram: "",
    telegram: "",
  });

  // Sync Logic
  useEffect(() => {
    if (list?.socialMedia && Array.isArray(list.socialMedia)) {
      const updatedLinks = {};
      list.socialMedia.forEach((item) => {
        if (item.platform) {
          updatedLinks[item.platform] = item.url || "";
        }
      });
      setSocialLinks((prev) => ({ ...prev, ...updatedLinks }));
    }
  }, [list]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(fetchSocialMedia());
      dispatch(clearSocialMediaStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(clearSocialMediaStatus());
    }
  }, [successMessage, error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const payload = Object.keys(PLATFORM_CONFIG).map((key) => {
      const config = PLATFORM_CONFIG[key];
      return {
        platform: key,
        title: config.title,
        url: socialLinks[key] || "",
        icon: config.iconKey,
        isActive: true,
        order: config.order,
      };
    });

    // console.log("Final Payload: ", payload);
    dispatch(updateSocialMediaAction(payload));
  };

  useEffect(() => {
    dispatch(fetchSocialMedia());
  }, [dispatch]);

  return (
    <main className="flex-1 p-6 pb-20 w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 mb-8">
        <PageHeader
          heading="Social Media"
          icon={<Share2 className="w-9 h-9 text-white animate-pulse" />}
          color="bg-brand-aqua shadow-brand-aqua/30"
          subheading="Configure social media links for your application."
        />

        <button
          disabled={loading}
          className="flex items-center gap-2 bg-brand-aqua/80 hover:bg-brand-aqua text-slate-900 text-sm px-6 py-2.5 rounded-lg font-bold transition-all shadow-md disabled:opacity-50"
          onClick={handleSave}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
          <SocialInput
            key={key}
            label={config.label}
            name={key}
            value={socialLinks[key] || ""}
            onChange={handleInputChange}
            placeholder={config.placeholder}
            icon={config.icon}
          />
        ))}
      </div>
    </main>
  );
}
