/* eslint-disable prefer-regex-literals */
import type React from "react";
import { useEffect, useReducer } from "react";

const usePasswordChecker = ({ password }: { password: string }) => {
  const regex = new RegExp("(.{8,})");
  const regexOneUpperCase = new RegExp("(?=.*?[A-Z])");
  const regexOneLowerCase = new RegExp("(?=.*?[a-z])");
  const regexNumeric = new RegExp("(?=.*?[0-9])");
  const regexSpecialCharacter = new RegExp("(?=.*?[#?!@$%^&*-])");

  const [event, updateEvent] = useReducer(
    (prev: React.SetStateAction<any>, next: React.SetStateAction<any>) => {
      return { ...prev, ...next };
    },
    {
      validLength: false,
      hasNumber: false,
      upperCase: false,
      lowerCase: false,
      specialChar: false,
    }
  );
  useEffect(() => {
    updateEvent({ validLength: regex.test(password) });
    updateEvent({ hasNumber: regexNumeric.test(password) });
    updateEvent({ upperCase: regexOneUpperCase.test(password) });
    updateEvent({ lowerCase: regexOneLowerCase.test(password) });
    updateEvent({ specialChar: regexSpecialCharacter.test(password) });
  }, [password]);
  return [
    event.validLength,
    event.hasNumber,
    event.upperCase,
    event.lowerCase,
    event.specialChar,
  ];
};

export default usePasswordChecker;
