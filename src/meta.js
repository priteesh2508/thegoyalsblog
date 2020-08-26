

export const getMetaInfo = (timestamp) => {
    const blogDateTime = new Date(timestamp.seconds*1000);
    const curDateTime = new Date();
    const difference = curDateTime - blogDateTime;
    if (difference < 60*1000) {
        return 'a few seconds ago';
    } else if (blogDateTime.getDate() === curDateTime.getDate() && blogDateTime.getMonth() === curDateTime.getMonth() && blogDateTime.getFullYear() === curDateTime.getFullYear()) {
        return `Today at ${blogDateTime.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                minute: '2-digit',
                hour12: true
                }).toUpperCase()}`

    } else {
        return `on ${blogDateTime.toLocaleString([], {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).toUpperCase()}`
    }
};