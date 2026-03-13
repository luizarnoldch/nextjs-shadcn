"use client";

import { Button } from "@/components/ui/button";

type FileFormActionsProps = {
  form: any;
  isPending: boolean;
};

export default function FileFormActions({
  form,
  isPending,
}: FileFormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => form.reset()}
        disabled={isPending}
      >
        Reset
      </Button>
      <Button
        type="submit"
        disabled={isPending || !form.state.canSubmit}
        onClick={form.handleSubmit}
      >
        {isPending ? "Saving..." : "Save File"}
      </Button>
    </div>
  );
}
