export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `今日 ${date.toLocaleTimeString()}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `昨日 ${date.toLocaleTimeString()}`;
  }
  return date.toLocaleString();
};

export const formatMessageContent = (content: string): string => {
  // URLをリンクに変換
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
};

export const truncateMessage = (message: string, maxLength = 100): string => {
  if (message.length <= maxLength) return message;
  return `${message.slice(0, maxLength)}...`;
};

export const countLines = (message: string): number => {
  return (message.match(/\n/g) || []).length + 1;
};

export const sanitizeMessage = (message: string): string => {
  // 連続する改行を最大2つまでに制限
  return message.replace(/\n{3,}/g, "\n\n");
};
