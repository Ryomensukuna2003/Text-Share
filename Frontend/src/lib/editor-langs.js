import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { sql } from "@codemirror/lang-sql";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";
import { StreamLanguage } from "@codemirror/language";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { dockerFile } from "@codemirror/legacy-modes/mode/dockerfile";
import { http } from "@codemirror/legacy-modes/mode/http";

export function getLanguageExtension(lang) {
  switch (lang) {
    case "javascript":
      return javascript({ jsx: true });
    case "typescript":
      return javascript({ jsx: true, typescript: true });
    case "python":
      return python();
    case "html":
      return html();
    case "css":
      return css();
    case "json":
      return json();
    case "rust":
      return rust();
    case "cpp":
      return cpp();
    case "java":
      return java();
    case "sql":
      return sql();
    case "go":
      return go();
    case "php":
      return php();
    case "bash":
    case "shell":
      return StreamLanguage.define(shell);
    case "dockerfile":
      return StreamLanguage.define(dockerFile);
    case "http":
      return StreamLanguage.define(http);
    default:
      return javascript();
  }
}
