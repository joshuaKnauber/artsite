"use client";

import TextInput from "@/app/components/Inputs/TextInput";
import Toggle from "@/app/components/Inputs/Toggle";
import { PublicUserMetadata } from "@/types";
import { useState } from "react";
import { UserMetadataBody } from "@/app/api/users/metadata/route";
import Link from "next/link";
import Spinner from "@/app/components/Spinner/Spinner";

type ProfileFormPRops = {
  username: string;
  metadata: PublicUserMetadata;
  invites: string[];
};

const ProfileForm = ({ metadata, invites, username }: ProfileFormPRops) => {
  const [location, setLocation] = useState<string>(metadata.location || "");
  const [bio, setBio] = useState<string>(metadata.bio || "");
  const [twitter, setTwitter] = useState<string>(metadata.twitter || "");
  const [instagram, setInstagram] = useState<string>(metadata.instagram || "");
  const [forHire, setForHire] = useState<boolean>(metadata.for_hire || false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data: UserMetadataBody = {
        location: location,
        bio: bio,
        twitter: twitter,
        instagram: instagram,
        for_hire: forHire,
      };
      const res = await fetch("/api/users/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-4 px-4 md:mt-16"
    >
      <Link
        href={`/user/${username}`}
        className="text-light ml-[calc(100px+1rem)] underline opacity-50"
      >
        View Profile
      </Link>
      <TextInput
        label="Location"
        value={location}
        placeholder="Earth"
        onChange={setLocation}
      />
      <TextInput
        label="Bio"
        value={bio}
        placeholder="Hi, I'm..."
        onChange={setBio}
        area
      />
      <TextInput
        label="Twitter"
        value={twitter}
        placeholder="https://twitter.com/..."
        onChange={setTwitter}
      />
      <TextInput
        label="Instagram"
        value={instagram}
        placeholder="https://www.instagram.com/..."
        onChange={setInstagram}
      />
      <Toggle label="For Hire" value={forHire} onChange={setForHire} />
      <div className="ml-[calc(100px+1rem)] mt-4 w-fit rounded-md bg-white text-black transition-all md:hover:brightness-90">
        <button
          disabled={loading}
          type="submit"
          className="flex h-8 w-[150px] items-center justify-center"
        >
          {loading ? <Spinner /> : "Save"}
        </button>
      </div>
      {error && <span>{error}</span>}
    </form>
  );
};

export default ProfileForm;
