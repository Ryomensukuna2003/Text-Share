import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

const fontFamily = "Necto, ui-monospace, SFMono-Regular, Menlo, monospace";

export const brutalistLight = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#000000",
    caret: "#000000",
    selection: "rgba(0, 0, 0, 0.18)",
    selectionMatch: "rgba(0, 0, 0, 0.10)",
    lineHighlight: "rgba(0, 0, 0, 0.04)",
    gutterBackground: "#ffffff",
    gutterForeground: "#666666",
    gutterBorder: "#000000",
    fontFamily,
    fontSize: "14px",
  },
  styles: [
    { tag: t.comment, color: "#888888", fontStyle: "italic" },
    { tag: t.lineComment, color: "#888888", fontStyle: "italic" },
    { tag: t.blockComment, color: "#888888", fontStyle: "italic" },
    { tag: t.docComment, color: "#777777", fontStyle: "italic" },

    { tag: t.keyword, color: "#000000", fontWeight: "700" },
    { tag: t.controlKeyword, color: "#000000", fontWeight: "700" },
    { tag: t.modifier, color: "#000000", fontWeight: "700" },
    { tag: t.operatorKeyword, color: "#000000", fontWeight: "700" },
    { tag: t.atom, color: "#000000", fontWeight: "700" },
    { tag: t.bool, color: "#000000", fontWeight: "700" },
    { tag: t.null, color: "#000000", fontWeight: "700" },

    { tag: t.string, color: "#555555" },
    { tag: t.regexp, color: "#555555" },
    { tag: t.special(t.string), color: "#555555" },

    { tag: t.number, color: "#000000" },
    { tag: t.integer, color: "#000000" },
    { tag: t.float, color: "#000000" },

    { tag: t.function(t.variableName), color: "#000000", fontWeight: "700" },
    { tag: t.function(t.propertyName), color: "#000000", fontWeight: "700" },
    { tag: t.variableName, color: "#000000" },
    { tag: t.propertyName, color: "#000000" },
    { tag: t.typeName, color: "#000000", fontWeight: "700" },
    { tag: t.className, color: "#000000", fontWeight: "700" },
    { tag: t.namespace, color: "#000000" },

    { tag: t.operator, color: "#000000" },
    { tag: t.punctuation, color: "#000000" },
    { tag: t.bracket, color: "#000000" },

    { tag: t.tagName, color: "#000000", fontWeight: "700" },
    { tag: t.attributeName, color: "#000000" },
    { tag: t.attributeValue, color: "#555555" },

    { tag: t.heading, color: "#000000", fontWeight: "700" },
    { tag: t.emphasis, color: "#000000", fontStyle: "italic" },
    { tag: t.strong, color: "#000000", fontWeight: "700" },
    { tag: t.link, color: "#000000", textDecoration: "underline" },
  ],
});

export const brutalistDark = createTheme({
  theme: "dark",
  settings: {
    background: "#000000",
    foreground: "#ffffff",
    caret: "#ffffff",
    selection: "rgba(255, 255, 255, 0.22)",
    selectionMatch: "rgba(255, 255, 255, 0.12)",
    lineHighlight: "rgba(255, 255, 255, 0.04)",
    gutterBackground: "#000000",
    gutterForeground: "#888888",
    gutterBorder: "#ffffff",
    fontFamily,
    fontSize: "14px",
  },
  styles: [
    { tag: t.comment, color: "#777777", fontStyle: "italic" },
    { tag: t.lineComment, color: "#777777", fontStyle: "italic" },
    { tag: t.blockComment, color: "#777777", fontStyle: "italic" },
    { tag: t.docComment, color: "#888888", fontStyle: "italic" },

    { tag: t.keyword, color: "#ffffff", fontWeight: "700" },
    { tag: t.controlKeyword, color: "#ffffff", fontWeight: "700" },
    { tag: t.modifier, color: "#ffffff", fontWeight: "700" },
    { tag: t.operatorKeyword, color: "#ffffff", fontWeight: "700" },
    { tag: t.atom, color: "#ffffff", fontWeight: "700" },
    { tag: t.bool, color: "#ffffff", fontWeight: "700" },
    { tag: t.null, color: "#ffffff", fontWeight: "700" },

    { tag: t.string, color: "#bbbbbb" },
    { tag: t.regexp, color: "#bbbbbb" },
    { tag: t.special(t.string), color: "#bbbbbb" },

    { tag: t.number, color: "#ffffff" },
    { tag: t.integer, color: "#ffffff" },
    { tag: t.float, color: "#ffffff" },

    { tag: t.function(t.variableName), color: "#ffffff", fontWeight: "700" },
    { tag: t.function(t.propertyName), color: "#ffffff", fontWeight: "700" },
    { tag: t.variableName, color: "#ffffff" },
    { tag: t.propertyName, color: "#ffffff" },
    { tag: t.typeName, color: "#ffffff", fontWeight: "700" },
    { tag: t.className, color: "#ffffff", fontWeight: "700" },
    { tag: t.namespace, color: "#ffffff" },

    { tag: t.operator, color: "#ffffff" },
    { tag: t.punctuation, color: "#ffffff" },
    { tag: t.bracket, color: "#ffffff" },

    { tag: t.tagName, color: "#ffffff", fontWeight: "700" },
    { tag: t.attributeName, color: "#ffffff" },
    { tag: t.attributeValue, color: "#bbbbbb" },

    { tag: t.heading, color: "#ffffff", fontWeight: "700" },
    { tag: t.emphasis, color: "#ffffff", fontStyle: "italic" },
    { tag: t.strong, color: "#ffffff", fontWeight: "700" },
    { tag: t.link, color: "#ffffff", textDecoration: "underline" },
  ],
});
