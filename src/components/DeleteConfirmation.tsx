"use client"

import type React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, AlertTriangle, Shield } from "lucide-react"

interface DeleteConfirmationProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  itemName?: string
  onConfirm: () => void
  isLoading?: boolean
  confirmText?: string
  variant?: "default" | "destructive"
}

export default function DeleteConfirmation({
  trigger,
  title,
  description,
  itemName,
  onConfirm,
  isLoading = false,
  confirmText = "Delete",
  variant = "destructive",
}: DeleteConfirmationProps) {
  const defaultTitle = itemName ? `Delete ${itemName}?` : "Are you absolutely sure?"

  const defaultDescription = itemName
    ? `This will permanently delete "${itemName}" and all associated data. This action cannot be undone.`
    : "This action cannot be undone. This will permanently delete the item and remove all associated data from our servers."

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-full border-2 mx-auto sm:mx-0 ${
              variant === "destructive"
                ? "bg-destructive/10 border-destructive/20 text-destructive"
                : "bg-primary/10 border-primary/20 text-primary"
            }`}
            aria-hidden="true"
          >
            {variant === "destructive" ? <AlertTriangle className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
          </div>

          <AlertDialogHeader className="text-center sm:text-left">
            <AlertDialogTitle className="text-xl font-semibold">{title || defaultTitle}</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground leading-relaxed">
              {description || defaultDescription}
            </AlertDialogDescription>

            {variant === "destructive" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 mt-3">
                <Trash2 className="h-4 w-4" />
                <span>This action is permanent and cannot be reversed</span>
              </div>
            )}
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
          <AlertDialogCancel disabled={isLoading} className="w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full sm:w-auto ${
              variant === "destructive" ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                {confirmText}ing...
              </div>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
