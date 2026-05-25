import axios from "axios";
import { toast } from "sonner";

export const generateContext = async (
  shareID,
  content,
  setUrl,
  updateShareID,
  language,
  onCreated
) => {
  if (shareID) {
    try {
      await axios.post(`/api/update_context`, {
        shareID,
        content,
        lang: language,
      });
      toast("Snippet updated", { type: "success" });
    } catch (error) {
      console.error("Error updating context:", error);
      toast("Update failed", { type: "error" });
    }
  } else {
    try {
      const response = await axios.post(`/api/generate_context`, {
        content,
        lang: language,
      });
      const { id, createdAt } = response.data;
      updateShareID(id);
      setUrl(`${window.location.origin}/share/${id}`);
      onCreated?.({ id, createdAt, lang: language });
      toast("New snippet created", { type: "success" });
    } catch (error) {
      console.error("Error generating context:", error);
      toast("Create failed", { type: "error" });
    }
  }
};

export const fetchCustomData = async (
  customShareID,
  setContent,
  onLoaded
) => {
  try {
    const response = await axios.get(`/api/share/${customShareID}`);
    const payload = response.data;
    const data = typeof payload === "string" ? payload : payload?.data;
    if (data != null) {
      setContent(data);
      onLoaded?.({
        id: customShareID,
        lang: payload?.lang,
        createdAt: payload?.createdAt,
        updatedAt: payload?.updatedAt,
      });
      toast("Snippet loaded", { type: "success" });
    } else {
      toast("Empty snippet", { type: "error" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    toast("No snippet for this id", { type: "error" });
  }
};
