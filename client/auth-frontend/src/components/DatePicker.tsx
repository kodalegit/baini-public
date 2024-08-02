import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { handleCreativeWorkChange } from "@/types/types";
import "react-day-picker/dist/style.css";

function DatePicker({
  handleChange,
}: {
  handleChange: handleCreativeWorkChange;
}) {
  const [date, setDate] = useState<Date | undefined>();
  useEffect(() => {
    handleChange("datePublished", date?.toDateString() ?? "");
  }, [date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          captionLayout="dropdown-buttons"
          fromYear={2022}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
