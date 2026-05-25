import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      position="bottom-center"
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center justify-center bg-background text-foreground border-[3px] border-border rounded-none shadow-[4px_4px_0_0_var(--color-border)] font-bold uppercase tracking-widest text-sm px-8 py-4 w-auto min-w-[260px]",
          title: "font-bold uppercase tracking-widest",
          description: "font-bold uppercase tracking-widest opacity-80",
        },
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)"
        }
      }
      {...props} />
  );
}

export { Toaster }
