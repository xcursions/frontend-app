"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TbFileUpload } from "react-icons/tb";

import Button from "@/components/lib/Button/Button";
import FullPageLoader from "@/components/lib/FullPageLoader";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import Select from "@/components/lib/Select";
import Text from "@/components/lib/Text";
import useErrorHandler from "@/hooks/useErrorHandler";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserPictureMutation,
  useUpdateUserProfileMutation,
} from "@/services/user";

import styles from "./Profile.module.scss";

const profileImage = "/assets/images/icons/profile_avatar.png";

const initialState = {
  fullName: "",
  country: "",
  state: "",
  address: "",
  city: "",
  gender: "",
};
const initialPasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const ProfileForm = () => {
  const [profile, setProfile] = useState(initialState);
  const [password, setPassword] = useState(initialPasswordState);
  const [file, setFile] = useState<File | null>(null);
  const { data } = useGetUserProfileQuery();
  const [uploadImage, { isLoading, isError, error, isSuccess }] =
    useUpdateUserPictureMutation();
  const [
    uploadProfile,
    {
      isLoading: profileLoading,
      isSuccess: profileSuccess,
      isError: isProfileError,
      error: profileError,
    },
  ] = useUpdateUserProfileMutation();
  const [
    updatePassword,
    {
      isLoading: isPasswordLoading,
      isError: isPasswordError,
      error: passwordError,
      isSuccess: passwordSuccess,
    },
  ] = useChangePasswordMutation();

  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isProfileError,
    error: profileError,
  });
  useErrorHandler({
    isError: isPasswordError,
    error: passwordError,
  });
  useSuccessHandler({
    isSuccess: profileSuccess,
    successFunction: () => {
      setProfile(initialState);
    },
    toastMessage: "Profile Updated successfully!",
  });
  useSuccessHandler({
    isSuccess: passwordSuccess,
    successFunction: () => {
      setPassword(initialPasswordState);
    },
    toastMessage: "Password Changed successfully!",
  });
  useSuccessHandler({
    isSuccess,
    successFunction: () => {
      setFile(null);
    },
    toastMessage: "Profile Picture changed",
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles) {
      const newFile = acceptedFiles[0];

      if (newFile) {
        setFile(newFile);
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };
  const handleProfileSubmit = () => {
    uploadProfile(profile);
  };
  const handlePasswordSubmit = () => {
    updatePassword(password);
  };
  const handleUploadImage = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file as File);
      formData.append("type", "image");

      uploadImage(formData);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Heading type="h1" className="ml-5 py-4 text-[18px]">
          Edit Profile
        </Heading>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.profileCard}>
          <Image
            src={data?.data?.avatarUrl || profileImage}
            width={"400"}
            height={"400"}
            alt={data?.data?.fullName}
            className="max-h-[100px] max-w-[100px] rounded-full p-3"
          />
          <div className="w-full p-3 lg:w-[142px]">
            <Text className="font-dmSansBold text-[14px]">Profile Picture</Text>
            {file ? (
              <figure className={styles.container}>
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className={styles.image}
                />
              </figure>
            ) : (
              <div className={styles.dropzone} {...getRootProps()}>
                <input {...getInputProps()} accept="image/*" multiple={false} />

                <TbFileUpload className="text-3xl" />

                {isDragActive ? (
                  <Text className="font-dmSansBold">Drop your image here!</Text>
                ) : (
                  <>
                    <Text className="text-[10px] font-light">
                      We recommend an image of at least 400x400. Supports jpg,
                      png and gif
                    </Text>
                  </>
                )}
              </div>
            )}

            <Button
              className="mt-5 rounded-2xl bg-gray-300 text-[14px] text-[#667084]"
              onClick={handleUploadImage}
              loading={isLoading}
            >
              Upload
            </Button>
          </div>
        </div>
        <div className={styles.profileForm}>
          <Text className="text-[15px] font-bold">ACCOUNT INFO</Text>
          <Input
            placeholder="John Doe"
            label="Full Name"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
          />
          <Input
            placeholder="Country"
            label="Country"
            name="country"
            value={profile.country}
            onChange={handleChange}
          />
          <Input
            placeholder="State"
            label="State"
            name="state"
            value={profile.state}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Address"
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter City"
            label="City"
            name="city"
            type="text"
            value={profile.city}
            onChange={handleChange}
          />
          <label className="my-1 font-dmSansRegular text-[14px] text-[#475467]">
            Gender
          </label>
          <Select
            placeholder={"Gender"}
            value={profile.gender}
            onChange={(event) =>
              setProfile({
                ...profile,
                gender: event.value,
              })
            }
            options={gender.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            showArrow
            className=" block w-full cursor-pointer  rounded-lg text-sm text-[#667084]"
          />
          <Button
            className="mt-5 w-full rounded-3xl bg-[#0A83FF]"
            disabled={
              !profile.address ||
              !profile.fullName ||
              !profile.gender ||
              !profile.country ||
              !profile.state ||
              !profile.city
            }
            onClick={handleProfileSubmit}
          >
            Update Profile
          </Button>
          {profileLoading && <FullPageLoader />}
          <div className="py-5 lg:py-10">
            <Text className="text-[15px] font-bold">EDIT PASSWORD</Text>
            <Input
              label="Old Password"
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              value={password.oldPassword}
              onChange={handlePasswordChange}
            />
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={password.newPassword}
              onChange={handlePasswordChange}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
            />
            <Button
              className="mt-5 w-full rounded-3xl bg-[#0A83FF]"
              disabled={
                password.newPassword !== password.confirmPassword ||
                !password.oldPassword
              }
              onClick={handlePasswordSubmit}
            >
              Update Password
            </Button>
            <p
              className={`${
                password.confirmPassword === password.newPassword
                  ? "text-green-400"
                  : "text-red-500"
              }`}
            >
              Confirm password must match
            </p>
            {isPasswordLoading && <FullPageLoader />}
          </div>
        </div>
      </div>
      {isLoading && <FullPageLoader />}
    </div>
  );
};

export default ProfileForm;
