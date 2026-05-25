import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LangSelector = ({ language, setLanguage }) => {
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  const languages = [
    "python",
    "html",
    "css",
    "bash",
    "json",
    "rust",
    "cpp",
    "java",
    "sql",
    "go",
    "php",
    "shell",
    "http",
    "dockerfile",
    "javascript",
    "typescript",
  ];

  return (
    <div className="flex items-stretch border-l-2 border-border">
      <DropdownMenu className="flex w-fit outline-none">
        <DropdownMenuTrigger className="border-none px-4 md:px-6 h-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-card hover:bg-foreground hover:text-background transition-colors active:translate-y-[2px]">
          <span className="inline-block size-2 bg-foreground" />
          LANG / {language}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 border-2 border-border bg-card rounded-none">
          <DropdownMenuLabel className="uppercase tracking-widest text-xs font-bold">
            CHOOSE LANGUAGE
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-border" />
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className="uppercase tracking-wider text-xs font-bold rounded-none cursor-pointer"
            >
              {lang}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LangSelector;
