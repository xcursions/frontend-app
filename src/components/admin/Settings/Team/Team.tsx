"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import Select from "@/components/lib/Select";
import Text from "@/components/lib/Text";
import { Switch } from "@/components/ui/switch";
import useErrorHandler from "@/hooks/useErrorHandler";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useGetAllTeamQuery,
  useUpdateTeamMutation,
} from "@/services/admin/users";
import type { IUser } from "@/types";
import Layout from "@/ui-components/AdminAccountLayout";

import { DataTable } from "../../services/DataTable";
import styles from "./Team.module.scss";

const roles = [
  { value: "customer", label: "customer" },
  { value: "service", label: "service" },
  { value: "product", label: "product" },
];
const initialState = {
  fullName: "",
  username: "",
  email: "",
  teamRole: "",
};
const initialUpdate = {
  fullName: "",
  teamRole: "",
  suspended: false,
};
export type AdminTeams = {
  name: string;
  image: string;
  role: string;
  status: boolean;
  suspended: boolean;
  id: string;
  username: string;
};

const Team = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(initialUpdate);
  const { data: adminData, isSuccess: adminSuccess } = useGetAllTeamQuery();
  const [createTeam, { data, isSuccess, isError, error, isLoading }] =
    useCreateTeamMutation();
  const [
    deleteTeam,
    { isSuccess: deleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteTeamMutation();
  const [
    updateTeam,
    {
      isSuccess: updateSuccess,
      isError: isUpdateError,
      error: updateError,
      isLoading: updateLoading,
    },
  ] = useUpdateTeamMutation();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleUpdateModal = () => {
    setIsUpdate(!isUpdate);
  };
  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isDeleteError,
    error: deleteError,
  });
  useErrorHandler({
    isError: isUpdateError,
    error: updateError,
  });
  useSuccessHandler({
    isSuccess,
    toastMessage: "Team created successfully",
    successFunction: () => {
      if (data) {
        toggleModal();
        setPayload(initialState);
      }
    },
  });
  useSuccessHandler({
    isSuccess: updateSuccess,
    toastMessage: "Team Updated successfully",
    successFunction: () => {
      toggleUpdateModal();
      setUpdate(initialUpdate);
    },
  });
  useSuccessHandler({
    isSuccess: deleteSuccess,
    toastMessage: "Team Member deleted",
  });
  const teamData =
    adminSuccess &&
    adminData.result.map((res: IUser) => {
      return {
        name: res?.profile?.fullName,
        username: res?.profile.username,
        id: res?.profile.userId,
        status: res?.emailVerified,
        suspended: res?.suspended,
        role: res?.teamRole,
        image:
          res?.profile?.avatarUrl || "/assets/images/icons/profile_avatar.jpeg",
      };
    });
  const handleAdminUpdate = (value: any) => {
    setUpdate({
      fullName: value.name,
      teamRole: value.role,
      suspended: value.suspended,
    });
    setId(value.id);
    toggleUpdateModal();
  };
  const columns: ColumnDef<AdminTeams>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-lg font-semibold">Member</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
          >
            <Image
              src={value.image}
              alt={`${value.name}`}
              width={50}
              height={44}
              className="h-[44px] w-[50px] rounded-2xl"
            />
            <div className="flex flex-col">
              <span>{value.name}</span>
              <span className="text-[12px] text-[#0A83FF]">
                {value.username}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: () => <div className="text-lg font-semibold">Role</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="text-[14px] font-medium capitalize text-[#101828]">
            {value.role}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-lg font-semibold">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            // className="text-[14px] font-medium text-[#101828]"
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] ${
              value.status
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFF5EB] text-[#FF860A]"
            }`}
          >
            {value.status ? "Verified" : "Pending"}
          </div>
        );
      },
    },
    {
      id: "suspended",
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            // onClick={() =>
            //   updateCustomerStatus({
            //     query: value.id,
            //     data: { suspended: !value.status },
            //   })
            // }
            className={`flex items-center gap-5 text-[14px] font-medium text-[#101828]`}
          >
            <span
              className="cursor-pointer text-3xl text-[#0A83FF]"
              onClick={() => handleAdminUpdate(value)}
            >
              <MdOutlineEdit />
            </span>
            <span
              className={`cursor-pointer text-[20px] font-medium text-[#F04438]`}
              onClick={() => deleteTeam(value.id)}
            >
              <RiDeleteBin6Line />
            </span>
          </div>
        );
      },
    },
  ];
  console.log(id);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          <Heading type="h1" className="ml-5 py-4 text-[18px]">
            Teams
          </Heading>
          <Button
            className="flex h-[35px] items-center gap-2 rounded-[100px] text-[14px]"
            onClick={toggleModal}
          >
            <AiOutlinePlus />
            Invite Team
          </Button>
        </div>
        <div className={styles.card_body}>
          <DataTable columns={columns} data={teamData} />
        </div>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
              onClick={toggleModal}
            ></div>
            <div className="fixed inset-0 z-[32] flex items-center justify-center overflow-auto lg:left-[500px] lg:w-[450px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3">Invite Member</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={toggleModal}
                  >
                    X
                  </p>
                </div>
                <div className="my-[10px]">
                  <Input
                    label="Name"
                    placeholder=" Enter full name"
                    value={payload.fullName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayload({
                        ...payload,
                        fullName: event.target.value,
                      })
                    }
                  />
                  <Input
                    label="Username"
                    placeholder="Enter username"
                    value={payload.username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayload({
                        ...payload,
                        username: event.target.value,
                      })
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="Enter email address"
                    value={payload.email}
                    type="email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPayload({
                        ...payload,
                        email: event.target.value,
                      })
                    }
                  />
                  <Select
                    value={payload.teamRole}
                    label="Select Role"
                    placeholder="Select role"
                    options={roles.map((option) => ({
                      value: option.value,
                      label: option.label,
                    }))}
                    onChange={(event) =>
                      setPayload({
                        ...payload,
                        teamRole: event.value,
                      })
                    }
                    className=" capitalize"
                  />
                  <Button
                    className=" mt-[24px] w-full rounded-[100px]"
                    loading={isLoading}
                    onClick={() => createTeam(payload)}
                  >
                    Send Invite
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        {isUpdate && (
          <>
            <div
              className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
              onClick={toggleUpdateModal}
            ></div>
            <div className="fixed inset-0 z-[32] flex items-center justify-center overflow-auto lg:left-[500px] lg:w-[450px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3">Update Member</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={toggleUpdateModal}
                  >
                    X
                  </p>
                </div>
                <div className="my-[10px]">
                  <Input
                    label="Name"
                    placeholder=" Enter full name"
                    value={update.fullName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setUpdate({
                        ...update,
                        fullName: event.target.value,
                      })
                    }
                  />
                  <Select
                    value={update.teamRole}
                    label="Select Role"
                    placeholder="Select role"
                    options={roles.map((option) => ({
                      value: option.value,
                      label: option.label,
                    }))}
                    onChange={(event) =>
                      setUpdate({
                        ...update,
                        teamRole: event.value,
                      })
                    }
                    className=" capitalize"
                  />
                  <div className="mt-5 flex items-center gap-3">
                    <Text>Is Admin Active?</Text>
                    <Switch
                      checked={!update.suspended}
                      onClick={() =>
                        setUpdate({ ...update, suspended: !update.suspended })
                      }
                    />
                  </div>
                  <Button
                    className=" mt-[24px] w-full rounded-[100px]"
                    loading={updateLoading}
                    onClick={() => updateTeam({ query: id, data: update })}
                  >
                    Update Team Member
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Team;
