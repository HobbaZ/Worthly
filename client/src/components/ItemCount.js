import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

export const ItemCount = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  const count = userData.savedItems?.length || 0;

  if (!userData) {
    return null;
  }

  if (loading) return null;

  return (
    <>
      <span className="itemBadge">{count > 99 ? "99+" : count}</span>
    </>
  );
};
