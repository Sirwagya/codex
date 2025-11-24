import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import { defaultContent } from "../data/defaultContent";

const SiteContentContext = createContext({
  content: defaultContent,
  loading: true,
  error: null,
  refreshContent: () => {},
  saveContent: async () => {},
});

export const SiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from("site_content")
        .select("data")
        .eq("slug", "primary")
        .single();

      if (queryError) {
        if (queryError.code === "PGRST116") {
          setContent(defaultContent);
          setError(null);
        } else {
          throw queryError;
        }
      } else if (data?.data) {
        setContent(data.data);
      } else {
        setContent(defaultContent);
      }
    } catch (fetchError) {
      console.error("Failed to load site content", fetchError);
      setError(fetchError.message ?? "Unable to load content");
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveContent = useCallback(async (nextContent) => {
    const sanitizedContent = nextContent ?? defaultContent;
    const { error: upsertError } = await supabase
      .from("site_content")
      .upsert(
        {
          slug: "primary",
          data: sanitizedContent,
        },
        { onConflict: "slug" }
      );

    if (upsertError) {
      console.error("Failed to save content", upsertError);
      throw upsertError;
    }

    setContent(sanitizedContent);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const value = useMemo(
    () => ({
      content,
      loading,
      error,
      refreshContent: fetchContent,
      saveContent,
      resetToDefault: () => setContent(defaultContent),
    }),
    [content, error, fetchContent, loading, saveContent]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => useContext(SiteContentContext);
