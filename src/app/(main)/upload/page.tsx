import UploadForm from "./components/UploadForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload | Duet",
  robots: "noindex, nofollow",
};

export default function UploadPage() {
  return (
    <>
      <UploadForm />
    </>
  );
}
