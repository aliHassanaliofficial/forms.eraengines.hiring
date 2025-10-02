import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "rounded-xl border bg-white p-3 shadow-sm dark:bg-neutral-900",
        className
      )}
      captionLayout="dropdown-buttons" // 👈 optimized UX: dropdown + arrows
      fromYear={1975}
      toYear={2050}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6",
        month: "space-y-4 w-full",
        caption:
          "flex items-center justify-between px-2 mb-2 text-sm font-medium",
        caption_dropdowns: "flex gap-2",
        caption_label: "hidden",
        dropdown:
          "rounded-md border bg-background px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-7 w-7 p-0 opacity-70 hover:opacity-100"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "w-9 text-center text-xs font-medium text-muted-foreground",
        row: "flex w-full mt-1",
        cell: "h-9 w-9 relative text-center text-sm",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        day_today:
          "bg-accent text-accent-foreground font-semibold border border-primary",
        day_outside:
          "text-muted-foreground opacity-40",
        day_disabled:
          "text-muted-foreground opacity-30 line-through",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
