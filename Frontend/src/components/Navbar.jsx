import React from "react";
import { Code2, Copy, Check } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { useState } from "react";

const Navbar = () => {
  const { shareID } = useStore();
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}/share/${shareID}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <header className="border-b-2 border-border bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex items-center justify-center size-9 bg-foreground text-background border-2 border-border">
            <Code2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
              CodeShare
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              ▸ TEXT / CODE / SNIPPETS
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-full flex items-center">
            {shareID && (
              <div className="flex items-stretch border-l-2 border-border">
                <div className="flex items-center gap-2 px-4 py-4 bg-[var(--accent-shock)] text-black border-r-2 border-border">
                  <span className="inline-block size-2 bg-black" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    ID / {shareID}
                  </span>
                </div>
                <Button
                  onClick={copyLink}
                  className="h-full px-4 bg-foreground text-background rounded-none hover:bg-foreground hover:brightness-110 shadow-none active:translate-y-[2px] transition-transform border-r-2 border-border"
                  title="Copy shareable link"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[var(--accent-shock)]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="h-full flex items-center border-l-2 border-border">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
