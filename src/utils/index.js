export default {
    shortenTitle: (title) => {
        if (title.length > 14) {
            return `${title.slice(0,14)}...`
        }
        return title
    }
}
