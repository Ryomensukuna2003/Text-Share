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
        <div className="flex items-center gap-2 px-4">
          <Code2 className="h-6 w-6 text-foreground" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            CodeShare
          </h1>
        </div>
        <div className="flex  items-center">
          <div className="h-full flex items-center ">
            {shareID && (
              <div className="flex items-center border-l-2 px-4 py-6 gap-2">
                <span className="text-sm font-medium ">ID: {shareID}</span>
                <Button
                  onClick={copyLink}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8  text-foreground"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-primary" color="green" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="h-full flex items-center border-l-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
