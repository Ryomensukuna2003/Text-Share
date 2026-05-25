import axios from "axios";
import { toast } from "sonner";

export const generateContext = async (
  shareID,
  content,
  setUrl,
  updateShareID
) => {
  if (shareID) {
    try {
      const response = await axios.post(`/api/update_context`, {
        shareID: shareID,
        content: content,
      });
      console.log(response.data);
      toast("Context updated successfully", {
        type: "success",
      });
    } catch (error) {
      console.error("Error updating context:", error);
    }
  } else {
    try {
      const response = await axios.post(`/api/generate_context`, {
        content: content,
      });
      updateShareID(response.data.id);
      setUrl(`${window.location.origin}/share/${response.data.id}`);
      toast("Context generated successfully", {
        type: "success",
      });
      console.log(response.data.id);
    } catch (error) {
      console.error("Error generating context:", error);
    }
  }
};

export const fetchCustomData = async (customShareID, setContent) => {
  try {
    const response = await axios.get(`/api/share/${customShareID}`);
    console.log(response.data);
    if (response.data) {
      setContent(response.data);
      toast("Content fetched successfully", {
        type: "success",
      });
    } else {
      toast("Data can't be fetched", {
        type: "error",
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    toast("No content found for this share ID", {
      type: "error",
    });
  }
};
