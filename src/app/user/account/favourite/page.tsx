/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

"use client";

import React from "react";

import Favourites from "@/Pages/Favourites";
import Layout from "@/ui-components/layout";

export default () => (
  <div className="bg-[#ffffff]">
    <Layout>
      <Favourites />
    </Layout>
  </div>
);
