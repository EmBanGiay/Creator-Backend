'use strict';
function formatTimestampToLocalDateString(timestamp, format = 'yyyy-MM-dd HH:mm:ss') {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Replace format placeholders with actual values
    const formattedDate = format
        .replace('yyyy', year)
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);

    return formattedDate;
}

module.exports = {formatTimestampToLocalDateString,};