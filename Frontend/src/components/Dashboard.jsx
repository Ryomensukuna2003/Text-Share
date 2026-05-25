import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { useStore } from "@/store/store";
import { generateContext, fetchCustomData } from "@/lib/functions";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco, dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
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

  // For scrolling the textarea and the syntax highlighter at same time
  const highlightRef = useRef();
  const inputRef = useRef();
  const syncScroll = () => {
    highlightRef.current.scrollTop = inputRef.current.scrollTop;
    highlightRef.current.scrollLeft = inputRef.current.scrollLeft;
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
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
        } flex-col w-full md:w-1/3 lg:w-[30%] border-r-2 border-border bg-card`}
      >
        <div className="flex flex-col border-b-2 border-border">
          <div className="border-b-2 border-border uppercase font-bold tracking-widest text-xs flex items-center justify-between">
            <div className="p-4 md:p-6 lg:p-8 w-fit flex items-center gap-2">
              <span className="inline-block size-2 bg-[var(--accent-shock)]" />
              CONTEXT ID
            </div>
            <div className="border-l-2 border-border px-4 py-2 hidden md:block text-muted-foreground">
              [INPUT]
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              value={customShareID}
              onChange={(e) => setCustomShareID(e.target.value)}
              placeholder={shareID || "▸ ENTER ID"}
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

        <div className="flex flex-col justify-between h-full">
          <div className="text-xs uppercase tracking-widest font-bold border-b-2 border-border hidden md:flex bg-card">
            <div className="border-r-2 p-4 md:p-6 lg:p-8 border-border h-full w-fit flex items-center gap-3">
              <span className="inline-block size-2 bg-foreground" />
              {content?.length} CHARS / {content?.split("\n").length} LINES
            </div>
          </div>
          {shared && shareID && shareID != "" && (
            <>
              <div className="bg-foreground text-background px-4 py-2 border-y-2 border-border flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <span className="inline-block size-2 bg-[var(--accent-shock)]" />
                  STATUS / LIVE
                </span>
                <span>ID / {shareID}</span>
              </div>
              <div className="flex items-center justify-center h-full p-4">
                <div className="border-2 border-border brutal-shadow-static bg-background p-2">
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
          <div className="flex justify-between items-center p-4 md:p-6 lg:p-8 border-b-2 border-border">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-light text-left text-muted-foreground">
              Share your{" "}
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
                className={"text-foreground font-semi-bold"}
              />
            </h1>
          </div>
          <div className="grid grid-cols-2 w-full mt-auto border-t-2 border-border">
            <Button
              className="h-full px-4 md:px-6 lg:px-8 py-5 md:py-5 lg:py-6 bg-[var(--accent-shock)] text-black rounded-none hover:bg-[var(--accent-shock)] hover:brightness-95 font-bold uppercase tracking-widest text-base md:text-lg border-r-2 border-border shadow-none active:translate-y-[2px] transition-transform"
              onClick={() =>
                generateContext(shareID, content, setUrl, updateShareID)
              }
            >
              {shareID && shareID != "" ? "▸ UPDATE" : "▸ CREATE"}
            </Button>

            <div className="absolute left-1/4 bottom-11 hidden lg:block">
              <SleepingCat />
            </div>
            <Button
              className="h-full px-4 md:px-6 lg:px-8 py-5 md:py-5 lg:py-6 bg-foreground text-background rounded-none hover:bg-foreground hover:brightness-110 font-bold uppercase tracking-widest text-base md:text-lg shadow-none active:translate-y-[2px] transition-transform"
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
              ▸ SHARE
            </Button>
          </div>
        </div>
      </div>

      {/* Right side editor */}
      <div
        className={`w-full ${
          showControls ? "md:w-2/3 lg:w-[70%]" : "w-full"
        } h-[calc(100vh-5rem)]`}
      >
        <div className="flex justify-between border-b-2 border-border items-stretch">
          <Button
            className="w-fit h-full p-3 md:p-4 py-4 md:py-6 bg-foreground text-background rounded-none hover:bg-foreground hover:brightness-110 shadow-none border-r-2 border-border active:translate-y-[2px] transition-transform"
            onClick={copytoclipboard}
          >
            {copied ? (
              <Check className="size-4 mx-2 md:mx-4 text-[var(--accent-shock)]" />
            ) : (
              <Copy className="size-4 mx-2 md:mx-4" />
            )}
          </Button>
          <div className="flex-1 flex items-center px-4 text-xs uppercase tracking-widest font-bold text-muted-foreground">
            ▸ EDITOR
          </div>
          <LangSelector language={language} setLanguage={setLanguage} />
        </div>
        <div className="relative w-full h-[calc(100vh-10rem)]">
          {!content && (
            <div className="absolute inset-0 p-4 md:p-6 pointer-events-none font-mono text-muted-foreground/40 uppercase tracking-wider text-xs md:text-sm leading-relaxed select-none">
              {"// PASTE.YOUR.CODE.HERE"}
              <br />
              {"// OR.TYPE.SOMETHING.LOUD"}
              <br />
              <br />
              {"// THEN.HIT [▸ CREATE] TO.GET.A.SHARE.ID"}
            </div>
          )}
          <div
            ref={highlightRef}
            className="absolute inset-0 p-2 overflow-auto pointer-events-none whitespace-pre-wrap break-words rounded-none"
          >
            <SyntaxHighlighter
              language={language}
              style={theme === "light" ? docco : dracula}
              wrapLongLines={true}
              customStyle={{
                margin: 0,
                background: "transparent",
                padding: 0,
                height: "calc(100vh-10rem)",
              }}
            >
              {content || " "}
            </SyntaxHighlighter>
          </div>

          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onScroll={syncScroll}
            className="absolute inset-0 p-2 bg-transparent text-transparent caret-foreground resize-none overflow-auto z-10 outline-none font-mono"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
