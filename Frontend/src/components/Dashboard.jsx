import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/components/theme-provider";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { useStore } from "@/store/store";
import { generateContext, fetchCustomData } from "@/lib/functions";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { brutalistLight, brutalistDark } from "@/lib/editor-theme";
import { getLanguageExtension } from "@/lib/editor-langs";
import LangSelector from "@/components/langSelector";
import { Copy, Check, Menu, X } from "lucide-react";
import AnimatedWordCycle from "@/components/ui/animated-text-cycle";
import SleepingCat from "./neko";

const Dashboard = () => {
  const { id } = useParams();
  const { shareID, updateShareID } = useStore();
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [customShareID, setCustomShareID] = useState();
  const [language, setLanguage] = useState("javascript");
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { theme } = useTheme();
  useEffect(() => {
    if (id) {
      setCustomShareID(id);
      updateShareID(id);
      fetchCustomData(id, setContent);
    }
  }, [id]);

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const copytoclipboard = async () => {
    navigator.clipboard.writeText(content).then(() => {
      toast("Content copied to clipboard", {
        type: "success",
      });
    });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const editorExtensions = useMemo(
    () => [
      getLanguageExtension(language),
      EditorView.lineWrapping,
      EditorView.theme({
        "&": { height: "100%" },
        ".cm-scroller": { fontFamily: "Necto, monospace" },
        ".cm-gutters": {
          border: "none",
          backgroundColor: "var(--card)",
        },
        ".cm-activeLine": { backgroundColor: "transparent" },
        ".cm-activeLineGutter": {
          backgroundColor: "transparent",
          fontWeight: "700",
        },
        ".cm-lineNumbers .cm-gutterElement": {
          padding: "0 12px 0 8px",
          minWidth: "2.5em",
          textAlign: "right",
          letterSpacing: "0.05em",
        },
        ".cm-content": { padding: "12px 0" },
        ".cm-line": { padding: "0 12px" },
      }),
    ],
    [language]
  );

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-0">
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-between items-center border-b-2 border-border p-2">
        <Button
          variant="brutal"
          onClick={toggleControls}
          className="px-3 py-2 text-xs"
        >
          {showControls ? (
            <X className="size-4" />
          ) : (
            <Menu className="size-4" />
          )}
          <span className="ml-2">
            {showControls ? "HIDE" : "MENU"}
          </span>
        </Button>
        <div className="flex items-center font-bold uppercase tracking-wider text-xs">
          {content?.length} CHARS / {content?.split("\n").length} LINES
        </div>
      </div>

      {/* Left side - Controls */}
      <div
        className={`${
          showControls ? "flex" : "hidden"
        } flex-col w-full md:w-1/3 lg:w-[30%] border-r-2 border-border bg-card overflow-hidden min-h-0`}
      >
        <div className="flex flex-col border-b-2 border-border">
          <div className="min-h-14 md:min-h-16 border-b-2 border-border uppercase font-bold tracking-widest text-xs flex items-center">
            <div className="px-4 md:px-6 flex items-center gap-2">
              <span className="inline-block size-2 bg-foreground" />
              CONTEXT ID
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              value={customShareID}
              onChange={(e) => setCustomShareID(e.target.value)}
              placeholder={shareID || "ENTER ID"}
              className="w-full border-none p-4 md:p-6 lg:p-8 text-lg md:text-xl lg:text-2xl bg-card text-card-foreground rounded-none focus-visible:ring-0 font-mono"
            />
            <Button
              onClick={() => fetchCustomData(customShareID, setContent)}
              className="px-4 h-full md:px-6 lg:px-8 py-5 md:py-5 lg:py-6 bg-foreground text-background rounded-none hover:bg-foreground hover:brightness-110 font-bold uppercase tracking-widest shadow-none border-l-2 border-border active:translate-y-[2px] transition-transform"
            >
              FETCH
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-h-0">
          <div className="text-xs uppercase tracking-widest font-bold border-b-2 border-border hidden md:flex bg-card">
            <div className="border-r-2 px-4 md:px-6 py-3 border-border w-fit flex items-center gap-3">
              <span className="inline-block size-2 bg-foreground" />
              {content?.length} CHARS / {content?.split("\n").length} LINES
            </div>
          </div>
          {shared && shareID && shareID != "" && (
            <>
              <div className="bg-foreground text-background px-4 py-2 border-y-2 border-border flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <span className="inline-block size-2 bg-background" />
                  STATUS / LIVE
                </span>
                <span>ID / {shareID}</span>
              </div>
              <div className="flex items-center justify-center h-full p-4">
                <div className="border-2 border-border bg-background p-2">
                  <QRCode
                    size={256}
                    className="w-full max-w-48 md:max-w-56 lg:max-w-64"
                    value={url}
                    viewBox={`0 0 256 256`}
                    fgColor="var(--foreground)"
                    bgColor="var(--background)"
                  />
                </div>
              </div>
            </>
          )}
          <div className="mt-auto flex flex-col justify-end items-start gap-1 px-4 md:px-6 py-4 md:py-6 border-b-2 border-border overflow-hidden">
            <div className="text-xl md:text-2xl font-light text-muted-foreground leading-none">
              Share your
            </div>
            <div className="font-bold leading-none whitespace-nowrap">
              <AnimatedWordCycle
                words={[
                  "snippets",
                  "code",
                  "notes",
                  "documentation",
                  "ideas",
                  "solutions",
                  "algorithms",
                  "templates",
                ]}
                interval={3000}
                className={"text-foreground text-3xl md:text-4xl"}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full border-t-2 border-border">
            <Button
              className="h-full px-4 md:px-6 lg:px-8 py-5 md:py-5 lg:py-6 bg-foreground text-background rounded-none hover:bg-foreground hover:brightness-110 font-bold uppercase tracking-widest text-base md:text-lg border-r-2 border-border shadow-none active:translate-y-[2px] transition-transform"
              onClick={() =>
                generateContext(shareID, content, setUrl, updateShareID)
              }
            >
              {shareID && shareID != "" ? "UPDATE" : "CREATE"}
            </Button>

            <div className="absolute left-1/4 bottom-11 hidden lg:block">
              <SleepingCat />
            </div>
            <Button
              className="h-full px-4 md:px-6 lg:px-8 py-5 md:py-5 lg:py-6 bg-background text-foreground rounded-none hover:bg-card font-bold uppercase tracking-widest text-base md:text-lg shadow-none active:translate-y-[2px] transition-transform"
              onClick={() => {
                if (!shareID || shareID == "") {
                  toast("Create context first", {
                    type: "error",
                  });
                  return;
                }
                setShared(true);
              }}
            >
              SHARE
            </Button>
          </div>
        </div>
      </div>

      {/* Right side editor */}
      <div
        className={`w-full ${
          showControls ? "md:w-2/3 lg:w-[70%]" : "w-full"
        } flex flex-col min-h-0`}
      >
        <div className="min-h-14 md:min-h-16 flex justify-between border-b-2 border-border items-stretch">
          <Button
            className="size-14 md:size-16 shrink-0 p-0 bg-foreground text-background rounded-none hover:bg-foreground hover:brightness-110 shadow-none border-r-2 border-border active:translate-y-[2px] transition-transform flex items-center justify-center"
            onClick={copytoclipboard}
          >
            {copied ? (
              <Check className="size-4 text-background" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
          <div className="flex-1 flex items-center px-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">
            EDITOR
          </div>
          <LangSelector language={language} setLanguage={setLanguage} />
        </div>
        <div className="w-full flex-1 min-h-0 overflow-hidden bg-background">
          <CodeMirror
            value={content}
            onChange={(value) => setContent(value)}
            theme={theme === "light" ? brutalistLight : brutalistDark}
            extensions={editorExtensions}
            height="100%"
            style={{ height: "100%", fontSize: "14px" }}
            placeholder={"// paste your code here\n// then hit CREATE to get a share id"}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
              bracketMatching: true,
              closeBrackets: true,
              indentOnInput: true,
              autocompletion: false,
              searchKeymap: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
