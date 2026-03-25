"use client";

import { Button } from "@/components/ui/button";
import { Dialog, 
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,   
 } from "@/components/ui/dialog";
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
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Toggle } from "@/components/ui/toggle"
import { BookmarkIcon, ItalicIcon } from "lucide-react"

export default function LoginDialog() {
    return (
    //      <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" className="flex items-center">
    //   <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
    //   Bookmark
    // </Toggle>
         <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        // <Dialog>
        //     <DialogTrigger asChild> 
        //         <Button 
        //         type="button"
        //         onClick={() => {
        //             console.log("로그인 버튼 클릭");
        //         }} className="bg-white text-black font-semibold hover:bg-neutral-200">로그인</Button>
        //     </DialogTrigger>
        //     <DialogContent className="z-50">
        //         <DialogHeader>
        //             <DialogTitle>로그인</DialogTitle>
        //             <DialogDescription>
        //                 이메일과 비밀번호를 입력하여 로그인하세요.
        //             </DialogDescription>
        //         </DialogHeader>
        //         <div className="flex flex-col space-y-4 py-4">
        //             <Label htmlFor="name-1">Name</Label>
        //             <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        //         </div>
        //         <div className="flex flex-col space-y-4 py-4">
        //             <Label htmlFor="username-1">Username</Label>
        //             <Input id="username-1" name="username" defaultValue="@peduarte" />
        //         </div >
        //     </DialogContent>
        // </Dialog>
 )  ; 
}