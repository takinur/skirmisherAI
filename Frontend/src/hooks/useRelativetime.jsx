import React from "react";

//Return relative time
export const relativeTime = (time) => {
  //Format date to hours ago
  const date = new Date(time);
  const seconds = Math.floor((new Date() - date) / 1000);
  const minutes = Math.floor((new Date() - date) / 1000 / 60);
  const hours = Math.floor((new Date() - date) / 1000 / 60 / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

    if (seconds < 60) {
        return seconds + " seconds ago";
    } else if (minutes < 60) {
        return minutes + " minutes ago";
    } else if (hours < 24) {
        return hours + " hours ago";
    } else if (days < 30) {
        return days + " days ago";
    } else if (months < 12) {
        return months + " months ago";
    } else {
        return years + " years ago";
    }
};
