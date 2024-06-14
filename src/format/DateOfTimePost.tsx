import React from 'react';
import { View, Text } from 'react-native';

export const DateOfTimePost = (isoString:any) => {
 
  const date = new Date(isoString);
  
  // Tính toán số giờ từ đầu ngày từ thời gian ISO 8601
  const isoHours = date.getHours();
  const isoMinutes = date.getMinutes();
  const isoSeconds = date.getSeconds();
  const isoDays = date.getDate() - 1; // Bắt đầu từ ngày 0
  const isoMonths = date.getMonth(); // Bắt đầu từ tháng 0
  const isoYears = date.getFullYear();

  const totalHoursFromIso = (isoYears * 365 * 24) + (isoMonths * 30 * 24) + (isoDays * 24) + isoHours + (isoMinutes / 60) + (isoSeconds / 3600);

  // Lấy thời gian hiện tại
  const now = new Date();
  const currentHours = now.getHours();

  
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();
  const currentDays = now.getDate() - 1;
  const currentMonths = now.getMonth();
  const currentYears = now.getFullYear();

  const totalHoursNow = (currentYears * 365 * 24) + (currentMonths * 30 * 24) + (currentDays * 24) + currentHours + (currentMinutes / 60) + (currentSeconds / 3600);

  // Tính toán sự chênh lệch
  const differenceInHours = totalHoursNow - totalHoursFromIso;

  // Làm tròn số giờ xuống số nguyên gần nhất
  const flooredDifferenceInHours = Math.floor(differenceInHours);

  return flooredDifferenceInHours
};


