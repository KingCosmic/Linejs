const qs = require('query-string');

const baseURL = 'https://api.line.me/v2/bot/';

const apiURL = (path, query) =>
  `${baseURL}${path}${query ? qs.stringify(query) : ''}`

exports.reply = apiURL('message/reply');

exports.push = apiURL('message/push');

exports.multicast  = apiURL('message/multicast');

exports.content = (messageId) =>
  apiURL(`message/${messageId}/content`);

exports.profile = (userId) => apiURL(`profile/${userId}`);

exports.groupMemberProfile = (groupId, userId) =>
  apiURL(`group/${groupId}/member/${userId}`);

exports.roomMemberProfile = (roomId, userId) =>
  apiURL(`room/${roomId}/member/${userId}`);

exports.groupMemberIds = (groupId, start) =>
  apiURL(`group/${groupId}/members/ids`, start ? { start } : null);

exports.roomMemberIds = (roomId, start) =>
  apiURL(`room/${roomId}/members/ids`, start ? { start } : null);

exports.leaveGroup = (groupId) => apiURL(`group/${groupId}/leave`);

exports.leaveRoom = (roomId) => apiURL(`room/${roomId}/leave`);

exports.richMenu = (richMenuId) =>
  apiURL('richmenu' + (richMenuId ? `/${richMenuId}` : ''));

exports.richMenuList = () => apiURL(`richmenu/list`);

exports.userRichMenu = (userId, richMenuId) =>
  apiURL(`user/${userId}/richmenu` + (richMenuId ? `/${richMenuId}` : ''));

exports.richMenuContent = (richMenuId) =>
  apiURL(`richmenu/${richMenuId}/content`);