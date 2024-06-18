export const DateOfTimePost = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  const diffMilliseconds = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
      return `${diffDays} ngày`;
  } else if (diffHours > 0) {
      return `${diffHours} giờ`;
  } else if (diffMinutes > 0) {
      return `${diffMinutes} phút trước`;
  } else {
      return `Vừa xong`;
  }
};
